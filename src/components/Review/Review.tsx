"use client";

import { Still } from "@/components/Still";
import { Content } from "./Content";
import { Credits } from "./Credits";
import { Header } from "./Header";
import { MoreReviews } from "./MoreReviews";
import { StructuredData } from "./StructuredData";
import { ViewingHistory } from "./ViewingHistory";
import type { IReview } from "./data";

export function Review({ review }: { review: IReview }): JSX.Element {
  return (
    <main id="top" className="scroll-margin-top flex flex-col items-center">
      <Header
        review={review}
        className="px-pageMargin desktop:py-8 py-6 text-center"
      />
      <Still
        slug={review.slug}
        title={review.title}
        year={review.year}
        width={960}
        height={540}
        className="mb-[5.33px]"
      />
      <div className="tablet:min-h-8 tablet:h-8 h-6 min-h-6" />
      <Content review={review} className="px-pageMargin items-center" />
      <div className="h-20 min-h-20" />
      <ViewingHistory review={review} className="max-w-popout w-full" />
      <div className="h-32 min-h-32" />
      <Credits review={review} className="max-w-popout w-full" />
      v <div className="h-32 min-h-32" />
      <MoreReviews
        review={review}
        className="max-w-popout tablet:max-w-full w-full"
      />
      v <div className="tablet:h-0 tablet:min-h-0 h-32 min-h-32" />
      <StructuredData review={review} />
    </main>
  );
}
