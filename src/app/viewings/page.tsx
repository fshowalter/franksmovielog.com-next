import { Viewings } from "@/components/Viewings";
import getComponentData from "@/components/Viewings/data";

export default async function ViewingsPage() {
  const data = await getComponentData();

  return <Viewings {...data} />;
}
