import { Still } from "@/components/Still";
import { Content } from "./Content";
import { Credits } from "./Credits";
import { Header } from "./Header";
import { MoreReviews } from "./MoreReviews";
import { StructuredData } from "./StructuredData";
import { ViewingHistory } from "./ViewingHistory";
import type { ViewingHistoryData } from "./ViewingHistory";
import type { HeaderData } from "./Header";
import type { ContentData } from "./Content";
import type { CreditsData } from "./Credits";
import type { MoreReviewsData } from "./MoreReviews";
import type { StructuredDataData } from "./StructuredData";

export interface ReviewData
  extends HeaderData,
    ContentData,
    ViewingHistoryData,
    MoreReviewsData,
    CreditsData,
    StructuredDataData {
  title: string;
  year: string;
  slug: string;
  frontmatter: ContentData["frontmatter"] & StructuredDataData["frontmatter"];
}

export interface ReviewProps {
  data: ReviewData;
}

export function Review({ data }: ReviewProps): JSX.Element {
  return (
    <main id="top" className="scroll-margin-top flex flex-col items-center">
      <Header
        data={data}
        className="px-pageMargin py-6 text-center desktop:py-8"
      />
      <Still
        slug={data.slug}
        title={data.title}
        year={data.year}
        width={960}
        height={540}
        className="mb-[5.33px]"
      />
      <div className="h-6 min-h-6 tablet:h-8 tablet:min-h-8" />
      <Content data={data} className="items-center px-pageMargin" />
      <div className="spacer-y-20" />
      <ViewingHistory data={data} className="w-full max-w-popout" />
      <div className="spacer-y-32" />
      <Credits data={data} className="w-full max-w-popout" />
      <div className="spacer-y-32" />
      <MoreReviews
        data={data}
        className="w-full max-w-popout tablet:max-w-full"
      />
      <div className="spacer-y-32 tablet:spacer-y-0" />
      <StructuredData data={data} />
    </main>
  );
}
