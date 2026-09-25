"use client";

import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import { useFitLog } from "../context/FitLogContext";

export default function PlanCard({ workout, savedTab }) {
  const { done, markDone, removeFromPlan, removeSaved } = useFitLog();
  const completed = done.includes(workout.id);

  return (
    <article
      className={`grid grid-cols-[88px_1fr] gap-3 rounded-[10px] border border-white/[.07] bg-[#151619] p-3 transition hover:border-white/[.14] sm:grid-cols-[132px_1fr] sm:gap-4 sm:p-3.5 lg:grid-cols-[150px_1fr] ${
        completed ? "opacity-60" : ""
      }`}
    >
      <Link href={`/workout/${workout.id}`} className="overflow-hidden rounded-md bg-[#242528]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full min-h-[82px] w-full object-cover sm:min-h-[94px]"
        />
      </Link>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-1.5">
              {workout.muscleGroups.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-full bg-fitlime px-2 py-1 text-[8px] font-black uppercase leading-none text-black sm:text-[9px]">
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/workout/${workout.id}`}
              className="display mt-2 block truncate text-[19px] font-black uppercase leading-none hover:text-fitlime sm:text-[22px] lg:text-[24px]"
            >
              {workout.name}
            </Link>

            <p className="mt-1.5 truncate text-[10px] font-bold text-white/35 sm:text-[11px]">{workout.equipment}</p>
          </div>

          <button
            type="button"
            onClick={() => (savedTab ? removeSaved(workout.id) : removeFromPlan(workout.id))}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-white/45 transition hover:border-red-400/30 hover:text-red-300 sm:h-9 sm:w-9"
            aria-label={`Remove ${workout.name}`}
            title="Remove"
          >
            <X size={14} />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-black text-white/40 sm:text-[11px]">
          <span className="flex items-center gap-1.5"><Clock3 size={11} />{workout.duration} min</span>
          <span className="flex items-center gap-1.5"><Flame size={11} />{workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1.5"><Star size={11} />{workout.rating}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href={`/workout/${workout.id}`}
            className="inline-flex min-h-9 items-center rounded-full border border-white/10 px-3.5 py-2 text-[9px] font-black uppercase tracking-wide text-white/65 transition hover:border-white/25 hover:text-white sm:text-[11px]"
          >
            View Details
          </Link>

          {!savedTab && (
            <button
              type="button"
              onClick={() => markDone(workout.id)}
              disabled={completed}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-fitlime px-3.5 py-2 text-[10px] font-black uppercase tracking-wide text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:text-[11px]"
            >
              <Check size={11} />
              {completed ? "Done" : "Mark as Done"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
