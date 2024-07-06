import type { IReview } from "./data";

const gradeMap: Record<string, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  F: 1,
};

export function StructuredData({ review }: { review: IReview }) {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Movie",
      name: review.title,
      sameAs: `http://www.imdb.com/title/${review.imdbId}/`,
      dateCreated: review.year,
      director: {
        "@type": "Person",
        name: review.directorNames[0],
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: gradeMap[review.frontmatter.grade[0]],
    },
    author: {
      "@type": "Person",
      name: "Frank Showalter",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
