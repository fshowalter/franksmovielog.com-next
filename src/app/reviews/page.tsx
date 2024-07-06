import { Reviews, getReviewedTitles } from "@/components";

export default async function ReviewsPage() {
  const { reviewedTitles, genres, releaseYears, reviewYears } =
    await getReviewedTitles();

  return (
    <Reviews
      reviewedTitles={reviewedTitles}
      genres={genres}
      releaseYears={releaseYears}
      reviewYears={reviewYears}
    />
  );
}
