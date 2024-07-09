import { DateIcon } from "@/components/DateIcon";
import { RenderedMarkdown } from "../RenderedMarkdown";

export interface ViewingHistoryListItemData {
  date: string;
  venue: string | null;
  venueNotes: string | null;
  medium: string | null;
  mediumNotes: string | null;
  viewingNotes: string | null;
  sequence: number;
}

function Date({ data }: { data: ViewingHistoryListItemData }) {
  return (
    <>
      <span className="inline-block text-default">{data.date}</span>{" "}
    </>
  );
}

function Medium({ data }: { data: ViewingHistoryListItemData }) {
  if (!data.medium) {
    return null;
  }
  return (
    <span className="font-light text-muted">
      <span>via</span> <span>{data.medium}</span>
    </span>
  );
}

function MediumNotes({ data }: { data: ViewingHistoryListItemData }) {
  if (!data.mediumNotes) {
    return null;
  }
  return (
    <span className="text-sm font-light leading-none text-subtle">
      (
      <RenderedMarkdown
        // eslint-disable-next-line react/no-danger
        text={data.mediumNotes}
        className="text-sm leading-none"
        as="span"
      />
      )
    </span>
  );
}

function VenueNotes({ data }: { data: ViewingHistoryListItemData }) {
  if (!data.venueNotes) {
    return null;
  }
  return (
    <span className="text-sm font-light leading-none text-subtle">
      (
      <RenderedMarkdown
        // eslint-disable-next-line react/no-danger
        text={data.venueNotes}
        as="span"
        className="text-sm leading-none"
      />
      )
    </span>
  );
}

function Venue({ data }: { data: ViewingHistoryListItemData }) {
  if (!data.venue) {
    return null;
  }
  return (
    <span className="font-light text-subtle">
      <span>at</span> <span>{data.venue}</span>
    </span>
  );
}

function ViewingNotes({ data }: { data: ViewingHistoryListItemData }) {
  if (!data.viewingNotes) {
    return null;
  }
  return (
    <div className="pb-6">
      <RenderedMarkdown
        className="leading-normal text-default"
        // eslint-disable-next-line react/no-danger
        text={data.viewingNotes}
      />
    </div>
  );
}

export function ViewingHistoryListItem({
  data,
}: {
  data: ViewingHistoryListItemData;
}) {
  return (
    <li className="flex flex-col px-gutter even:bg-subtle">
      <div className="flex gap-x-[1ch] py-4">
        <div className="h-5 w-4">
          <DateIcon className="mt-1 w-4" />{" "}
        </div>
        <div className="grow">
          <Date data={data} />
          <Medium data={data} /> <MediumNotes data={data} />
          <Venue data={data} /> <VenueNotes data={data} />
        </div>
      </div>
      <div>
        <ViewingNotes data={data} />
      </div>
    </li>
  );
}
