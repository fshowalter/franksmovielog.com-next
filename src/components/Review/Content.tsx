import { Grade } from "@/components/Grade";
import { LongFormText } from "@/components/LongFormText";
import { twMerge } from "tailwind-merge";

interface Frontmatter {
  grade: string;
  date: string;
}

export interface ContentData {
  frontmatter: Frontmatter;
  linkedHtml: string;
}

export function Content({
  data,
  className,
}: {
  data: ContentData;
  className?: string;
}) {
  return (
    <div className={twMerge("flex flex-col gap-y-8", className)}>
      <div className="flex flex-col items-center">
        <Grade grade={data.frontmatter.grade} height={32} />
        <div className="flex flex-col items-center tracking-0.5px text-subtle">
          <span>on</span> {data.frontmatter.date}
        </div>
      </div>
      <LongFormText text={data.linkedHtml} className="max-w-prose" />
    </div>
  );
}
