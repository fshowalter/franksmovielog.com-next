import Link from "next/link";
import { ListItem } from "@/components/ListItem";
import { ListItemMediumAndVenue } from "@/components/ListItemMediumAndVenue";
import { ListItemPoster } from "@/components/ListItemPoster";
import { ListItemTitle } from "@/components/ListItemTitle";
import { StatHeading } from "@/components/StatHeading";

export function MostWatchedPeople({
  people,
  header,
}: {
  header: string;
  people: readonly IMostWatchedPerson[];
}): JSX.Element | null {
  if (people.length == 0) {
    return null;
  }

  return (
    <section className="shadow-all">
      <StatHeading>{header}</StatHeading>
      <header className="sticky top-10 z-30 flex justify-between bg-default px-gutter font-bold leading-[calc(2.5rem_-_2px)] desktop:top-[calc(160px_+_2.5rem)] max:top-[calc(128px_+_2.5rem)]">
        <span className="text-left leading-10">Name</span>
        <span className="text-right leading-10">Viewings</span>
      </header>
      <ol>
        {people.map((person, index) => {
          return (
            <li key={person.name} className="block">
              <div
                style={{ zIndex: 1 + index }}
                className="bg-stripe sticky top-20 grid w-full grid-cols-[auto_1fr_calc(6ch_+_var(--gutter-width))] px-gutter leading-10 desktop:top-[calc(160px_+_5rem)] max:top-[calc(128px_+_5rem)]"
              >
                <span className="leading-10">
                  <Name person={person} />
                </span>
                <span className="leading-10">&nbsp;</span>
                <span className="bg-stripe text-right leading-10">
                  {person.count}
                </span>
              </div>
              <div className="col-start-1 col-end-4 leading-10">
                <details>
                  <summary className="px-gutter tracking-0.25px text-subtle">
                    Details
                  </summary>
                  <ol className="tablet:px-gutter">
                    {person.viewings.map((viewing) => {
                      return (
                        <MostWatchedPersonViewingListItem
                          key={viewing.sequence}
                          viewing={viewing}
                        />
                      );
                    })}
                  </ol>
                </details>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Name({ person }: { person: IMostWatchedPerson }): JSX.Element {
  if (person.slug) {
    return <Link href={`/cast-and-crew/${person.slug}/`}>{person.name}</Link>;
  }

  return <>{person.name}</>;
}

function MostWatchedPersonViewingListItem({
  viewing,
}: {
  viewing: IMostWatchedPersonViewing;
}) {
  return (
    <ListItem className="items-center">
      <ListItemPoster
        slug={viewing.slug}
        title={viewing.title}
        year={viewing.year}
      />
      <div className="grow">
        <div>
          <ListItemTitle
            title={viewing.title}
            year={viewing.year}
            slug={viewing.slug}
          />
          <div className="spacer-y-1 tablet:spacer-y-2" />
        </div>
        <div className="flex flex-col text-sm font-light tracking-0.5px text-subtle">
          <div className="spacer-y-1 tablet:spacer-y-0" />
          <div>
            {viewing.date}
            <div className="spacer-y-2" />
            <ListItemMediumAndVenue
              medium={viewing.medium}
              venue={viewing.venue}
            />
          </div>
        </div>
        <div className="spacer-y-2" />
      </div>
    </ListItem>
  );
}

export interface IMostWatchedPersonViewing {
  sequence: number;
  date: string;
  venue: string | null;
  medium: string | null;
  title: string;
  year: string;
  slug: string | null;
}

export interface IMostWatchedPerson {
  name: string;
  slug: string | null;
  count: number;
  viewings: IMostWatchedPersonViewing[];
}
