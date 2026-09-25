export default function Footer() {
  return (
    <footer className="border-t border-white/[.06] bg-[#0B0C0E]">
      <div className="fit-container flex min-h-[76px] flex-col items-start justify-center gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="FitLog logo"
            className="h-5 w-5 object-contain"
          />
          <span className="text-[12px] font-extrabold tracking-[-0.02em] text-white">
            FITLOG
          </span>
        </div>

        <p className="text-[9px] font-bold text-white/35">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
