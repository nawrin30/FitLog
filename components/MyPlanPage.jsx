"use client";

import { useEffect, useMemo, useState } from "react";
import { Dumbbell, Flame, Search, Timer } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import PlanCard from "./PlanCard";
import EmptyState from "./EmptyState";
import Loading from "./Loading";
import SortDropdown from "./SortDropdown";
import { useFitLog } from "../context/FitLogContext";

export default function MyPlanPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { plan, saved, metrics, hydrated } = useFitLog();
  const [tab, setTab] = useState("plan");
  const [sort, setSort] = useState("duration");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTab(params.get("tab") === "saved" ? "saved" : "plan");
  }, [params]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const current = tab === "saved" ? saved : plan;

  const filteredAndSorted = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = current.filter((workout) => {
      if (!query) return true;
      const searchable = [
        workout.name,
        workout.equipment,
        workout.difficulty,
        ...(workout.muscleGroups || [])
      ]
        .join(" ")
        .toLowerCase();
      return searchable.includes(query);
    });

    return filtered.sort((a, b) => {
      if (sort === "rating") return Number(b.rating || 0) - Number(a.rating || 0);
      if (sort === "calories") return Number(b.caloriesBurned || 0) - Number(a.caloriesBurned || 0);
      return Number(a.duration || 0) - Number(b.duration || 0);
    });
  }, [current, sort, search]);

  function changeTab(nextTab) {
    setTab(nextTab);
    setSearch("");
    router.replace(nextTab === "saved" ? "/my-plan?tab=saved" : "/my-plan", { scroll: false });
  }

  return (
    <section className="min-h-[72vh] bg-fitblack py-8 sm:py-12 lg:py-14">
      <div className="fit-container">
        <div>
          <p className="mb-2 text-[11px] font-black uppercase tracking-[.22em] text-fitlime sm:text-xs">
            Training Dashboard
          </p>
          <h1 className="display text-[42px] font-black uppercase leading-[.92] sm:text-[50px] lg:text-[56px]">
            My Plan
          </h1>
          <p className="mt-3 max-w-[620px] text-[12px] leading-5 text-fitmuted sm:text-[13px] lg:text-[14px]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
          {[
            ["Exercises", metrics.exercises, Dumbbell],
            ["Minutes", metrics.minutes, Timer],
            ["Calories", metrics.calories, Flame]
          ].map(([label, value, Icon]) => (
            <div key={label} className="rounded-[10px] border border-white/[.07] bg-[#151619] px-4 py-4 sm:px-5 sm:py-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-black uppercase tracking-[.16em] text-white/35 sm:text-[11px]">{label}</p>
                <Icon size={15} className="text-white/25" />
              </div>
              <p className="display mt-2 text-[32px] font-black leading-none text-fitlime sm:text-[36px] lg:text-[40px]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 border-b border-white/[.08] pb-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full gap-1 sm:w-auto">
            <button
              type="button"
              onClick={() => changeTab("plan")}
              className={`min-h-10 flex-1 rounded-t-md px-4 py-2.5 text-[11px] font-black uppercase tracking-[.05em] transition sm:flex-none sm:text-xs ${
                tab === "plan" ? "bg-[#151619] text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              Today's Plan
            </button>
            <button
              type="button"
              onClick={() => changeTab("saved")}
              className={`min-h-10 flex-1 rounded-t-md px-4 py-2.5 text-[11px] font-black uppercase tracking-[.05em] transition sm:flex-none sm:text-xs ${
                tab === "saved" ? "bg-[#151619] text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <div className="relative min-w-0 flex-1 sm:w-[210px]">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search workout or tag"
                aria-label="Search workout or tag"
                className="h-10 w-full rounded-full border border-white/10 bg-[#151619] pl-9 pr-3 text-[11px] font-bold text-white outline-none placeholder:text-white/25 focus:border-fitlime/60"
              />
            </div>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[.08em] text-white/25 sm:text-[11px]">
            {filteredAndSorted.length} {filteredAndSorted.length === 1 ? "item" : "items"}
          </span>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-[10px] font-black uppercase tracking-wide text-fitlime hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        <div className="mt-3 space-y-3">
          {!hydrated || loading ? (
            <Loading label="Loading workouts…" />
          ) : filteredAndSorted.length === 0 ? (
            <EmptyState savedTab={tab === "saved"} />
          ) : (
            filteredAndSorted.map((workout) => (
              <PlanCard key={workout.id} workout={workout} savedTab={tab === "saved"} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
