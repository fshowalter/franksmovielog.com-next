import Link from "next/link";
import { ListItem } from "@/components/ListItem";
import { ListItemMediumAndVenue } from "@/components/ListItemMediumAndVenue";
import { ListItemPoster } from "@/components/ListItemPoster";
import { ListItemTitle } from "@/components/ListItemTitle";
import { StatHeading } from "@/components/StatHeading";

interface ViewingListItemData {
  sequence: number;
  date: string;
  venue: string | null;
  medium: string | null;
  title: string;
  year: string;
  slug: string | null;
}

export interface MostWatchedPersonListItemData {
  name: string;
  slug: string | null;
  count: number;
  viewingsData: ViewingListItemData[];
}

export function MostWatchedPeople({
  data,
  header,
}: {
  header: string;
  data: readonly MostWatchedPersonListItemData[];
}): JSX.Element | null {
  if (data.length == 0) {
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
        {data.map((person, index) => {
          return (
            <li key={person.name} className="block">
              <div
                style={{ zIndex: 1 + index }}
                className="sticky top-20 grid w-full grid-cols-[auto_1fr_calc(6ch_+_var(--gutter-width))] bg-stripe px-gutter leading-10 desktop:top-[calc(160px_+_5rem)] max:top-[calc(128px_+_5rem)]"
              >
                <span className="leading-10">
                  <Name data={person} />
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
                    {person.viewingsData.map((viewing) => {
                      return (
                        <MostWatchedPersonViewingListItem
                          key={viewing.sequence}
                          data={viewing}
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

function Name({ data }: { data: MostWatchedPersonListItemData }): JSX.Element {
  if (data.slug) {
    return <Link href={`/cast-and-crew/${data.slug}/`}>{data.name}</Link>;
  }

  return <>{data.name}</>;
}

function MostWatchedPersonViewingListItem({
  data,
}: {
  data: ViewingListItemData;
}) {
  return (
    <ListItem className="items-center">
      <ListItemPoster slug={data.slug} title={data.title} year={data.year} />
      <div className="grow">
        <div>
          <ListItemTitle title={data.title} year={data.year} slug={data.slug} />
          <div className="spacer-y-1 tablet:spacer-y-2" />
        </div>
        <div className="flex flex-col text-sm font-light tracking-0.5px text-subtle">
          <div className="spacer-y-1 tablet:spacer-y-0" />
          <div>
            {data.date}
            <div className="spacer-y-2" />
            <ListItemMediumAndVenue medium={data.medium} venue={data.venue} />
          </div>
        </div>
        <div className="spacer-y-2" />
      </div>
    </ListItem>
  );
}
