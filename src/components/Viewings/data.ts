import { getViewingsJsonData } from "@/data/viewingsJson";

export interface IViewing {
  sequence: number;
  viewingYear: string;
  viewingMonth: string;
  viewingDay: string;
  viewingDate: string;
  releaseSequence: string;
  title: string;
  medium: string | null;
  venue: string | null;
  year: string;
  sortTitle: string;
  slug: string | null;
  genres: string[];
}

export async function getViewings(): Promise<{
  genres: string[];
  releaseYears: string[];
  viewingYears: string[];
  venues: string[];
  media: string[];
  viewings: IViewing[];
}> {
  const viewingsJsonData = await getViewingsJsonData();

  viewingsJsonData.sort((a, b) => b.sortTitle.localeCompare(a.sortTitle));

  const genres = new Set<string>();
  const releaseYears = new Set<string>();
  const viewingYears = new Set<string>();
  const media = new Set<string>();
  const venues = new Set<string>();

  const viewings = viewingsJsonData.map((title) => {
    const viewingDate = new Date(title.viewingDate);
    title.genres.forEach((genre) => genres.add(genre));
    releaseYears.add(title.year);
    viewingYears.add(title.viewingYear);
    if (title.medium) {
      media.add(title.medium);
    }
    if (title.venue) {
      venues.add(title.venue);
    }

    return {
      sequence: title.sequence,
      viewingYear: title.viewingYear,
      viewingMonth: viewingDate.toLocaleString("en-US", {
        month: "long",
        timeZone: "UTC",
      }),
      viewingDay: viewingDate.toLocaleString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      }),
      viewingDate: viewingDate.getUTCDate().toString(),
      releaseSequence: title.releaseSequence,
      title: title.title,
      medium: title.medium,
      venue: title.venue,
      year: title.year,
      sortTitle: title.sortTitle,
      slug: title.slug,
      genres: title.genres,
    };
  });

  viewings.sort((a, b) => b.sequence - a.sequence);

  return {
    genres: Array.from(genres).toSorted(),
    releaseYears: Array.from(releaseYears).toSorted(),
    viewingYears: Array.from(viewingYears).toSorted(),
    media: Array.from(media).toSorted(),
    venues: Array.from(venues).toSorted(),
    viewings,
  };
}
