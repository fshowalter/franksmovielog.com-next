import { Grade } from "@/components/Grade";
import { LongFormText } from "@/components/LongFormText";
import type { IReview } from "./data";
import { twMerge } from "tailwind-merge";

export function Content({
  review,
  className,
}: {
  review: IReview;
  className?: string;
}) {
  return (
    <div className={twMerge("flex flex-col gap-y-8", className)}>
      <div className="flex flex-col items-center">
        <Grade grade={review.frontmatter.grade} height={32} />
        <div className="flex flex-col items-center tracking-0.5px text-subtle">
          <span>on</span> {review.frontmatter.date}
        </div>
      </div>
      <LongFormText text={review.linkedHtml} className="max-w-prose" />
    </div>
  );
}
