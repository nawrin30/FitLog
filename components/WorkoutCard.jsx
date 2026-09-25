import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="workout-card group overflow-hidden rounded-[12px] border border-white/[.07] bg-[#151619] transition hover:-translate-y-0.5 hover:border-white/15"
    >
      <div className="relative aspect-[1.65/1] overflow-hidden bg-[#242528]">
        <img
          src={workout.image}
          alt={workout.name}
          className="card-image h-full w-full object-cover"
        />
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1">
          {workout.muscleGroups.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-fitlime px-2 py-1 text-[7px] font-black uppercase tracking-wide text-black"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3">
        <h3 className="display truncate text-[16px] font-black uppercase leading-none sm:text-[18px]">
          {workout.name}
        </h3>

        <p className="mt-2 truncate text-[8px] font-bold text-white/35">
          {workout.equipment}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-white/[.07] pt-2.5 text-[7px] font-black text-white/45">
          <span className="flex items-center gap-1"><Clock3 size={10} />{workout.duration} min</span>
          <span className="flex items-center gap-1"><Flame size={10} />{workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1"><Star size={10} />{workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
