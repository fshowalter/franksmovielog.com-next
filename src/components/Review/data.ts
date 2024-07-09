import reviewedTitlesJson from "@/data/reviewedTitlesJson";
import reviewsMarkdown from "@/data/reviewsMarkdown";
import viewingsMarkdown from "@/data/viewingsMarkdown";
import type { ReviewProps } from "./Review";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(reviewDate: Date) {
  return dateFormat.format(reviewDate);
}

export default async function getComponentData(
  slug: string,
): Promise<ReviewProps> {
  const json = await reviewedTitlesJson();

  const jsonTitle = json.find((title) => {
    return title.slug === slug;
  });

  if (!jsonTitle) {
    throw new Error(`No reviewed title with slug: ${slug}`);
  }

  const markdown = await reviewsMarkdown();

  const markdownReview = markdown.find((review) => {
    return review.slug === slug;
  });

  if (!markdownReview) {
    throw new Error(`No markdown review with slug: ${slug}`);
  }

  const viewings = await viewingsMarkdown();

  const markdownViewings = viewings.filter((viewing) => {
    return viewing.imdbId === jsonTitle.imdbId;
  });

  if (markdownViewings.length === 0) {
    throw new Error(`No markdown viewings with imdbId: ${jsonTitle.imdbId}`);
  }

  const data: ReviewProps["data"] = {
    imdbId: jsonTitle.imdbId,
    title: jsonTitle.title,
    year: jsonTitle.year,
    slug: jsonTitle.slug,
    originalTitle: jsonTitle.originalTitle,
    countries: jsonTitle.countries,
    runtimeMinutes: jsonTitle.runtimeMinutes,
    directorNames: jsonTitle.directorNames,
    writerNames: jsonTitle.writerNames,
    principalCastNames: jsonTitle.principalCastNames,
    linkedHtml: markdownReview.content,
    frontmatter: {
      grade: markdownReview.grade,
      date: formatDate(markdownReview.date),
    },
    castAndCrew: jsonTitle.castAndCrew,
    collections: jsonTitle.collections,
    moreCastAndCrew: jsonTitle.moreCastAndCrew,
    moreReviews: jsonTitle.moreReviews,
    moreCollections: jsonTitle.moreCollections,
    viewings: markdownViewings
      .toSorted((a, b) => b.sequence - a.sequence)
      .map((viewing) => {
        return {
          date: formatDate(viewing.date),
          venue: viewing.venue,
          venueNotes: viewing.venueNotes,
          medium: viewing.medium,
          mediumNotes: viewing.mediumNotes,
          viewingNotes: viewing.viewingNotes,
          sequence: viewing.sequence,
        };
      }),
  };

  return { data };
}
