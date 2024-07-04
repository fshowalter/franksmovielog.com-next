import { Box } from "@/components/Box";
import { Link } from "@/components/Link";
import { HomePageItem } from "./HomePageItem";
import { getHomePageItems } from "./data";

export async function Home(): Promise<JSX.Element> {
  const items = await getHomePageItems();

  return (
    <main>
      <Box as="ol" display="flex" flexDirection="column">
        {items.map((item, index) => {
          return (
            <HomePageItem
              key={item.sequence}
              item={item}
              eagerLoadImage={index === 0}
            />
          );
        })}
      </Box>
      <Link
        href="/reviews/"
        paddingX="pageMargin"
        paddingY={40}
        justifyContent="flex-end"
        display="flex"
        fontSize="medium"
      >
        All Reviews →
      </Link>
    </main>
  );
}
