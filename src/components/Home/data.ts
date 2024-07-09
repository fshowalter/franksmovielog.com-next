import reviewedTitlesJson from "@/data/reviewedTitlesJson";
import reviewsMarkdown from "@/data/reviewsMarkdown";
import { HomeProps } from "./Home";

function formatDate(reviewDate: Date) {
  return reviewDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function getComponentData(): Promise<HomeProps> {
  const json = await reviewedTitlesJson();
  const markdown = await reviewsMarkdown();
  json.sort((a, b) => b.sequence.localeCompare(a.sequence));

  const data = json.slice(0, 10).map((title) => {
    const markdownReview = markdown.find(
      (review) => review.imdbId === title.imdbId,
    );

    if (!markdownReview) {
      throw new Error(
        `No markdown review found with imdbId"${title.imdbId} for title "${title.title}"`,
      );
    }

    const homePageItemData: HomeProps["data"][0] = {
      imdbId: title.imdbId,
      sequence: title.sequence,
      title: title.title,
      year: title.year,
      date: formatDate(markdownReview.date),
      slug: title.slug,
      grade: title.grade,
      principalCastNames: title.principalCastNames,
      directorNames: title.directorNames,
      reviewExcerpt: markdownReview.excerpt,
    };

    return homePageItemData;
  });

  return {
    data,
  };
}
