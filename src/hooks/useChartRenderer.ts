// src/hooks/useChartRenderer.ts
import { useCallback } from "react";
import type { DataPoint } from "@/lib/types";
import type { Viewport } from "@/lib/viewport";
import { downsample } from "@/lib/performanceUtils";

export default function useChartRenderer(width: number, height: number) {
  const drawWithVp = useCallback(
    (ctx: CanvasRenderingContext2D, data: DataPoint[], vp: Viewport) => {
      if (!ctx || width === 0 || height === 0) return;
      const ratio = window.devicePixelRatio || 1;

      ctx.save();
      ctx.scale(ratio, ratio);
      ctx.clearRect(0, 0, width, height);

      const visible = downsample(data.filter((d) => d.t >= vp.xMin && d.t <= vp.xMax), 1500);
      if (visible.length < 2) {
        ctx.restore();
        return;
      }

      const yMin = Math.min(...visible.map((d) => d.v));
      const yMax = Math.max(...visible.map((d) => d.v));
      const xRange = vp.xMax - vp.xMin;
      const yRange = yMax - yMin || 1;

      const toX = (t: number) => ((t - vp.xMin) / xRange) * width;
      const toY = (v: number) => height - ((v - yMin) / yRange) * height;

      ctx.beginPath();
      ctx.moveTo(toX(visible[0].t), toY(visible[0].v));
      for (let i = 1; i < visible.length; i++) {
        const p = visible[i];
        ctx.lineTo(toX(p.t), toY(p.v));
      }

      ctx.strokeStyle = "rgba(59,130,246,0.9)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.restore();
    },
    [width, height]
  );

  return { drawWithVp };
}
