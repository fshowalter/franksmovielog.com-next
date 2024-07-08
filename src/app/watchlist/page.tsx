import { Watchlist } from "@/components/Watchlist";
import getComponentData from "@/components/Watchlist/data";

export default async function WatchlistPage() {
  const data = await getComponentData();

  return <Watchlist {...data} />;
}
