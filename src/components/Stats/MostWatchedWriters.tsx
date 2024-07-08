import { MostWatchedPeople } from "./MostWatchedPeople";
import type { IMostWatchedPerson } from "./MostWatchedPeople";

export function MostWatchedWriters({
  writers,
}: {
  writers: readonly IMostWatchedPerson[];
}): JSX.Element | null {
  return <MostWatchedPeople people={writers} header="Most Watched Writers" />;
}
