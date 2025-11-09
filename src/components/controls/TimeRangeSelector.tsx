'use client';
import React from 'react';
export type RangeKey = '1m' | '5m' | '1h' | 'all';

interface Props {
  range: RangeKey;
  setRange: (r: RangeKey) => void;
  manual: boolean;
  onFollow: () => void;
}

export default function TimeRangeSelector({ range, setRange, manual, onFollow }: Props) {
  const btnBase = "px-3 py-1 text-sm border rounded-md transition-colors duration-150";
  const btnActive = "bg-blue-500 text-white border-blue-500";
  const btnInactive = "bg-white text-gray-800 border-gray-300 hover:bg-gray-50";

  return (
    <div className="flex items-center gap-2">
      {(['1m', '5m', '1h', 'all'] as RangeKey[]).map(r => (
        <button
          key={r}
          onClick={() => setRange(r)}
          className={`${btnBase} ${range === r ? btnActive : btnInactive}`}
        >
          {r}
        </button>
      ))}
      {manual && (
        <button
          onClick={onFollow}
          className={`${btnBase} bg-blue-500 text-white border-blue-500 hover:bg-blue-600`}
        >
          Follow Live
        </button>
      )}
    </div>
  );
}
