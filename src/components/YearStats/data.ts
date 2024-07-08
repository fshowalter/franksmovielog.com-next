import type { IYearStats } from "./YearStats";
import { getJsonStatYears, getJsonYearStats } from "@/data/yearStatsJson";
import type { IMostWatchedPerson } from "../Stats/MostWatchedPeople";

export function getStatYears() {
  return getJsonStatYears();
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatViewingDatesForMostWatchedPeople(
  mostWatchedPeople: IMostWatchedPerson[],
) {
  return mostWatchedPeople.map((person) => {
    return {
      ...person,
      viewings: person.viewings.map((viewing) => {
        const viewingDate = new Date(viewing.date);
        return {
          ...viewing,
          date: dateFormat.format(viewingDate),
        };
      }),
    };
  });
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
      mostWatchedDirectors: formatViewingDatesForMostWatchedPeople(
        jsonYearStats.mostWatchedDirectors,
      ),
      mostWatchedPerformers: formatViewingDatesForMostWatchedPeople(
        jsonYearStats.mostWatchedPerformers,
      ),
      mostWatchedWriters: formatViewingDatesForMostWatchedPeople(
        jsonYearStats.mostWatchedWriters,
      ),
    },
    statYears,
  };
}
