"use server";

import { getReviewedTitlesData } from "@/data/reviewedTitles";

export interface IReviewedTitle {
  imdbId: string;
  reviewDate: string;
  releaseSequence: string;
  reviewYear: number;
  reviewMonth: string;
  title: string;
  year: string;
  sortTitle: string;
  slug: string;
  grade: string;
  gradeValue: number;
  genres: string[];
}

function formatDate(reviewDate: Date) {
  const day = `0${reviewDate.getUTCDate()}`.slice(-2);
  const month = `0${reviewDate.getUTCMonth()}`.slice(-2);

  return `${reviewDate.getUTCFullYear()}-${month}-${day}`;
}

export async function getReviewedTitles(): Promise<{
  genres: string[];
  releaseYears: string[];
  reviewYears: string[];
  reviewedTitles: IReviewedTitle[];
}> {
  const reviewedTitlesData = await getReviewedTitlesData();

  reviewedTitlesData.sort((a, b) => b.sortTitle.localeCompare(a.sortTitle));

  const genres = new Set<string>();
  const releaseYears = new Set<string>();
  const reviewYears = new Set<string>();

  const reviewedTitles = reviewedTitlesData.map((title) => {
    const reviewDate = new Date(title.reviewDate);
    title.genres.forEach((genre) => genres.add(genre));
    releaseYears.add(title.year);
    reviewYears.add(title.reviewYear);

    return {
      imdbId: title.imdbId,
      releaseSequence: title.sequence,
      title: title.title,
      year: title.year,
      reviewDate: formatDate(reviewDate),
      reviewYear: reviewDate.getUTCFullYear(),
      reviewMonth: reviewDate.toLocaleString("default", { month: "long" }),
      sortTitle: title.sortTitle,
      slug: title.slug,
      grade: title.grade,
      gradeValue: title.gradeValue,
      genres: title.genres,
    };
  });

  reviewedTitles.sort((a, b) => a.sortTitle.localeCompare(b.sortTitle));

  return {
    genres: Array.from(genres).toSorted(),
    releaseYears: Array.from(releaseYears).toSorted(),
    reviewYears: Array.from(reviewYears).toSorted(),
    reviewedTitles,
  };
}
