import { getReviewedTitles } from "@/data/reviewedTitles";
import { getReviewBySlug } from "@/data/reviews";

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
  still: {};
}

export async function getHomePageItems(): Promise<IHomePageItem[]> {
  const reviewedTitles = await getReviewedTitles();

  reviewedTitles.sort((a, b) => b.sequence.localeCompare(a.sequence));

  return reviewedTitles.slice(0, 10).map((title) => {
    const review = getReviewBySlug(title.slug);

    return {
      imdbId: title.imdbId,
      sequence: title.sequence,
      title: title.title,
      year: title.year,
      date: "",
      slug: title.slug,
      grade: title.grade,
      principalCastNames: title.principalCastNames,
      directorNames: title.directorNames,
      reviewExcerpt: review.excerpt,
      still: {},
    };
  });
}
