import { Reviews, getReviewedTitles } from "@/components/Reviews";

export default async function ReviewsPage() {
  const { reviewedTitles, genres, releaseYears, reviewYears } =
    await getReviewedTitles();

  return (
    <Reviews
      reviewedTitles={reviewedTitles}
      distinctGenres={genres}
      distinctReleaseYears={releaseYears}
      distinctReviewYears={reviewYears}
    />
  );
}
