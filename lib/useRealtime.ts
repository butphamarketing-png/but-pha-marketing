import { useEffect, useRef } from "react";
import { supabase } from "./supabase";

export function useRealtime(table: string, onChange: () => void) {
  const callbackRef = useRef(onChange);

  useEffect(() => {
    callbackRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const client = supabase;
    if (!client || !table) return;

    const channel = client
      .channel(`realtime:${table}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
        },
        () => {
          callbackRef.current();
        }
      )
      .subscribe((status) => {
        console.log(`[Realtime] ${table}:`, status);
      });

    return () => {
      void client.removeChannel(channel);
    };
  }, [table]);
}
