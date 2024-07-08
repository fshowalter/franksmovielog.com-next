import { getAllTimeStatsJsonData } from "@/data/allTimeStatsJson";
import type { IAllTimeStats } from "./AllTimeStats";
import { getJsonStatYears } from "@/data/yearStatsJson";
import type { IMostWatchedPerson } from "../Stats/MostWatchedPeople";

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

export async function getAllTimeStats(): Promise<{
  allTimeStats: IAllTimeStats;
  statYears: string[];
}> {
  const allTimeStatsJsonData = await getAllTimeStatsJsonData();
  const statYears = getJsonStatYears();

  return {
    allTimeStats: {
      ...allTimeStatsJsonData,
      mostWatchedDirectors: formatViewingDatesForMostWatchedPeople(
        allTimeStatsJsonData.mostWatchedDirectors,
      ),
      mostWatchedPerformers: formatViewingDatesForMostWatchedPeople(
        allTimeStatsJsonData.mostWatchedPerformers,
      ),
      mostWatchedWriters: formatViewingDatesForMostWatchedPeople(
        allTimeStatsJsonData.mostWatchedWriters,
      ),
    },
    statYears,
  };
}
