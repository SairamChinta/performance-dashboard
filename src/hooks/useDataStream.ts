'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import type { DataPoint } from '@/lib/types';

export default function useDataStream(max = 10_000) {
  const [data, setData] = useState<DataPoint[]>(() => {
    const start = Date.now() - max * 100;
    let v = 0;
    return Array.from({ length: max }, (_, i) => {
      v += (Math.random() - 0.5) * 2;
      return { t: start + i * 100, v };
    });
  });

  const [isPending, startTransition] = useTransition();
  const last = useRef(data[data.length - 1]);

  useEffect(() => {
    const id = setInterval(() => {
      const nextTs = (last.current?.t ?? Date.now()) + 100;
      const next = { t: nextTs, v: (last.current?.v ?? 0) + (Math.random() - 0.5) * 1.5 };
      last.current = next;

      const buf = data.slice();
      buf.push(next);
      const overflow = buf.length - max;
      if (overflow > 0) buf.splice(0, overflow);

      startTransition(() => setData(buf));
    }, 100);
    return () => clearInterval(id);
  }, [data, max]);

  return { data, isPending };
}
