
export interface Viewport {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}
export function fitViewport(times: number[], vals: number[]): Viewport {
  if (times.length === 0) {
    const now = Date.now();
    return { xMin: now - 60000, xMax: now, yMin: -1, yMax: 1 };
  }
  const xMin = Math.min(...times);
  const xMax = Math.max(...times);
  const yMin = Math.min(...vals);
  const yMax = Math.max(...vals);
  return { xMin, xMax, yMin, yMax };
}

export function centerFollowViewport(v: Viewport, data: { t: number; v: number }[]): Viewport {
  if (data.length < 2) return v;
  const latest = data[data.length - 1].t;
  const windowMs = v.xMax - v.xMin || 60000; // default 1m range
  const start = latest - windowMs;
  const end = latest;
  const yMin = Math.min(...data.map((d) => d.v));
  const yMax = Math.max(...data.map((d) => d.v));
  return { xMin: start, xMax: end, yMin, yMax };
}

export function zoomAt(v: Viewport, factor: number, centerX: number): Viewport {
  const span = v.xMax - v.xMin;
  const newSpan = span / factor;
  const frac = (centerX - v.xMin) / span;
  const newMin = centerX - frac * newSpan;
  const newMax = centerX + (1 - frac) * newSpan;
  return { ...v, xMin: newMin, xMax: newMax };
}

// --- Pan horizontally
export function pan(v: Viewport, dx: number): Viewport {
  return { ...v, xMin: v.xMin + dx, xMax: v.xMax + dx };
}