import { ViewingHistoryListItem } from "./ViewingHistoryListItem";
import type { IReview } from "./data";

export function ViewingHistory({
  review,
  className,
}: {
  review: IReview;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-subtle text-md px-gutter border-bottom font-normal">
        Viewing History
        <div className="h-2 min-h-2" />
      </h3>
      <ul>
        {review.viewings.map((viewing) => (
          <ViewingHistoryListItem key={viewing.sequence} viewing={viewing} />
        ))}
      </ul>
    </div>
  );
}
