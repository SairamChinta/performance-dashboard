'use client';
import { useCallback } from "react";
import { clearCanvas, strokeLine, mapToPixels } from "@/lib/canvasUtils";
import type { DataPoint } from "@/lib/types";

export default function useChartRenderer(width: number, height: number) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, data: DataPoint[]) => {
      clearCanvas(ctx, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#3b82f6";
      const pts = mapToPixels(data, width, height);
      strokeLine(ctx, pts);
    },
    [width, height]
  );

  return { draw };
}
