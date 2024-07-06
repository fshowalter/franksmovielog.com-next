"use server";

import {
  getReviewedTitlesData,
  getReviewedTitleData,
} from "@/data/reviewedTitles";
import { getReviewBySlug } from "@/data/reviews";
import type { IStillListMovie } from "@/components/StillList";

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

function formatDate(reviewDate: Date) {
  const day = `0${reviewDate.getUTCDate()}`.slice(-2);
  const month = `0${reviewDate.getUTCMonth()}`.slice(-2);

  return `${reviewDate.getUTCFullYear()}-${month}-${day}`;
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
      date: review.date.toString(),
    },
    castAndCrew: title.castAndCrew,
    collections: title.collections,
    moreCastAndCrew: title.moreCastAndCrew,
    moreReviews: title.moreReviews,
    moreCollections: title.moreCollections,
    viewings: title.viewings.map((viewing) => {
      return {
        date: viewing.date,
        venue: viewing.venue,
        venueNotes: viewing.venueNotes,
        medium: viewing.medium,
        mediumNotes: viewing.mediumNotes,
        viewingNotes: null,
        sequence: viewing.sequence,
      };
    }),
  };
}
