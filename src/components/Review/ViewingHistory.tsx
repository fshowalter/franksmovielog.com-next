import { ViewingHistoryListItem } from "./ViewingHistoryListItem";
import type { ViewingHistoryListItemData } from "./ViewingHistoryListItem";

export interface ViewingHistoryData {
  viewings: ViewingHistoryListItemData[];
}

export function ViewingHistory({
  data,
  className,
}: {
  data: ViewingHistoryData;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="border-bottom px-gutter text-md font-normal text-subtle">
        Viewing History
        <div className="h-2 min-h-2" />
      </h3>
      <ul>
        {data.viewings.map((viewing) => (
          <ViewingHistoryListItem key={viewing.sequence} data={viewing} />
        ))}
      </ul>
    </div>
  );
}
