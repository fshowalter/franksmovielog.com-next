import { getAllTimeStatsJsonData } from "@/data/allTimeStatsJson";
import type { IAllTimeStats } from "./AllTimeStats";
import { getJsonStatYears } from "@/data/yearStatsJson";

export async function getAllTimeStats(): Promise<{
  allTimeStats: IAllTimeStats;
  statYears: string[];
}> {
  const allTimeStatsJsonData = await getAllTimeStatsJsonData();
  const statYears = getJsonStatYears();

  return {
    allTimeStats: {
      ...allTimeStatsJsonData,
    },
    statYears,
  };
}
