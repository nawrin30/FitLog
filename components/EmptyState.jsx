import Link from "next/link";

export default function EmptyState({ savedTab }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[12px] border border-white/[.07] bg-[#151619] px-5 text-center">
      <p className="text-[8px] font-black uppercase tracking-[.3em] text-fitlime">NOTHING HERE YET</p>
      <h3 className="display mt-2 text-[25px] font-black uppercase">
        {savedTab ? "No saved lifts" : "No planned lifts"}
      </h3>
      <p className="mt-2 max-w-xs text-[9px] leading-5 text-fitmuted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-5 rounded-full bg-fitlime px-4 py-2.5 text-[8px] font-black uppercase text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
}
