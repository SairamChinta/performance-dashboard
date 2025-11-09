import type { DataPoint } from "@/lib/types";

export function bucketByTime(data: DataPoint[], bucketMs: number): DataPoint[] {
  if (bucketMs <= 0 || data.length === 0) return data;
  const out: DataPoint[] = [];
  let i = 0;
  while (i < data.length) {
    const startT = Math.floor(data[i].t / bucketMs) * bucketMs;
    let sum = 0, count = 0, lastT = startT;
    while (i < data.length) {
      const b = Math.floor(data[i].t / bucketMs) * bucketMs;
      if (b !== startT) break;
      sum += data[i].v;
      lastT = data[i].t;
      count++; i++;
    }
    out.push({ t: lastT, v: sum / count });
  }
  return out;
}
