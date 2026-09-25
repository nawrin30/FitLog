"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFitLog } from "../context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const [open, setOpen] = useState(false);

  const workoutActive = pathname === "/";
  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-white/[.06] bg-[#0D0E10]/95 backdrop-blur-xl">
      <div className="nav-container flex h-[58px] items-center justify-between">

        {}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="h-7 w-7 object-contain"
          />
          <span className="ml-1 text-[10px] font-black uppercase tracking-[-.02em] text-white">
            FITLOG
          </span>
        </Link>

        {}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`text-[10px] font-black uppercase tracking-[.15em] transition ${
              workoutActive
                ? "text-fitlime"
                : "text-white/45 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-[10px] font-black uppercase tracking-[.15em] transition ${
              planActive
                ? "text-fitlime"
                : "text-white/45 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/my-plan"
            className="rounded-full bg-fitlime px-3 py-1.5 text-[9px] font-black uppercase text-black"
          >
            Plan <span className="ml-1">{plan.length}</span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="rounded-full border border-white/20 px-3 py-1.5 text-[9px] font-black uppercase text-white"
          >
            Saved <span className="ml-1">{saved.length}</span>
          </Link>
        </div>

        {}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 md:hidden"
          aria-label="Open menu"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {}
      {open && (
        <div className="border-t border-white/[.06] bg-[#0D0E10] px-3 pb-4 md:hidden">
          <div className="mx-auto flex max-w-[1120px] flex-col gap-2 pt-3">

            <Link
              onClick={() => setOpen(false)}
              href="/"
              className={`rounded-lg px-4 py-3 text-[10px] font-black uppercase ${
                workoutActive
                  ? "bg-fitlime text-black"
                  : "bg-white/[.04]"
              }`}
            >
              Workout
            </Link>

            <Link
              onClick={() => setOpen(false)}
              href="/my-plan"
              className={`rounded-lg px-4 py-3 text-[10px] font-black uppercase ${
                planActive
                  ? "bg-fitlime text-black"
                  : "bg-white/[.04]"
              }`}
            >
              My Plan
            </Link>

            <div className="grid grid-cols-2 gap-2 pt-1">

              <Link
                onClick={() => setOpen(false)}
                href="/my-plan"
                className="rounded-lg bg-fitlime px-4 py-3 text-center text-[10px] font-black uppercase text-black"
              >
                Plan {plan.length}
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/my-plan?tab=saved"
                className="rounded-lg border border-white/15 px-4 py-3 text-center text-[10px] font-black uppercase"
              >
                Saved {saved.length}
              </Link>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}