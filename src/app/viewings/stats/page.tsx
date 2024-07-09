import { AllTimeStats } from "@/components/AllTimeStats";
import getComponentData from "@/components/AllTimeStats/data";

export default async function ReviewsPage() {
  const data = await getComponentData();

  return <AllTimeStats {...data} />;
}
