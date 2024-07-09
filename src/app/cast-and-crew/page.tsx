import { CastAndCrew } from "@/components/CastAndCrew";
import getComponentData from "@/components/CastAndCrew/data";

export default async function CastAndCrewPage() {
  const data = await getComponentData();

  return <CastAndCrew {...data} />;
}
