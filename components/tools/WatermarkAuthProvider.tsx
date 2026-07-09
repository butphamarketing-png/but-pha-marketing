"use client";

import type { ReactNode } from "react";
import { WatermarkAuthContext, useWatermarkAuthState } from "@/hooks/useWatermarkAuth";

export function WatermarkAuthProvider({ children }: { children: ReactNode }) {
  const value = useWatermarkAuthState();
  return <WatermarkAuthContext.Provider value={value}>{children}</WatermarkAuthContext.Provider>;
}
