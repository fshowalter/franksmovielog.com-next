"use server";

import { getReviewsJsonData } from "@/data/reviewsJson";
import { getReviewBySlug } from "@/data/reviewsMarkdown";

export interface IHomePageItem {
  imdbId: string;
  sequence: string;
  title: string;
  year: string;
  date: string;
  slug: string;
  grade: string;
  principalCastNames: string[];
  directorNames: string[];
  reviewExcerpt: string;
}

function formatDate(reviewDate: Date) {
  return reviewDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function getHomePageItems(): Promise<IHomePageItem[]> {
  const reviewedTitlesData = await getReviewsJsonData();

  reviewedTitlesData.sort((a, b) => b.sequence.localeCompare(a.sequence));

  return reviewedTitlesData.slice(0, 10).map((title) => {
    const review = getReviewBySlug(title.slug);

    return {
      imdbId: title.imdbId,
      sequence: title.sequence,
      title: title.title,
      year: title.year,
      date: formatDate(review.date),
      slug: title.slug,
      grade: title.grade,
      principalCastNames: title.principalCastNames,
      directorNames: title.directorNames,
      reviewExcerpt: review.excerpt,
    };
  });
}
