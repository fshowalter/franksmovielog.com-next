"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Watchlist.reducer";

export function Watchlist({
  titles,
  distinctDirectors,
  distinctPerformers,
  distinctWriters,
  distinctCollections,
  distinctReleaseYears,
}: {
  titles: readonly IWatchlistTitle[];
  distinctDirectors: readonly string[];
  distinctPerformers: readonly string[];
  distinctWriters: readonly string[];
  distinctCollections: readonly string[];
  distinctReleaseYears: readonly string[];
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...titles],
      sort: "release-date-asc",
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header titleCount={titles.length} />}
      filters={
        <Filters
          sortValue={state.sortValue}
          dispatch={dispatch}
          distinctDirectors={distinctDirectors}
          distinctPerformers={distinctPerformers}
          distinctWriters={distinctWriters}
          distinctCollections={distinctCollections}
          distinctReleaseYears={distinctReleaseYears}
        />
      }
      list={
        <List
          groupedItems={state.groupedItems}
          visibleCount={state.showCount}
          totalCount={state.filteredItems.length}
          dispatch={dispatch}
        />
      }
    />
  );
}

export interface IWatchlistTitle {
  imdbId: string;
  title: string;
  year: string;
  releaseSequence: string;
  sortTitle: string;
  directorNames: string[];
  performerNames: string[];
  writerNames: string[];
  collectionNames: string[];
  viewed: boolean;
}
