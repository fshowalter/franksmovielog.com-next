import { ProgressRing } from "./ProgressRing";

function Callout({
  total,
  reviewed,
  label,
  subLabel,
}: {
  total: number | null;
  reviewed: number | null;
  label: string;
  subLabel?: string;
}): JSX.Element {
  return (
    <>
      <ProgressRing
        width={144}
        height={144}
        total={total ?? 0}
        complete={reviewed ?? 0}
        label={label}
        subLabel={subLabel}
      />
      <div className="spacer-y-2" />
      <div className="text-center text-subtle">
        <div>
          {reviewed?.toLocaleString()}/{total?.toLocaleString()}
        </div>
        <div className="text-sm leading-4">Reviewed</div>
      </div>
    </>
  );
}

export function Callouts({
  movieCount,
  reviewedMovieCount,
  directorMovieCount,
  directorReviewedMovieCount,
  performerMovieCount,
  performerReviewedMovieCount,
  writerMovieCount,
  writerReviewedMovieCount,
  collectionMovieCount,
  collectionReviewedMovieCount,
}: {
  movieCount: number;
  reviewedMovieCount: number;
  directorMovieCount: number | null;
  directorReviewedMovieCount: number | null;
  performerMovieCount: number | null;
  performerReviewedMovieCount: number | null;
  writerMovieCount: number | null;
  writerReviewedMovieCount: number | null;
  collectionMovieCount: number | null;
  collectionReviewedMovieCount: number | null;
}): JSX.Element {
  return (
    <section className="flex flex-wrap justify-center gap-x-8">
      <div className="flex min-w-full flex-col items-center tablet:min-w-0">
        <div className="spacer-y-8" />
        <Callout
          total={movieCount}
          reviewed={reviewedMovieCount}
          label="Total Progress"
        />
      </div>
      <div>
        <div className="spacer-y-8" />
        <Callout
          total={directorMovieCount}
          reviewed={directorReviewedMovieCount}
          label="Director"
          subLabel="Titles"
        />
      </div>
      <div>
        <div className="spacer-y-8" />
        <Callout
          total={performerMovieCount}
          reviewed={performerReviewedMovieCount}
          label="Performer"
          subLabel="Titles"
        />
      </div>
      <div>
        <div className="spacer-y-8" />
        <Callout
          total={writerMovieCount}
          reviewed={writerReviewedMovieCount}
          label="Writer"
          subLabel="Titles"
        />
      </div>
      <div>
        <div className="spacer-y-8" />
        <Callout
          total={collectionMovieCount}
          reviewed={collectionReviewedMovieCount}
          label="Collection"
          subLabel="Titles"
        />
      </div>
    </section>
  );
}
