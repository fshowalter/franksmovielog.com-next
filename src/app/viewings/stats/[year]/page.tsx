import { YearStats } from "@/components/YearStats";
import getComponentData from "@/components/YearStats/data";
import yearStatsJson from "@/data/yearStatsJson";

export async function generateStaticParams() {
  const json = await yearStatsJson();

  return json.map((stats) => ({
    year: stats.year,
  }));
}

export default async function YearStatsPage({
  params,
}: {
  params: { year: string };
}) {
  const data = await getComponentData(params.year);

  return <YearStats {...data} />;
}
