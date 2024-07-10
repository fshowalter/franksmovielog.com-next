import { Article } from "@/components/Article";
import React from "react";
import pagesMarkdown from "@/data/pagesMarkdown";
import reviewedTitlesJson from "@/data/reviewedTitlesJson";
import type { ArticleProps } from "@/components/Article";

export default async function HowoIGradePage() {
  const markdown = await pagesMarkdown();

  const page = markdown.find((page) => {
    return page.slug == "how-i-grade";
  });

  if (!page) {
    throw new Error(`Unable to find markdown page with slug how-i-grade`);
  }

  const json = await reviewedTitlesJson();

  json.sort((a, b) => b.sequence.localeCompare(a.sequence));

  const moreReviewsData = json.slice(0, 4).map((title) => {
    const titleData: ArticleProps["moreReviewsData"][0] = {
      title: title.title,
      year: title.year,
      slug: title.slug,
      grade: title.grade,
      genres: title.genres,
    };

    return titleData;
  });

  return (
    <Article
      title={page.title}
      articleText={page.content}
      slug={page.slug}
      alt="Empty cinema seats."
      moreReviewsData={moreReviewsData}
    />
  );
}
