import { Collections } from "@/components/Collections";
import getComponentData from "@/components/Collections/data";

export default async function CollectionsPage() {
  const data = await getComponentData();

  return <Collections {...data} />;
}
