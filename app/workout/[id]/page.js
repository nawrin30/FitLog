import { notFound } from "next/navigation";
import WorkoutDetails from "../../../components/WorkoutDetails";

const API = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkout(id) {
  try {
    const response = await fetch(`${API}/${id}`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.id ? data : null;
  } catch {
    return null;
  }
}

export default async function WorkoutDetailsPage({ params }) {
  const workout = await getWorkout(params.id);

  if (!workout) notFound();

  return <WorkoutDetails workout={workout} />;
}
