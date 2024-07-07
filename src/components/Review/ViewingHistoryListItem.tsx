import { DateIcon } from "@/components/DateIcon";
import { RenderedMarkdown } from "../RenderedMarkdown";
import type { IReviewViewing } from "./data";

function Date({ viewing }: { viewing: IReviewViewing }) {
  return (
    <>
      <span className="inline-block text-default">{viewing.date}</span>{" "}
    </>
  );
}

function Medium({ viewing }: { viewing: IReviewViewing }) {
  if (!viewing.medium) {
    return null;
  }
  return (
    <span className="font-light text-muted">
      <span>via</span> <span>{viewing.medium}</span>
    </span>
  );
}

function MediumNotes({ viewing }: { viewing: IReviewViewing }) {
  if (!viewing.mediumNotes) {
    return null;
  }
  return (
    <span className="text-sm font-light leading-none text-subtle">
      (
      <RenderedMarkdown
        // eslint-disable-next-line react/no-danger
        text={viewing.mediumNotes}
        className="text-sm leading-none"
        as="span"
      />
      )
    </span>
  );
}

function VenueNotes({ viewing }: { viewing: IReviewViewing }) {
  if (!viewing.venueNotes) {
    return null;
  }
  return (
    <span className="text-sm font-light leading-none text-subtle">
      (
      <RenderedMarkdown
        // eslint-disable-next-line react/no-danger
        text={viewing.venueNotes}
        as="span"
        className="text-sm leading-none"
      />
      )
    </span>
  );
}

function Venue({ viewing }: { viewing: IReviewViewing }) {
  if (!viewing.venue) {
    return null;
  }
  return (
    <span className="font-light text-subtle">
      <span>at</span> <span>{viewing.venue}</span>
    </span>
  );
}

function ViewingNotes({ viewing }: { viewing: IReviewViewing }) {
  if (!viewing.viewingNotes) {
    return null;
  }
  return (
    <div className="pb-6">
      <RenderedMarkdown
        className="leading-normal text-default"
        // eslint-disable-next-line react/no-danger
        text={viewing.viewingNotes}
      />
    </div>
  );
}

export function ViewingHistoryListItem({
  viewing,
}: {
  viewing: IReviewViewing;
}) {
  return (
    <li className="flex flex-col px-gutter even:bg-subtle">
      <div className="flex gap-x-[1ch] py-4">
        <div className="h-5 w-4">
          <DateIcon className="mt-1 w-4" />{" "}
        </div>
        <div className="grow">
          <Date viewing={viewing} />
          <Medium viewing={viewing} /> <MediumNotes viewing={viewing} />
          <Venue viewing={viewing} /> <VenueNotes viewing={viewing} />
        </div>
      </div>
      <div>
        <ViewingNotes viewing={viewing} />
      </div>
    </li>
  );
}
