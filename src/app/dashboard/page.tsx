'use client';
import useDataStream from "@/hooks/useDataSream";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";

export default function DashboardPage() {
   const { data } = useDataStream(10_000);

  return (
    <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
      {/* Charts Area */}
      <section className="border rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">Real-time Charts</h2>
        <div className="h-[320px] flex items-center justify-center text-sm text-gray-500">
          {data.length.toLocaleString()} points streaming…
        </div>
      </section>

      {/* Controls */}
      <aside className="border rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">Controls</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="border rounded px-3 py-2 text-sm">Reset</button>
          <button className="border rounded px-3 py-2 text-sm" disabled>Filter: All</button>
          <button className="border rounded px-3 py-2 text-sm" disabled>1m</button>
          <button className="border rounded px-3 py-2 text-sm" disabled>5m</button>
          <button className="border rounded px-3 py-2 text-sm" disabled>1h</button>
        </div>
        <PerformanceMonitor />
      </aside>

      {/* Data Table Placeholder */}
      <section className="border rounded-lg p-4 md:col-span-2">
        <h2 className="font-semibold text-lg mb-2">Data Table</h2>
        <div className="h-60 flex items-center justify-center text-sm text-gray-500">
          Virtualized data table
        </div>
      </section>
    </div>
  );
}
