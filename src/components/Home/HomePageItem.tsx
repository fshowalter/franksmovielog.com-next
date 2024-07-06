import { toSentence } from "@/utils";
import { Grade } from "@/components/Grade";
import Link from "next/link";
import { RenderedMarkdown } from "@/components/RenderedMarkdown";
import type { IHomePageItem } from "./data";
import { Still } from "@/components/Still";

export function HomePageItem({
  item,
  eagerLoadImage,
}: {
  item: IHomePageItem;
  eagerLoadImage: boolean;
}) {
  return (
    <li className="even:bg-subtle flex">
      <article className="px-pageMargin desktop:grid desktop:grid-cols-8 desktop:w-full mx-auto flex flex-col items-center py-10">
        <div className="max:col-span-1 max:self-start desktop:text-left desktop:leading-8 desktop:pb-6 desktop:mb-0 tracking-0.75px text-subtle col-span-2 mb-6 text-center text-sm font-light uppercase leading-4">
          {item.date}
        </div>
        <Link
          rel="canonical"
          href={`/reviews/${item.slug}/`}
          className="desktop:justify-self-end desktop:col-end-9 desktop:col-start-4 max:row-start-1 max:mt-0 desktop:mt-10 still-border desktop:row-span-2 desktop:row-start-1 desktop:self-start block max-w-prose"
        >
          <Still
            title={item.title}
            year={item.year}
            width={512}
            height={288}
            quality={80}
            slug={item.slug}
            priority={eagerLoadImage}
            className="h-auto rounded-xl"
          />
        </Link>
        <div className="max:row-start-1 max:col-start-2 desktop:items-start desktop:row-start-2 desktop:place-self-start desktop:col-span-5 desktop:pt-0 desktop:col-start-1 flex max-w-lg flex-col items-center pt-4">
          <h2 className="text-2.5xl font-bold leading-8">
            <Link
              href={`/reviews/${item.slug}/`}
              rel="canonical"
              className="text-default inline-block"
            >
              {item.title}{" "}
              <span className="text-subtle inline-block text-base font-light leading-none">
                {item.year}
              </span>
            </Link>
          </h2>
          <div className="h-4 min-h-4" />
          <Grade grade={item.grade} height={32} />
          <div className="h-6 min-h-6" />
          <p className="text-subtle tracking-0.25px text-base font-normal leading-normal">
            Directed by {toSentence(item.directorNames)}. Starring{" "}
            {toSentence(item.principalCastNames)}.
          </p>
          <div className="h-6 min-h-6" />
          <RenderedMarkdown
            text={item.reviewExcerpt}
            className="text-muted tracking-0.3px self-start text-lg leading-normal"
          />
        </div>
      </article>
    </li>
  );
}
