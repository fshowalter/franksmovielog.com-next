import { Home } from "@/components/Home";
import getComponentData from "@/components/Home/data";

export default async function HomePage() {
  const data = await getComponentData();

  return <Home {...data} />;
}
