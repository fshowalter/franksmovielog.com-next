"use server";

import {
  getReviewedTitlesData,
  getReviewedTitleData,
} from "@/data/reviewedTitles";
import { getReviewBySlug } from "@/data/reviews";
import type { IStillListMovie } from "@/components/StillList";
import { getViewingsForSlug } from "@/data/viewings";

export interface IMoreReviewsCastAndCrewMember {
  name: string;
  slug: string;
  creditKind: string;
  titles: IStillListMovie[];
}

export interface IMoreReviewsCollection {
  name: string;
  slug: string;
  titles: IStillListMovie[];
}

export interface IReviewCastAndCrewMember {
  name: string;
  slug: string;
}

export interface IReviewCollection {
  name: string;
  slug: string;
}

export interface IReviewViewing {
  date: string;
  venue: string | null;
  venueNotes: string | null;
  medium: string | null;
  mediumNotes: string | null;
  viewingNotes: string | null;
  sequence: number;
}

export interface IReview {
  imdbId: string;
  title: string;
  originalTitle: string | null;
  year: string;
  countries: string[];
  runtimeMinutes: number;
  slug: string;
  frontmatter: {
    grade: string;
    date: string;
  };
  linkedHtml: string;
  viewings: IReviewViewing[];
  directorNames: string[];
  principalCastNames: string[];
  writerNames: string[];
  castAndCrew: IReviewCastAndCrewMember[];
  collections: IReviewCollection[];
  moreCastAndCrew: IMoreReviewsCastAndCrewMember[];
  moreCollections: IMoreReviewsCollection[];
  moreReviews: IStillListMovie[];
}

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

export async function getReviewSlugs(): Promise<string[]> {
  const reviewedTitlesData = await getReviewedTitlesData();

  return reviewedTitlesData.map((title) => {
    return title.slug;
  });
}

export async function getReview(slug: string): Promise<IReview> {
  const title = await getReviewedTitleData(slug);
  const review = getReviewBySlug(slug);
  const viewings = getViewingsForSlug(slug);

  return {
    imdbId: title.imdbId,
    title: title.title,
    year: title.year,
    slug: title.slug,
    originalTitle: title.originalTitle,
    countries: title.countries,
    runtimeMinutes: title.runtimeMinutes,
    directorNames: title.directorNames,
    writerNames: title.writerNames,
    principalCastNames: title.principalCastNames,
    linkedHtml: review.content,
    frontmatter: {
      grade: review.grade,
      date: formatDate(review.date),
    },
    castAndCrew: title.castAndCrew,
    collections: title.collections,
    moreCastAndCrew: title.moreCastAndCrew,
    moreReviews: title.moreReviews,
    moreCollections: title.moreCollections,
    viewings: viewings
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
}
