import { getWatchlistProgressJsonData } from "@/data/watchlistProgressJson";
import type { WatchlistProgressProps } from "./WatchlistProgress";

export default async function getComponentData(): Promise<WatchlistProgressProps> {
  const progress = await getWatchlistProgressJsonData();

  return {
    progress,
  };
}
