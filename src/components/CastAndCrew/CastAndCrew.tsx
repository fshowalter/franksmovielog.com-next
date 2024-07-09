"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "@/components/ListWithFiltersLayout";
import { initState, reducer } from "./CastAndCrew.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";

export interface CastAndCrewMember {
  name: string;
  slug: string | null;
  totalCount: number;
  reviewCount: number;
  creditedAs: string[];
  avatar: string | null;
}

export interface CastAndCrewProps {
  members: CastAndCrewMember[];
}

export function CastAndCrew({ members }: CastAndCrewProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      entities: members,
      sort: "name-asc",
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header />}
      filters={<Filters dispatch={dispatch} sortValue={state.sortValue} />}
      list={
        <List
          members={state.filteredEntities}
          totalCount={state.filteredEntities.length}
          visibleCount={state.filteredEntities.length}
        />
      }
    />
  );
}
