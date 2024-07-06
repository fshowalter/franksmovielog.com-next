import { DateIcon } from "@/components/DateIcon";
import { RenderedMarkdown } from "../RenderedMarkdown";
import type { IReviewViewing } from "./data";

function Date({ viewing }: { viewing: IReviewViewing }) {
  return (
    <>
      <span className="text-default inline-block">{viewing.date}</span>{" "}
    </>
  );
}

function Medium({ viewing }: { viewing: IReviewViewing }) {
  if (!viewing.medium) {
    return null;
  }
  return (
    <span className="text-muted font-light">
      <span>via</span> <span>{viewing.medium}</span>
    </span>
  );
}

function MediumNotes({ viewing }: { viewing: IReviewViewing }) {
  if (!viewing.mediumNotes) {
    return null;
  }
  return (
    <span className="text-subtle text-sm font-light leading-none">
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
    <span className="text-subtle text-sm font-light leading-none">
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
    <span className="text-subtle font-light">
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
        className="text-default leading-normal"
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
    <li className="even:bg-subtle py-gutter block">
      <div>
        <DateIcon />{" "}
      </div>
      <div>
        <Date viewing={viewing} />
        <Medium viewing={viewing} /> <MediumNotes viewing={viewing} />
        <Venue viewing={viewing} /> <VenueNotes viewing={viewing} />
      </div>
      <div>
        <ViewingNotes viewing={viewing} />
      </div>
    </li>
  );
}
