import { Reviews } from "@/components/Reviews";
import getComponentData from "@/components/Reviews/data";

export default async function ReviewsPage() {
  const data = await getComponentData();

  return <Reviews {...data} />;
}
