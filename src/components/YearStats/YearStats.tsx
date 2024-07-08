import { PageTitle } from "@/components/PageTitle";
import {
  DecadeDistribution,
  MediaDistribution,
  MostWatchedMovies,
} from "@/components/Stats";
import { MostWatchedDirectors } from "@/components/Stats/MostWatchedDirectors";
import { MostWatchedPerformers } from "@/components/Stats/MostWatchedPerformers";
import { MostWatchedWriters } from "@/components/Stats/MostWatchedWriters";
import { StatsNavigation } from "@/components/Stats/StatsNavigation";
import { Callouts } from "./Callouts";
import type { IYearStatsCallouts } from "./Callouts";
import type { IDecadeDistribution } from "@/components/Stats/DecadeDistribution";
import type { IMediaDistribution } from "@/components/Stats/MediaDistribution";
import type { IMostWatchedTitle } from "@/components/Stats/MostWatchedMovies";
import type { IMostWatchedPerson } from "@/components/Stats/MostWatchedPeople";

export function YearStats({
  year,
  stats,
  statYears,
}: {
  year: string;
  stats: IYearStats;
  statYears: readonly string[];
}): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <header className="flex flex-col flex-wrap justify-between px-pageMargin">
        <div className="flex flex-col items-center">
          <PageTitle className="pt-6 desktop:pt-8">{`${year} Stats`}</PageTitle>
          <p className="text-subtle">
            {[...statYears].reverse()[1] === year
              ? "A year in progress..."
              : "A Year in Review"}
          </p>
          <div className="spacer-y-6" />
          <StatsNavigation
            currentYear={year}
            linkFunc={(year: string) => {
              if (year === "all") {
                return "/viewings/stats/";
              }

              return `/viewings/stats/${year}/`;
            }}
            years={statYears}
          />
        </div>
        <div>
          <div className="spacer-y-8" />
          <Callouts callouts={stats} />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col items-stretch gap-y-8 py-8 tablet:px-gutter desktop:px-pageMargin">
        <MostWatchedMovies titles={stats.mostWatchedTitles} />
        <DecadeDistribution distributions={stats.decadeDistribution} />
        <MediaDistribution distributions={stats.mediaDistribution} />
        <MostWatchedDirectors directors={stats.mostWatchedDirectors} />
        <MostWatchedPerformers performers={stats.mostWatchedPerformers} />
        <MostWatchedWriters writers={stats.mostWatchedWriters} />
      </div>
    </main>
  );
}

export interface IYearStats extends IYearStatsCallouts {
  decadeDistribution: readonly IDecadeDistribution[];
  mediaDistribution: readonly IMediaDistribution[];
  mostWatchedTitles: readonly IMostWatchedTitle[];
  mostWatchedDirectors: readonly IMostWatchedPerson[];
  mostWatchedWriters: readonly IMostWatchedPerson[];
  mostWatchedPerformers: readonly IMostWatchedPerson[];
}
