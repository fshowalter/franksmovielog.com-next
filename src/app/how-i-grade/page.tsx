import { Article } from "@/components/Article";
import React from "react";
import { getPageBySlug } from "@/data/pages";
import { getReviewedTitlesData } from "@/data/reviewedTitles";

export default async function HowoIGradePage() {
  const pageData = getPageBySlug("how-i-grade");

  const reviewedTitlesData = await getReviewedTitlesData();

  reviewedTitlesData.sort((a, b) => b.sequence.localeCompare(a.sequence));

  const moreReviews = reviewedTitlesData.slice(0, 4).map((title) => {
    return {
      title: title.title,
      year: title.year,
      slug: title.slug,
      grade: title.grade,
      genres: title.genres,
    };
  });

  return (
    <Article
      title={pageData.title}
      articleText={pageData.content}
      slug={pageData.slug}
      alt="Empty cinema seats."
      moreReviewedTitles={moreReviews}
    />
  );
}
