import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[75vh] place-items-center bg-fitblack px-5">
      <div className="text-center">
        <p className="text-[11px] font-black uppercase tracking-[.3em] text-fitlime">404</p>
        <h1 className="display mt-3 text-6xl font-black uppercase sm:text-8xl">
          Page not found.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-fitmuted">
          The page you requested does not exist.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex rounded-full bg-fitlime px-6 py-3 text-[10px] font-black uppercase tracking-wider text-black"
        >
          Back to workouts
        </Link>
      </div>
    </section>
  );
}
