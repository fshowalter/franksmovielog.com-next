import { toSentence } from "@/utils";
import { Box, BoxProps } from "@/components/Box";
import { Grade } from "@/components/Grade";
import { gridAreaComponent, gridComponent } from "@/components/Grid";
import { Link } from "../Link";
import { RenderedMarkdown } from "@/components/RenderedMarkdown";
import { Spacer } from "@/components/Spacer";
import type { IHomePageItem } from "./data";
import {
  excerptContinueReadingLinkStyle,
  gridAreas,
  gridStyle,
  stillBorderStyle,
} from "./HomePageItem.css";
import { Still } from "@/components/Still";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

interface IItemProps extends BoxProps {
  item: IHomePageItem;
  eagerLoadImage: boolean;
}

export function HomePageItem({ item, eagerLoadImage }: IItemProps) {
  return (
    <Box as="li" display="flex" backgroundColor="zebra">
      <Grid as="article" paddingX="pageMargin">
        <GridArea
          name="date"
          fontWeight="light"
          color="subtle"
          fontSize="small"
          textTransform="uppercase"
          lineHeight={16}
          letterSpacing={0.75}
        >
          {item.date}
        </GridArea>
        <GridArea name="still" maxWidth="prose">
          <Link
            rel="canonical"
            href={`/reviews/${item.slug}/`}
            className={stillBorderStyle}
            display="block"
          >
            <Still
              title={item.title}
              year={item.year}
              __width={512}
              __height={288}
              style={{ height: "auto" }}
              quality={80}
              src={`/assets/stills/${item.slug}.png`}
              priority={eagerLoadImage}
              borderRadius={12}
            />
          </Link>
        </GridArea>
        <GridArea
          name="excerpt"
          display="flex"
          flexDirection="column"
          alignItems={{ default: "center", desktop: "flex-start" }}
        >
          <Box as="h2" fontWeight="bold" fontSize="large">
            <Link
              href={`/reviews/${item.slug}/`}
              rel="canonical"
              color="default"
              display="inline-block"
            >
              {item.title}{" "}
              <Box
                as="span"
                color="subtle"
                display="inline-block"
                fontSize="default"
                fontWeight="light"
                lineHeight={1}
              >
                {item.year}
              </Box>
            </Link>
          </Box>
          <Spacer axis="vertical" size={16} />
          <Grade grade={item.grade} height={32} />
          <Spacer axis="vertical" size={24} />
          <Box
            as="p"
            fontSize="default"
            fontWeight="normal"
            color="subtle"
            letterSpacing={0.25}
            lineHeight="default"
          >
            Directed by {toSentence(item.directorNames)}. Starring{" "}
            {toSentence(item.principalCastNames)}.
          </Box>
          <Spacer axis="vertical" size={24} />
          <RenderedMarkdown
            text={item.reviewExcerpt}
            className={excerptContinueReadingLinkStyle}
          />
        </GridArea>
      </Grid>
    </Box>
  );
}
