"use client";

import { ChevronDown } from "lucide-react";

export default function SortDropdown({ value = "duration", onChange }) {
  return (
    <label className="relative inline-flex shrink-0 items-center" aria-label="Sort workouts">
      <span className="mr-2 text-[10px] font-bold uppercase tracking-[.08em] text-white/40 sm:text-[11px]">
        Sort By
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 cursor-pointer appearance-none rounded-full border border-white/10 bg-[#151619] py-1.5 pl-3 pr-9 text-[10px] font-black uppercase tracking-wide text-white outline-none transition hover:border-white/25 focus:border-fitlime/60 sm:text-[11px]"
      >
        <option value="duration">Duration</option>
        <option value="calories">Calories</option>
        <option value="rating">Rating</option>
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 text-white/45" />
    </label>
  );
}
