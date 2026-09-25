export default function Loading({ label = "Loading workouts…" }) {
  return (
    <div className="flex min-h-[250px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-fitlime" />
        <p className="mt-4 text-[9px] font-black uppercase tracking-[.25em] text-white/40">
          {label}
        </p>
      </div>
    </div>
  );
}
