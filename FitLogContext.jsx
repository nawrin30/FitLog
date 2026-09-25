"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const FitLogContext = createContext(null);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem(PLAN_KEY) || "[]"));
      setSaved(JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"));
      setDone(JSON.parse(localStorage.getItem(DONE_KEY) || "[]"));
    } catch {
      setPlan([]);
      setSaved([]);
      setDone([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    localStorage.setItem(DONE_KEY, JSON.stringify(done));
  }, [plan, saved, done, hydrated]);

  function addToPlan(workout) {
    if (plan.some((item) => item.id === workout.id)) {
      toast.custom((t) => (
        <div
          className={`flex items-center gap-2 rounded-full border border-white/10 bg-[#151619] px-3 py-2 text-[11px] font-black text-white shadow-2xl transition-all ${t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-500 text-white">
            <X size={11} strokeWidth={3} />
          </span>
          <span>Already in your plan</span>
        </div>
      ), { duration: 2200 });
      return;
    }

    if (plan.length >= 5) {
      toast.error("Today's plan is full");
      return;
    }

    setPlan((current) => [...current, workout]);
    toast.success("Added to today's plan");
  }

  function saveForLater(workout) {
    if (saved.some((item) => item.id === workout.id)) {
      toast("Already saved");
      return;
    }

    setSaved((current) => [...current, workout]);
    toast.success("Saved for later");
  }

  function removeFromPlan(id) {
    setPlan((current) => current.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  }

  function removeSaved(id) {
    setSaved((current) => current.filter((item) => item.id !== id));
    toast.success("Removed from saved");
  }

  function markDone(id) {
    setDone((current) => current.includes(id) ? current : [...current, id]);
    toast.success("Workout marked as done");
  }

  const metrics = useMemo(() => ({
    exercises: plan.length,
    minutes: plan.reduce((sum, item) => sum + Number(item.duration || 0), 0),
    calories: plan.reduce((sum, item) => sum + Number(item.caloriesBurned || 0), 0)
  }), [plan]);

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        done,
        hydrated,
        metrics,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeSaved,
        markDone
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  return useContext(FitLogContext);
}
