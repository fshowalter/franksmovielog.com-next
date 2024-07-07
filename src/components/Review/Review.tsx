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
        className="px-pageMargin py-6 text-center desktop:py-8"
      />
      <Still
        slug={review.slug}
        title={review.title}
        year={review.year}
        width={960}
        height={540}
        className="mb-[5.33px]"
      />
      <div className="h-6 min-h-6 tablet:h-8 tablet:min-h-8" />
      <Content review={review} className="items-center px-pageMargin" />
      <div className="h-20 min-h-20" />
      <ViewingHistory review={review} className="w-full max-w-popout" />
      <div className="h-32 min-h-32" />
      <Credits review={review} className="w-full max-w-popout" />
      <div className="h-32 min-h-32" />
      <MoreReviews
        review={review}
        className="w-full max-w-popout tablet:max-w-full"
      />
      <div className="h-32 min-h-32 tablet:h-0 tablet:min-h-0" />
      <StructuredData review={review} />
    </main>
  );
}
