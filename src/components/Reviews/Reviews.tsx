import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Reviews.reducer";
import { getReviewedTitles } from "./data";

export async function Reviews(): Promise<JSX.Element> {
  const {reviewedTitles, genres, releaseYears, reviewYears} = await getReviewedTitles();

  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...reviewedTitles],
      sort: "title-asc",
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header reviewCount={reviewedTitles.length} />}
      filters={
        <Filters
          dispatch={dispatch}
          sortValue={state.sortValue}
          distinctGenres={genres}
          distinctReleaseYears={releaseYears}
          distinctReviewYears={reviewYears}
        />
      }
      list={
        <List
          dispatch={dispatch}
          groupedItems={state.groupedItems}
          visibleCount={state.showCount}
          totalCount={state.filteredItems.length}
        />
      }
    />
  );
}
