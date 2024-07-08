import { StatsCallout } from "../Stats";

export function Callouts({
  callouts,
}: {
  callouts: IYearStatsCallouts;
}): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 desktop:flex-nowrap">
      <StatsCallout label="Viewings" stat={callouts.viewingCount} />
      <StatsCallout label="Movies" stat={callouts.titleCount} />
      <StatsCallout label="New Movies" stat={callouts.newTitleCount} />
    </div>
  );
}

export interface IYearStatsCallouts {
  titleCount: number;
  viewingCount: number;
  newTitleCount: number;
}
