import allTimeStatsJson from "@/data/allTimeStatsJson";
import type { AllTimeStatsProps } from "./AllTimeStats";
import yearStatsJson from "@/data/yearStatsJson";
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

export default async function getComponentData(): Promise<AllTimeStatsProps> {
  const json = await allTimeStatsJson();
  const yearsJson = await yearStatsJson();

  const statYears = new Set<string>();

  yearsJson.forEach((statYear) => {
    statYears.add(statYear.year);
  });

  const data: AllTimeStatsProps["data"] = {
    ...json,
    mostWatchedDirectors: formatViewingDatesForMostWatchedPeople(
      json.mostWatchedDirectors,
    ),
    mostWatchedPerformers: formatViewingDatesForMostWatchedPeople(
      json.mostWatchedPerformers,
    ),
    mostWatchedWriters: formatViewingDatesForMostWatchedPeople(
      json.mostWatchedWriters,
    ),
    distinctStatYears: Array.from(statYears).toSorted(),
  };

  return { data };
}
