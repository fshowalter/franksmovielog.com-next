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
import { GradeDistribution } from "./GradeDistribution";
import type { CalloutsData } from "./Callouts";
import type { GradeDistributionData } from "./GradeDistribution";
import type { IMostWatchedTitle } from "@/components/Stats/MostWatchedMovies";
import type { IDecadeDistribution } from "@/components/Stats/DecadeDistribution";
import type { IMediaDistribution } from "@/components/Stats/MediaDistribution";
import type { IMostWatchedPerson } from "@/components/Stats/MostWatchedPeople";

export interface AllTimeStatsData extends CalloutsData {
  gradeDistribution: readonly GradeDistributionData[];
  mostWatchedTitles: readonly IMostWatchedTitle[];
  decadeDistribution: readonly IDecadeDistribution[];
  mediaDistribution: readonly IMediaDistribution[];
  mostWatchedDirectors: readonly IMostWatchedPerson[];
  mostWatchedPerformers: readonly IMostWatchedPerson[];
  mostWatchedWriters: readonly IMostWatchedPerson[];
  distinctStatYears: readonly string[];
}

export interface AllTimeStatsProps {
  data: AllTimeStatsData;
}

export function AllTimeStats({ data }: AllTimeStatsProps): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <header className="flex flex-col flex-wrap justify-between px-pageMargin">
        <div className="flex flex-col items-center">
          <PageTitle className="pt-6 desktop:pt-8">All-Time Stats</PageTitle>
          <p className="text-subtle">
            {`${(data.distinctStatYears.length - 1).toString()} Years in Review`}
          </p>
          <div className="spacer-y-6" />
          <StatsNavigation
            currentYear={"all"}
            linkFunc={(year: string) => {
              return `/viewings/stats/${year}/`;
            }}
            years={data.distinctStatYears}
          />
        </div>
        <div>
          <div className="spacer-y-8" />
          <Callouts data={data} />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col items-stretch gap-y-8 py-8 tablet:px-gutter desktop:px-pageMargin">
        <MostWatchedMovies titles={data.mostWatchedTitles} />
        <DecadeDistribution distributions={data.decadeDistribution} />
        <MediaDistribution distributions={data.mediaDistribution} />
        <GradeDistribution data={data.gradeDistribution} />
        <MostWatchedDirectors directors={data.mostWatchedDirectors} />
        <MostWatchedPerformers performers={data.mostWatchedPerformers} />
        <MostWatchedWriters writers={data.mostWatchedWriters} />
      </div>
    </main>
  );
}
