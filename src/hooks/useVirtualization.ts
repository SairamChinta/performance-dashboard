'use client';
import { useMemo } from "react";

export default function useVirtualization(
  total: number, rowH: number, viewportH: number, scrollTop: number
) {
  const visible = Math.ceil(viewportH / rowH) + 6; // overscan
  const start = Math.max(0, Math.floor(scrollTop / rowH) - 3);
  const end = Math.min(total, start + visible);
  return useMemo(() => ({ start, end, offset: start * rowH }), [start, end, rowH]);
}
