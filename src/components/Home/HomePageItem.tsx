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
    <li className="flex even:bg-subtle">
      <article className="mx-auto flex flex-col items-center px-pageMargin py-10 desktop:grid desktop:w-full desktop:grid-cols-8">
        <div className="col-span-2 mb-6 text-center text-sm font-light uppercase leading-4 tracking-0.75px text-subtle desktop:mb-0 desktop:pb-6 desktop:text-left desktop:leading-8 max:col-span-1 max:self-start">
          {item.date}
        </div>
        <Link
          rel="canonical"
          href={`/reviews/${item.slug}/`}
          className="still-border block max-w-prose desktop:col-start-4 desktop:col-end-9 desktop:row-span-2 desktop:row-start-1 desktop:mt-10 desktop:self-start desktop:justify-self-end max:row-start-1 max:mt-0"
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
        <div className="flex max-w-lg flex-col items-center pt-4 desktop:col-span-5 desktop:col-start-1 desktop:row-start-2 desktop:items-start desktop:place-self-start desktop:pt-0 max:col-start-2 max:row-start-1">
          <h2 className="text-2.5xl font-bold leading-8">
            <Link
              href={`/reviews/${item.slug}/`}
              rel="canonical"
              className="inline-block text-default"
            >
              {item.title}{" "}
              <span className="inline-block text-base font-light leading-none text-subtle">
                {item.year}
              </span>
            </Link>
          </h2>
          <div className="spacer-y-4" />
          <Grade grade={item.grade} height={32} />
          <div className="spacer-y-6" />
          <p className="text-base font-normal leading-normal tracking-0.25px text-subtle">
            Directed by {toSentence(item.directorNames)}. Starring{" "}
            {toSentence(item.principalCastNames)}.
          </p>
          <div className="spacer-y-6" />
          <RenderedMarkdown
            text={item.reviewExcerpt}
            className="self-start text-lg leading-normal tracking-0.3px text-muted"
          />
        </div>
      </article>
    </li>
  );
}
