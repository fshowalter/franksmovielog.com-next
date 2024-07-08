import { ListItem } from "@/components/ListItem";
import { ListItemMediumAndVenue } from "@/components/ListItemMediumAndVenue";
import { ListItemPoster } from "@/components/ListItemPoster";
import { ListItemTitle } from "@/components/ListItemTitle";
import { GroupedList } from "@/components/ListWithFiltersLayout";
import { Action, ActionType } from "./Viewings.reducer";
import type { IViewing } from "./data";

export function List({
  groupedItems,
  visibleCount,
  totalCount,
  dispatch,
}: {
  groupedItems: Map<string, Map<string, IViewing[]>>;
  visibleCount: number;
  totalCount: number;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <GroupedList
      data-testid="poster-list"
      groupedItems={groupedItems}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: ActionType.SHOW_MORE })}
    >
      {(dateGroup) => {
        const [dayAndDate, items] = dateGroup;
        return (
          <DateListItem
            items={items}
            key={dayAndDate}
            dayAndDate={dayAndDate}
          />
        );
      }}
    </GroupedList>
  );
}

function DateListItem({
  dayAndDate,
  items,
}: {
  dayAndDate: string;
  items: IViewing[];
}): JSX.Element {
  const [day, date] = dayAndDate.split("-");

  return (
    <ListItem className="items-center pb-0">
      <div>
        <div className="shadow-all rounded-md">
          <div className="w-12 bg-canvas py-2 text-center text-sm/none uppercase">
            {day}
          </div>
          <div className="text-center text-2.5xl/8">{date}</div>
        </div>
        <div className="h-4 min-h-4" />
      </div>
      <ul className="flex grow flex-col gap-y-4">
        {items.map((item) => {
          return <SubListItem item={item} key={item.sequence} />;
        })}
      </ul>
    </ListItem>
  );
}

export function SubListItem({ item }: { item: IViewing }): JSX.Element {
  return (
    <ListItem className="shadow-bottom even:bg-unset items-center pt-0 last-of-type:shadow-none">
      <ListItemPoster slug={item.slug} title={item.title} year={item.year} />
      <div className="grow">
        <div>
          <ListItemTitle title={item.title} year={item.year} slug={item.slug} />
          <div className="h-1 min-h-1 tablet:h-2 tablet:min-h-2" />
        </div>
        <div className="flex flex-col text-sm/none font-light tracking-0.5px text-subtle">
          <div className="h-1 min-h-1 tablet:h-0 tablet:min-h-0" />
          <div>
            <ListItemMediumAndVenue medium={item.medium} venue={item.venue} />
          </div>
        </div>
        <div className="h-2 min-h-2" />
      </div>
    </ListItem>
  );
}
