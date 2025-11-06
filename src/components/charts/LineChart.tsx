'use client';
import { useEffect, useRef, useState } from "react";
import useChartRenderer from "@/hooks/useChartRenderer";
import type { DataPoint } from "@/lib/types";

export default function LineChart({ data }: { data: DataPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(800);
  const [ratio, setRatio] = useState(1);
  const height = 320;
  const { draw } = useChartRenderer(width, height);

  // Handle resize + pixel ratio safely (browser only)
  useEffect(() => {
    const handleResize = () => {
      setWidth(canvasRef.current?.parentElement?.clientWidth || 800);
      if (typeof window !== "undefined") {
        setRatio(window.devicePixelRatio || 1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const loop = () => {
      draw(ctx, data);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [data, draw]);

  return (
    <div style={{ position: "relative", width: "100%", height }}>
      <canvas
        ref={canvasRef}
        width={width * ratio}
        height={height * ratio}
        style={{ width: "100%", height: "100%" }}
      />
      <svg
        width="100%"
        height={height}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <line
          x1="0"
          y1={height - 0.5}
          x2="100%"
          y2={height - 0.5}
          stroke="#ccc"
        />
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2={height}
          stroke="#ccc"
        />
      </svg>
    </div>
  );
}
