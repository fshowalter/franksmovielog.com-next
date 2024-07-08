import { MostWatchedPeople } from "./MostWatchedPeople";
import type { IMostWatchedPerson } from "./MostWatchedPeople";

export function MostWatchedPerformers({
  performers,
}: {
  performers: readonly IMostWatchedPerson[];
}): JSX.Element | null {
  return (
    <MostWatchedPeople people={performers} header="Most Watched Performers" />
  );
}
