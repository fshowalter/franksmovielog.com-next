import {
  IStillListMovie,
  StillList,
  StillListHeading,
  StillListNav,
} from "@/components/StillList";
import type { IReview } from "./data";
import { twMerge } from "tailwind-merge";

export function MoreReviews({
  review,
  className,
}: {
  review: IReview;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "tablet:pt-8 tablet:pb-32 desktop:gap-y-24 bg-default tablet:bg-subtle flex flex-col items-center gap-y-12",
        className,
      )}
    >
      {review.moreCastAndCrew.map((castAndCrewMember) => (
        <MoreReviewsList
          key={castAndCrewMember.slug}
          leadText={leadTextForCreditKind(castAndCrewMember.creditKind)}
          linkText={castAndCrewMember.name}
          linkTarget={`/cast-and-crew/${castAndCrewMember.slug}`}
          reviews={castAndCrewMember.titles}
        />
      ))}

      {review.moreCollections.map((collection) => (
        <MoreReviewsList
          key={collection.slug}
          leadText="More"
          linkText={collection.name}
          linkTarget={`/collections/${collection.slug}`}
          reviews={collection.titles}
        />
      ))}

      <MoreReviewsList
        leadText="More"
        linkText="Reviews"
        linkTarget="/reviews/"
        reviews={review.moreReviews}
      />
    </div>
  );
}

function leadTextForCreditKind(creditKind: string): string {
  switch (creditKind) {
    case "director": {
      return "More directed by";
    }
    case "performer": {
      return "More with";
    }
    case "writer": {
      return "More written by";
    }
    default: {
      throw new Error(`Unknown credit kind ${creditKind}`);
    }
  }
}

function MoreReviewsList({
  reviews,
  leadText,
  linkText,
  linkTarget,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
  reviews: IStillListMovie[];
}) {
  return (
    <StillListNav>
      <StillListHeading
        leadText={leadText}
        linkText={linkText}
        linkTarget={linkTarget}
      />
      <StillList
        movies={reviews}
        seeAllLinkTarget={linkTarget}
        seeAllLinkText={linkText}
      />
    </StillListNav>
  );
}
