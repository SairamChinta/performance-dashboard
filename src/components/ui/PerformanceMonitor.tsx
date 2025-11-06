'use client';
import usePerformanceMonitor from '@/hooks/usePerformanceMonitor';

export default function PerformanceMonitor() {
  const m = usePerformanceMonitor();

  return (
    <div className="text-sm grid grid-cols-[auto_1fr] gap-x-2">
      <div>FPS</div><strong>{m.fps}</strong>
      <div>Frame</div><span>{m.frameMs} ms</span>
      {m.memMB !== undefined && (
        <>
          <div>Heap</div><span>{m.memMB} MB</span>
        </>
      )}
    </div>
  );
}
