import Link from "next/link";
import { HomePageItem } from "./HomePageItem";
import { getHomePageItems } from "./data";

export async function Home(): Promise<JSX.Element> {
  const items = await getHomePageItems();

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
        className="px-pageMargin text-accent flex justify-end py-10 text-lg"
      >
        All Reviews →
      </Link>
    </main>
  );
}
