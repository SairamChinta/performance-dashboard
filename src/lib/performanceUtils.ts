export function downsample(data: { t: number; v: number }[], maxPoints = 1000) {
  if (data.length <= maxPoints) return data;
  const step = Math.floor(data.length / maxPoints);
  const sampled: typeof data = [];
  for (let i = 0; i < data.length; i += step) sampled.push(data[i]);
  return sampled;
}
