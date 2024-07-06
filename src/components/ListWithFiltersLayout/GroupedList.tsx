import { ListInfo } from "./ListInfo";
import { ShowMoreButton } from "./ShowMoreButton";

export function GroupedList<T>({
  groupedItems,
  visibleCount,
  totalCount,
  onShowMore,
  children,
  className,
}: {
  groupedItems: Map<string, Iterable<T>>;
  visibleCount: number;
  totalCount: number;
  onShowMore: () => void;
  children: (item: T) => React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <>
      <ListInfo visibleCount={visibleCount} totalCount={totalCount} />

      <ol className={className}>
        {[...groupedItems].map((groupedItem, index) => {
          const [group, groupItems] = groupedItem;

          return (
            <GroupingListItem groupText={group} key={group} zIndex={index}>
              <ol>{[...groupItems].map(children)}</ol>
            </GroupingListItem>
          );
        })}
      </ol>
      <div className="px-pageMargin flex flex-col items-center">
        {totalCount > visibleCount && (
          <>
            <div className="h-8 min-h-8" />
            <ShowMoreButton onClick={onShowMore} />
            <div className="h-8 min-h-8" />
          </>
        )}
      </div>
    </>
  );
}

function GroupingListItem({
  groupText,
  children,
  zIndex,
}: {
  groupText: string;
  children: React.ReactNode;
  zIndex: number;
}) {
  return (
    <li className="block">
      <div
        style={{ zIndex: zIndex }}
        className="text-md bg-default desktop:top-[216px] max:top-[168px] sticky top-8 pt-0"
      >
        <div className="bg-canvas px-gutter tablet:px-6 py-2">{groupText}</div>
      </div>
      <div className="tablet:h-4 tablet:min-h-4 h-0 min-h-0" />
      {children}
      <div className="tablet:h-4 tablet:min-h-4 h-0 min-h-0" />
    </li>
  );
}
