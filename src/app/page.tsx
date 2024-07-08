import { Home } from "@/components/Home";
import { getHomePageItems } from "@/components/Home/data";

export default async function HomePage() {
  const items = await getHomePageItems();

  return <Home items={items} />;
}
