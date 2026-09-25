"use client";

import { Bookmark, Plus } from "lucide-react";
import { useFitLog } from "../context/FitLogContext";

export default function WorkoutDetails({ workout }) {
  const { plan, saved, addToPlan, saveForLater } = useFitLog();

  const inPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);
  const full = plan.length >= 5 && !inPlan;

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating]
  ];

  return (
    <section className="bg-fitblack py-0 sm:py-1">
      <div className="fit-container">
        <div className="grid overflow-hidden border border-white/[.07] bg-[#0F1012] lg:grid-cols-2">
          {}
          <div className="h-[430px] bg-[#202226] sm:h-[520px] lg:h-[690px]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"
            />
          </div>

          {}
          <div className="flex flex-col px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
            <h1 className="display text-[34px] font-black uppercase leading-[.95] sm:text-[44px] lg:text-[48px]">
              {workout.name}
            </h1>

            <p className="mt-4 max-w-2xl text-[12px] font-semibold leading-5 text-white/75 sm:text-[14px] sm:leading-6">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-fitlime px-3 py-1.5 text-[9px] font-black uppercase text-black sm:text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {}
            <div className="mt-6 overflow-hidden rounded-[10px] bg-[#242A2D]">
              <div className="divide-y divide-white/[.08]">
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid min-h-[47px] grid-cols-[.9fr_1.4fr] items-center gap-4 px-4 py-3 sm:min-h-[54px] sm:grid-cols-[1fr_1.5fr] sm:px-5"
                  >
                    <p className="text-[9px] font-black uppercase tracking-[.06em] text-white sm:text-[10px]">
                      {label}
                    </p>
                    <p className="text-right text-[11px] font-bold text-white sm:text-[13px]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-white sm:text-[12px]">
                Instructions
              </p>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={instruction}
                    className="flex gap-3 text-[11px] font-semibold leading-5 text-white/70 sm:text-[12px] sm:leading-6"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/20 text-[8px] font-black text-white sm:h-6 sm:w-6 sm:text-[9px]">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                disabled={full}
                onClick={() => addToPlan(workout)}
                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-fitlime px-5 py-3 text-[10px] font-black uppercase tracking-wide text-black transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-12 sm:text-[11px]"
              >
                <Plus size={14} strokeWidth={2.5} />
                {full ? "Plan full" : "Add to today's plan"}
              </button>

              <button
                disabled={isSaved}
                onClick={() => saveForLater(workout)}
                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-white/[.05] disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-12 sm:text-[11px]"
              >
                <Bookmark size={14} />
                {isSaved ? "Saved" : "Save for later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
