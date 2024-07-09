"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "@/components/ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Underseen.reducer";
import type { Sort } from "./Underseen.reducer";

export interface UnderseenTitle {
  releaseSequence: string;
  title: string;
  year: string;
  sortTitle: string;
  slug: string;
  grade: string;
  gradeValue: number;
  imdbId: string;
  genres: string[];
}

export interface UnderseenProps {
  titles: readonly UnderseenTitle[];
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  initialSort: Sort;
}

export function Underseen({
  titles,
  distinctGenres,
  distinctReleaseYears,
  initialSort,
}: UnderseenProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...titles],
      sort: initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header />}
      filters={
        <Filters
          dispatch={dispatch}
          sortValue={state.sortValue}
          distinctGenres={distinctGenres}
          distinctReleaseYears={distinctReleaseYears}
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
