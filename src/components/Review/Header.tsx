import { PageTitle } from "@/components/PageTitle";
import { IReview } from "./data";
import { twMerge } from "tailwind-merge";

export function Header({
  review,
  className,
}: {
  review: IReview;
  className?: string;
}) {
  return (
    <header className={twMerge("flex flex-col gap-y-4", className)}>
      <PageTitle>{review.title}</PageTitle>
      <OriginalTitle originalTitle={review.originalTitle} />
      <Meta review={review} />
    </header>
  );
}

function OriginalTitle({ originalTitle }: { originalTitle: string | null }) {
  if (!originalTitle) {
    return null;
  }

  return <div className="text-muted">({originalTitle})</div>;
}

function Meta({ review }: { review: IReview }) {
  return (
    <div className="text-muted">
      {review.year} <span>|</span>{" "}
      {review.countries.reduce<JSX.Element | null>((acc, country) => {
        if (acc === null) {
          return <>{country}</>;
        }

        return (
          <>
            {acc}
            <span>&ndash;</span>
            {country}
          </>
        );
      }, null)}{" "}
      <span>|</span> {review.runtimeMinutes}
      &#x02009;min{" "}
      <span>
        <span>|</span> <a href="#credits">More...</a>
      </span>
    </div>
  );
}
