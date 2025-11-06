'use client';
import { useEffect, useRef, useState } from 'react';
import type { PerfMetrics } from '@/lib/types';

export default function usePerformanceMonitor() {
  const [m, set] = useState<PerfMetrics>({ fps: 0, frameMs: 0 });
  const last = useRef(performance.now());
  const frames = useRef(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      frames.current++;
      const now = performance.now();
      const dt = now - last.current;
      if (dt >= 1000) {
        const fps = (frames.current * 1000) / dt;
        const mem = (performance as any).memory?.usedJSHeapSize;
        set({
          fps: Math.round(fps),
          frameMs: +(1000 / fps).toFixed(2),
          memMB: mem ? Math.round(mem / 1048576) : undefined,
        });
        frames.current = 0;
        last.current = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return m;
}
