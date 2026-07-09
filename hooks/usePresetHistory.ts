"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Preset } from "@/lib/watermark-core";

const MAX_HISTORY = 40;

function presetSnapshot(preset: Preset): Preset {
  return JSON.parse(JSON.stringify(preset)) as Preset;
}

export function usePresetHistory(activePreset: Preset | undefined, onRestore: (preset: Preset) => void) {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const pastRef = useRef<Preset[]>([]);
  const futureRef = useRef<Preset[]>([]);
  const draggingRef = useRef(false);
  const lastPushedRef = useRef<string>("");

  const syncFlags = useCallback(() => {
    setCanUndo(pastRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, []);

  const pushHistory = useCallback(
    (snapshot: Preset) => {
      const key = JSON.stringify(snapshot);
      if (key === lastPushedRef.current) return;
      pastRef.current.push(presetSnapshot(snapshot));
      if (pastRef.current.length > MAX_HISTORY) pastRef.current.shift();
      futureRef.current = [];
      lastPushedRef.current = key;
      syncFlags();
    },
    [syncFlags],
  );

  const beginDrag = useCallback(() => {
    if (activePreset && !draggingRef.current) {
      pushHistory(activePreset);
      draggingRef.current = true;
    }
  }, [activePreset, pushHistory]);

  const endDrag = useCallback(() => {
    draggingRef.current = false;
  }, []);

  const recordChange = useCallback(
    (next: Preset) => {
      if (draggingRef.current) return;
      pushHistory(next);
    },
    [pushHistory],
  );

  const undo = useCallback(() => {
    if (!activePreset || pastRef.current.length === 0) return;
    futureRef.current.unshift(presetSnapshot(activePreset));
    const prev = pastRef.current.pop()!;
    lastPushedRef.current = JSON.stringify(prev);
    onRestore(prev);
    syncFlags();
  }, [activePreset, onRestore, syncFlags]);

  const redo = useCallback(() => {
    if (!activePreset || futureRef.current.length === 0) return;
    pastRef.current.push(presetSnapshot(activePreset));
    const next = futureRef.current.shift()!;
    lastPushedRef.current = JSON.stringify(next);
    onRestore(next);
    syncFlags();
  }, [activePreset, onRestore, syncFlags]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (event.key === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if (event.key === "y" || (event.key === "z" && event.shiftKey)) {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [undo, redo]);

  return { canUndo, canRedo, undo, redo, beginDrag, endDrag, recordChange };
}
