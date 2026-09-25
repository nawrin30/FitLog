import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-noise border-b border-white/[.05]">
      <div className="fit-container grid min-h-[390px] items-center gap-8 py-12 sm:min-h-[430px] sm:py-16 lg:grid-cols-[1.35fr_.65fr] lg:py-20">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[.28em] text-fitlime sm:text-[12px]">
            WORKOUT LIBRARY
          </p>

          <h1 className="display mt-4 max-w-[720px] text-[38px] font-black uppercase leading-[.92] sm:text-[48px] lg:text-[56px]">
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          <p className="mt-5 max-w-[610px] text-[13px] leading-6 text-fitmuted sm:text-[14px] sm:leading-6">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="#library"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-fitlime px-5 py-3 text-[11px] font-black uppercase tracking-[.08em] text-black transition hover:scale-[1.03] sm:text-[12px]"
          >
            BROWSE WORKOUTS
            <ArrowDownRight size={13} />
          </Link>
        </div>

        <div className="relative hidden h-[300px] items-center justify-center lg:flex">
          <div className="absolute h-52 w-52 rounded-full bg-fitlime/10 blur-3xl" />
          <img
            src="/banner.png"
            alt="Workout machine illustration"
            className="relative max-h-[290px] max-w-[290px] object-contain mix-blend-screen"
          />
        </div>
      </div>
    </section>
  );
}
