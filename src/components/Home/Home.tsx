import Link from "next/link";
import { HomeListItem } from "./HomeListItem";
import type { HomeListItemData } from "./HomeListItem";

export interface HomeProps {
  data: HomeListItemData[];
}

export function Home({ data }: HomeProps): JSX.Element {
  return (
    <main>
      <ol className="flex flex-col">
        {data.map((item, index) => {
          return (
            <HomeListItem
              key={item.sequence}
              data={item}
              eagerLoadImage={index === 0}
            />
          );
        })}
      </ol>
      <Link
        href="/reviews/"
        className="flex justify-end px-pageMargin py-10 text-lg text-accent"
      >
        All Reviews →
      </Link>
    </main>
  );
}
