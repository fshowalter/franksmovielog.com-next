import { getWatchlistTitlesJsonData } from "@/data/watchlistTitlesJson";
import type { IWatchlistTitle } from "./Watchlist";
import { getJsonStatYears } from "@/data/yearStatsJson";

export default async function getComponentData(): Promise<{
  titles: readonly IWatchlistTitle[];
  distinctDirectors: readonly string[];
  distinctPerformers: readonly string[];
  distinctWriters: readonly string[];
  distinctCollections: readonly string[];
  distinctReleaseYears: readonly string[];
}> {
  const watchlistTitlesJsonData = await getWatchlistTitlesJsonData();

  const directors = new Set<string>();
  const performers = new Set<string>();
  const writers = new Set<string>();
  const collections = new Set<string>();
  const releaseYears = new Set<string>();

  const watchlistTitles = watchlistTitlesJsonData.map((title) => {
    title.directorNames.forEach((name) => directors.add(name));
    title.performerNames.forEach((name) => performers.add(name));
    title.writerNames.forEach((name) => writers.add(name));
    title.collectionNames.forEach((name) => collections.add(name));
    releaseYears.add(title.year);
    return title;
  });

  return {
    titles: watchlistTitles,
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
    distinctDirectors: Array.from(directors).toSorted(),
    distinctPerformers: Array.from(performers).toSorted(),
    distinctWriters: Array.from(writers).toSorted(),
    distinctCollections: Array.from(collections).toSorted(),
  };
}
