import { StatsCallout } from "@/components/Stats";

export function Callouts({
  callouts,
}: {
  callouts: IAllTimeStatsCallouts;
}): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 desktop:flex-nowrap">
      <StatsCallout label="Viewings" stat={callouts.viewingCount} />
      <StatsCallout label="Movies" stat={callouts.titleCount} />
      <StatsCallout label="Reviews" stat={callouts.reviewCount} />
      <StatsCallout
        label="From Watchlist"
        stat={callouts.watchlistTitlesReviewedCount}
      />
    </div>
  );
}

export interface IAllTimeStatsCallouts {
  titleCount: number;
  viewingCount: number;
  reviewCount: number;
  watchlistTitlesReviewedCount: number;
}
