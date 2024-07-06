"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Reviews.reducer";
import type { IReviewedTitle } from "./data";

export function Reviews({
  reviewedTitles,
  genres,
  releaseYears,
  reviewYears,
}: {
  reviewedTitles: IReviewedTitle[];
  genres: string[];
  releaseYears: string[];
  reviewYears: string[];
}): JSX.Element {
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
