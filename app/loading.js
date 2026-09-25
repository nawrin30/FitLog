export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-fitblack grid place-items-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-fitlime" />
        <p className="mt-4 text-[10px] font-black uppercase tracking-[.24em] text-white/45">
          Loading workouts…
        </p>
      </div>
    </div>
  );
}
