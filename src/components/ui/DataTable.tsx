'use client';
import { useRef, useState } from "react";
import type { DataPoint } from "@/lib/types";
import useVirtualization from "@/hooks/useVirtualization";

export default function DataTable({ data }: { data: DataPoint[] }) {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const rowH = 24, height = 240;
  const { start, end, offset } = useVirtualization(data.length, rowH, height, scrollTop);

  return (
    <div
      ref={ref}
      onScroll={(e)=>setScrollTop((e.target as HTMLDivElement).scrollTop)}
      className="border rounded-lg"
      style={{ height, overflow: "auto" }}
    >
      <div style={{ height: data.length * rowH, position: "relative" }}>
        <div style={{ position: "absolute", top: offset, left: 0, right: 0 }}>
          {data.slice(start, end).map((d, i) => (
            <div key={start+i} className="grid grid-cols-2 px-2" style={{ height: rowH }}>
              <span className="text-gray-600 text-sm">{new Date(d.t).toLocaleTimeString()}</span>
              <span className="text-gray-900 text-sm">{d.v.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
