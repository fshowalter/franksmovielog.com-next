import { WatchlistProgress } from "@/components/WatchlistProgress";
import getComponentData from "@/components/WatchlistProgress/data";

export default async function WatchlistProgressPage() {
  const data = await getComponentData();

  return <WatchlistProgress {...data} />;
}
