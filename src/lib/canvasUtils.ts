import type { DataPoint } from "./types";

export function clearCanvas(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
}

export function strokeLine(
  ctx: CanvasRenderingContext2D,
  pts: { x: number; y: number }[]
) {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.stroke();
}

export function mapToPixels(
  data: DataPoint[],
  width: number,
  height: number
) {
  if (data.length === 0) return [];
  const xMin = data[0].t;
  const xMax = data[data.length - 1].t;
  let yMin = Infinity, yMax = -Infinity;
  for (let i = 0; i < data.length; i++) {
    const v = data[i].v;
    if (v < yMin) yMin = v;
    if (v > yMax) yMax = v;
  }
  const pad = (yMax - yMin) * 0.1 || 1;
  yMin -= pad; yMax += pad;

  return data.map(d => ({
    x: ((d.t - xMin) / (xMax - xMin)) * width,
    y: height - ((d.v - yMin) / (yMax - yMin)) * height,
  }));
}
