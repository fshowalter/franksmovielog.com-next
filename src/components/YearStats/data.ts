import type { IYearStats } from "./YearStats";
import { getJsonStatYears, getJsonYearStats } from "@/data/yearStatsJson";

export function getStatYears() {
  return getJsonStatYears();
}

export function getStatsForYear(year: string): {
  stats: IYearStats;
  statYears: string[];
} {
  const jsonYearStats = getJsonYearStats(year);
  const statYears = getJsonStatYears();

  return {
    stats: {
      ...jsonYearStats,
    },
    statYears,
  };
}
