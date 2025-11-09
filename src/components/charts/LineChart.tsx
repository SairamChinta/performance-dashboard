'use client';
import { useLayoutEffect, useEffect, useMemo, useRef, useState } from "react";
import useChartRenderer from "@/hooks/useChartRenderer";
import type { DataPoint } from "@/lib/types";
import { fitViewport, zoomAt, pan, type Viewport, centerFollowViewport } from "@/lib/viewport";

interface LineChartProps {
  data: DataPoint[];
  manual: boolean;
  setManual: (v: boolean) => void;
}

export default function LineChart({ data, manual, setManual }: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [size, setSize] = useState({ width: 0, height: 320 });
  const [ratio, setRatio] = useState(1);

  const times = useMemo(() => data.map((d) => d.t), [data]);
  const vals = useMemo(() => data.map((d) => d.v), [data]);
  const [vp, setVp] = useState<Viewport>(() => fitViewport(times, vals));
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerManual = () => {
    setManual(true);
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => setManual(false), 5000); // auto resume after 5s
  };
  useEffect(() => {
    return () => {
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    };
  }, []);

  const { drawWithVp } = useChartRenderer(size.width, size.height);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight || 320;
      setSize({ width: w, height: h });
      setRatio(window.devicePixelRatio || 1);
    };

    updateSize(); // ensure initial mount captures correct width
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-follow logic
  useEffect(() => {
    if (!manual) setVp((v) => centerFollowViewport(v, data));
  }, [data, manual]);

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const loop = () => {
      drawWithVp(ctx, data, vp);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [data, drawWithVp, vp]);

  // Pan / Zoom handlers
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    let dragging = false;
    let lastX = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      const frac = e.offsetX / el.clientWidth;
      const centerX = vp.xMin + frac * (vp.xMax - vp.xMin);
      setVp((v) => zoomAt(v, factor, centerX));
      triggerManual();
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dxPx = e.clientX - lastX;
      lastX = e.clientX;
      const span = vp.xMax - vp.xMin;
      const worldDx = (dxPx / el.clientWidth) * span;
      setVp((v) => pan(v, -worldDx));
      triggerManual();
    };

    const onUp = (e: PointerEvent) => {
      dragging = false;
      el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [vp]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "320px",
      }}
    >
      <canvas
        ref={canvasRef}
        width={size.width * ratio}
        height={size.height * ratio}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      <svg
        width="100%"
        height={size.height}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <line x1="0" y1={size.height - 0.5} x2="100%" y2={size.height - 0.5} stroke="#d1d5db" />
        <line x1="0.5" y1="0" x2="0.5" y2={size.height} stroke="#d1d5db" />
        <text x={8} y={14} fontSize="10" fill="#6b7280">
          {new Date(vp.xMin).toLocaleTimeString()}
        </text>
        <text x="100%" y={14} fontSize="10" fill="#6b7280" textAnchor="end">
          {new Date(vp.xMax).toLocaleTimeString()}
        </text>
      </svg>
    </div>
  );
}
