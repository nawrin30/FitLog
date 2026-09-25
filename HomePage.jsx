"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Hero from "./Hero";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";
import Loading from "./Loading";

const API = "https://api.abcz.workers.dev/api/fitlog";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [sort, setSort] = useState("duration");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    fetch(API)
      .then((response) => {
        if (!response.ok) throw new Error("API error");
        return response.json();
      })
      .then((data) => {
        if (mounted) setWorkouts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (mounted) setError("Could not load workouts. Please refresh the page.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const filteredAndSorted = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = workouts.filter((workout) => {
      if (!query) return true;
      const searchable = [
        workout.name,
        workout.equipment,
        workout.difficulty,
        ...(workout.muscleGroups || [])
      ].join(" ").toLowerCase();
      return searchable.includes(query);
    });

    return filtered.sort((a, b) => {
      if (sort === "calories") return Number(b.caloriesBurned) - Number(a.caloriesBurned);
      if (sort === "rating") return Number(b.rating) - Number(a.rating);
      return Number(a.duration) - Number(b.duration);
    });
  }, [workouts, sort, search]);

  return (
    <>
      <Hero />

      <section id="library" className="bg-fitblack py-12 sm:py-16">
        <div className="fit-container">
          <div className="mb-5 flex flex-col gap-4 border-b border-white/[.06] pb-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="display text-[38px] font-black uppercase leading-none sm:text-[44px]">
                The Library
              </h2>
              <p className="mt-3 text-[13px] text-fitmuted sm:text-[14px]">
                Twelve lifts covering every major muscle group.
              </p>
            </div>

            {!loading && !error && (
              <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
                <div className="relative min-w-0 flex-1 sm:w-[220px]">
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
            )}
          </div>

          {loading && <Loading />}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-7 text-center text-xs text-red-200">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[.08em] text-white/25 sm:text-[11px]">
                  {filteredAndSorted.length} {filteredAndSorted.length === 1 ? "workout" : "workouts"}
                </p>
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
              {filteredAndSorted.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredAndSorted.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-white/[.07] bg-[#151619] p-10 text-center">
                  <p className="display text-2xl font-black uppercase">No workouts found</p>
                  <p className="mt-2 text-xs text-fitmuted">Try another workout name, equipment, or muscle-group tag.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
