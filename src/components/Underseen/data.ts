import { getUnderseenGemsJson } from "@/data/underseenGemsJson";
import type { UnderseenProps } from "./Underseen";

export default async function getComponentData(): Promise<UnderseenProps> {
  const underseenGemsJson = await getUnderseenGemsJson();

  underseenGemsJson.sort((a, b) =>
    b.releaseSequence.localeCompare(a.releaseSequence),
  );

  const genres = new Set<string>();
  const releaseYears = new Set<string>();

  const titles = underseenGemsJson.map((title) => {
    title.genres.forEach((genre) => genres.add(genre));
    releaseYears.add(title.year);

    return title;
  });

  return {
    titles,
    distinctGenres: Array.from(genres).toSorted(),
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
    initialSort: "release-date-desc",
  };
}
