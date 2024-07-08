import { Viewings, getViewings } from "@/components/Viewings";

export default async function ViewingsPage() {
  const { viewings, genres, releaseYears, viewingYears, media, venues } =
    await getViewings();

  return (
    <Viewings
      distinctViewingYears={viewingYears}
      distinctGenres={genres}
      distinctMedia={media}
      distinctReleaseYears={releaseYears}
      distinctVenues={venues}
      viewings={viewings}
    />
  );
}
