import { Callouts } from "./Callouts";
import { Header } from "./Header";
import { WatchlistProgressDetail } from "./WatchlistProgressDetail";
import type { IWatchlistProgressDetail } from "./WatchlistProgressDetail";

export interface WatchlistProgress {
  reviewed: number;
  total: number;
  directorTotal: number;
  directorReviewed: number;
  directorDetails: IWatchlistProgressDetail[];
  performerTotal: number;
  performerReviewed: number;
  performerDetails: IWatchlistProgressDetail[];
  writerTotal: number;
  writerReviewed: number;
  writerDetails: IWatchlistProgressDetail[];
  collectionTotal: number;
  collectionReviewed: number;
  collectionDetails: IWatchlistProgressDetail[];
}

export interface WatchlistProgressProps {
  progress: WatchlistProgress;
}

export function WatchlistProgress({
  progress,
}: WatchlistProgressProps): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <Header />
      <div className="spacer-y-8" />
      <Callouts
        movieCount={progress.total}
        reviewedMovieCount={progress.reviewed}
        directorMovieCount={progress.directorTotal}
        directorReviewedMovieCount={progress.directorReviewed}
        performerMovieCount={progress.performerTotal}
        performerReviewedMovieCount={progress.performerReviewed}
        writerMovieCount={progress.writerTotal}
        writerReviewedMovieCount={progress.writerReviewed}
        collectionMovieCount={progress.collectionTotal}
        collectionReviewedMovieCount={progress.collectionReviewed}
      />
      <div className="spacer-y-8" />
      <div className="flex w-full max-w-[960px] flex-col items-stretch tablet:px-gutter desktop:px-pageMargin">
        <div className="spacer-y-8" />
        <WatchlistProgressDetail
          label="Director Progress"
          entityType="director"
          entities={progress.directorDetails}
        />
        <div className="spacer-y-16" />
        <WatchlistProgressDetail
          label="Performer Progress"
          entityType="performer"
          entities={progress.performerDetails}
        />
        <div className="spacer-y-16" />
        <WatchlistProgressDetail
          label="Writer Progress"
          entityType="writer"
          entities={progress.writerDetails}
        />
        <div className="spacer-y-16" />
        <WatchlistProgressDetail
          label="Collection Progress"
          entityType="collection"
          entities={progress.collectionDetails}
        />
        <div className="spacer-y-16" />
      </div>
    </main>
  );
}
