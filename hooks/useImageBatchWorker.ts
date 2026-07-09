"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";

type BatchProgress = { current: number; total: number; running: boolean };

export function useImageBatchWorker(zipName: string) {
  const workerRef = useRef<Worker | null>(null);
  const [progress, setProgress] = useState<BatchProgress>({ current: 0, total: 0, running: false });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return () => workerRef.current?.terminate();
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
    workerRef.current?.postMessage({ type: "pause" });
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
    workerRef.current?.postMessage({ type: "resume" });
  }, []);

  const cancel = useCallback(() => {
    workerRef.current?.postMessage({ type: "cancel" });
    setProgress((prev) => ({ ...prev, running: false }));
  }, []);

  const runBatch = useCallback(
    (payload: Record<string, unknown>) => {
      workerRef.current?.terminate();
      const worker = new Worker(new URL("../components/tools/image-batch.worker.ts", import.meta.url));
      workerRef.current = worker;
      setIsPaused(false);

      const total = Array.isArray(payload.images) ? payload.images.length : 0;
      setProgress({ current: 0, total, running: true });

      return new Promise<void>((resolve, reject) => {
        worker.onmessage = (event) => {
          const data = event.data as { type: string; current?: number; total?: number; buffer?: ArrayBuffer; message?: string };
          if (data.type === "progress") {
            setProgress({ current: data.current ?? 0, total: data.total ?? 0, running: true });
          } else if (data.type === "done" && data.buffer) {
            saveAs(new Blob([data.buffer], { type: "application/zip" }), zipName);
            setProgress((prev) => ({ ...prev, running: false }));
            worker.terminate();
            resolve();
          } else if (data.type === "cancelled") {
            setProgress((prev) => ({ ...prev, running: false }));
            worker.terminate();
            resolve();
          } else if (data.type === "error") {
            setProgress((prev) => ({ ...prev, running: false }));
            worker.terminate();
            reject(new Error(data.message ?? "Lỗi batch"));
          }
        };
        worker.onerror = () => {
          setProgress((prev) => ({ ...prev, running: false }));
          worker.terminate();
          reject(new Error("Worker thất bại"));
        };
        worker.postMessage({ type: "start", payload });
      });
    },
    [zipName],
  );

  return { progress, isPaused, runBatch, pause, resume, cancel };
}
