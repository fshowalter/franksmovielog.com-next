import Link from "next/link";
import { HomePageItem } from "./HomePageItem";
import type { IHomePageItem } from "./data";

export function Home({ items }: { items: IHomePageItem[] }): JSX.Element {
  return (
    <main>
      <ol className="flex flex-col">
        {items.map((item, index) => {
          return (
            <HomePageItem
              key={item.sequence}
              item={item}
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
