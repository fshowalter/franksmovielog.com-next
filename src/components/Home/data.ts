import { getReviewedTitlesData } from "@/data/reviewedTitles";
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
}

function formatDate(reviewDate: Date)  {
  const day = `0${reviewDate.getUTCDate()}`.slice(-2);

  return `${day} ${reviewDate.toLocaleString('default', { month: 'short' })} ${reviewDate.getFullYear()}`
}

export async function getHomePageItems(): Promise<IHomePageItem[]> {
  const reviewedTitlesData = await getReviewedTitlesData();

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
