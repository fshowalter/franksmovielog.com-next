"use client";

import { useReducer } from "react";

import { ListWithFiltersLayout } from "@/components/ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Viewings.reducer";
import type { IViewing } from "./data";

export function Viewings({
  viewings,
  distinctGenres,
  distinctMedia,
  distinctVenues,
  distinctReleaseYears,
  distinctViewingYears,
}: {
  viewings: readonly IViewing[];
  distinctGenres: readonly string[];
  distinctMedia: readonly string[];
  distinctVenues: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctViewingYears: readonly string[];
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...viewings],
      sort: "viewing-date-desc",
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header viewingCount={viewings.length} />}
      filters={
        <Filters
          dispatch={dispatch}
          distinctGenres={distinctGenres}
          distinctMedia={distinctMedia}
          distinctVenues={distinctVenues}
          distinctReleaseYears={distinctReleaseYears}
          distinctViewingYears={distinctViewingYears}
          sortValue={state.sortValue}
        />
      }
      list={
        <List
          dispatch={dispatch}
          groupedItems={state.groupedItems}
          totalCount={state.filteredItems.length}
          visibleCount={state.showCount}
        />
      }
    />
  );
}
