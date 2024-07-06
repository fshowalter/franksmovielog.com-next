import { useRef } from "react";
import { Box } from "@/components/Box";
import { Spacer } from "@/components/Spacer";
import { Filters } from "./Filters";

export function ListWithFiltersLayout({
  header,
  filters,
  list,
}: {
  header: React.ReactNode;
  filters: React.ReactNode;
  list: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <main className="desktop:flex-row desktop:px-pageMargin desktop:items-start desktop:max-w-full flex w-full max-w-prose flex-col items-stretch gap-x-24">
        <div className="px-gutter desktop:px-0 basis-md flex flex-col items-center pt-8">
          <div className="flex flex-col items-center">{header}</div>
          <div className="h-8 min-h-8" />
          <Filters>{filters}</Filters>
          <div className="h-8 min-h-8" />
        </div>
        <div className="flex grow flex-col">
          <div className="desktop:h-8 desktop:min-h-8 h-0 min-h-0" />
          {list}
        </div>
      </main>
    </div>
  );
}
