'use client';
import React from "react";
import useDataStream from "@/hooks/useDataStream";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";
import LineChart from "@/components/charts/LineChart";
import DataTable from "@/components/ui/DataTable";
import TimeRangeSelector, { RangeKey } from "@/components/controls/TimeRangeSelector";
import { bucketByTime } from "@/lib/aggregation";

export default function DashboardPage() {
  // 36,000 points (100ms * 36,000 = 1h)
  const { data } = useDataStream(36_000);
  const [manual, setManual] = React.useState(false);

  // Range state
  const [range, setRange] = React.useState<RangeKey>('1m');
  const now = data.at(-1)?.t ?? Date.now();

  // Define time ranges
  const ranges: Record<RangeKey, number> = {
    '1m': 60_000,
    '5m': 300_000,
    '1h': 3_600_000,
    'all': Infinity,
  };

  const minTs = now - (ranges[range] ?? Infinity);
  const ranged = range === 'all' ? data : data.filter((d) => d.t >= minTs);

  // Aggregation step based on selected range
  const bucket =
    range === '1m' ? 200 :
      range === '5m' ? 500 :
        range === '1h' ? 1000 : 0;

  const display = bucket ? bucketByTime(ranged, bucket) : ranged;

  return (
    <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
      {/* Left Section - Chart */}
      <section className="border rounded-lg p-4 w-full">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-lg">Real-time Chart</h2>
          <TimeRangeSelector
            range={range}
            setRange={setRange}
            manual={manual}
            onFollow={() => setManual(false)}
          />
        </div>
        <LineChart data={display} manual={manual} setManual={setManual} />
      </section>


      {/* Right Section - Performance Stats */}
      <aside className="border rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">Stats</h2>
        <PerformanceMonitor />
      </aside>

      {/* Bottom Section - Data Table */}
      <section className="border rounded-lg p-4 md:col-span-2">
        <h2 className="font-semibold text-lg mb-2">Data Table</h2>
        <DataTable data={ranged} />
      </section>
    </div>
  );
}
