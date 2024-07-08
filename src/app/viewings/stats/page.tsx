import { AllTimeStats } from "@/components/AllTimeStats";
import { getAllTimeStats } from "@/components/AllTimeStats/data";

export default async function ReviewsPage() {
  const { allTimeStats, statYears } = await getAllTimeStats();

  return <AllTimeStats stats={allTimeStats} statYears={statYears} />;
}
