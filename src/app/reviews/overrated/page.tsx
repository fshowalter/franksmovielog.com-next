import { Overrated } from "@/components/Overrated";
import getComponentData from "@/components/Overrated/data";

export default async function UnderseenGemsPage() {
  const data = await getComponentData();

  return <Overrated {...data} />;
}
