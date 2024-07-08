import { MostWatchedPeople } from "./MostWatchedPeople";
import type { IMostWatchedPerson } from "./MostWatchedPeople";

export function MostWatchedDirectors({
  directors,
}: {
  directors: readonly IMostWatchedPerson[];
}): JSX.Element | null {
  return (
    <MostWatchedPeople people={directors} header="Most Watched Directors" />
  );
}
