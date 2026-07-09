"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import type { LoadedImageMeta, Preset, TextWatermarkSettings } from "@/lib/watermark-core";

type BatchProgress = { current: number; total: number; running: boolean };

export function useWatermarkBatch() {
  const workerRef = useRef<Worker | null>(null);
  const [progress, setProgress] = useState<BatchProgress>({ current: 0, total: 0, running: false });
  const [isPaused, setIsPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const pause = useCallback(() => {
    pausedRef.current = true;
    setIsPaused(true);
    workerRef.current?.postMessage({ type: "pause" });
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
    setIsPaused(false);
    workerRef.current?.postMessage({ type: "resume" });
  }, []);

  const cancel = useCallback(() => {
    workerRef.current?.postMessage({ type: "cancel" });
    setProgress((prev) => ({ ...prev, running: false }));
  }, []);

  const runBatch = useCallback(
    async (args: {
      images: LoadedImageMeta[];
      logoDataUrl: string | null;
      presets: Preset[];
      activePreset: Preset;
      textSettings: TextWatermarkSettings;
      exportType: "image/png" | "image/jpeg";
    }) => {
      workerRef.current?.terminate();
      const worker = new Worker(new URL("../components/tools/watermark-batch.worker.ts", import.meta.url));
      workerRef.current = worker;
      pausedRef.current = false;
      setIsPaused(false);

      setProgress({ current: 0, total: args.images.length, running: true });

      return new Promise<void>((resolve, reject) => {
        worker.onmessage = (event) => {
          const data = event.data as { type: string; current?: number; total?: number; buffer?: ArrayBuffer; message?: string };
          if (data.type === "progress") {
            setProgress({ current: data.current ?? 0, total: data.total ?? 0, running: true });
          } else if (data.type === "done" && data.buffer) {
            const blob = new Blob([data.buffer], { type: "application/zip" });
            saveAs(blob, "butpha-watermark-batch.zip");
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
          reject(new Error("Worker batch thất bại"));
        };

        worker.postMessage({
          type: "start",
          payload: { ...args, quality: 0.95 },
        });
      });
    },
    [],
  );

  return {
    progress,
    isPaused,
    runBatch,
    pause,
    resume,
    cancel,
  };
}
