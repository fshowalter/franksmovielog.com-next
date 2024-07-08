import { LongFormText } from "@/components/LongFormText";
import { PageTitle } from "@/components/PageTitle";
import Image from "next/image";
import {
  IStillListMovie,
  StillList,
  StillListHeading,
  StillListNav,
} from "@/components/StillList";

export function Article({
  slug,
  alt,
  title,
  articleText,
  moreReviewedTitles,
}: {
  slug: string;
  alt: string;
  articleText: string;
  title: string;
  moreReviewedTitles: IStillListMovie[];
}): JSX.Element {
  return (
    <main>
      <article className="flex flex-col items-center">
        <PageTitle className="px-pageMargin py-6 text-center desktop:py-8">
          {title}
        </PageTitle>
        <Image
          src={`/assets/stills/${slug}.png`}
          width={960}
          height={540}
          alt={alt}
          className="mb-[5.33px]"
        />
        <div className="h-16 min-h-16" />
        <div className="px-pageMargin">
          <LongFormText text={articleText} className="max-w-prose" />
        </div>
        <div className="h-32 min-h-32" />
      </article>
      <div className="flex w-full max-w-popout items-center justify-center bg-default tablet:max-w-full tablet:bg-subtle tablet:pb-32 tablet:pt-8">
        <StillListNav>
          <StillListHeading
            leadText="Latest"
            linkText="Reviews"
            linkTarget={`/reviews/`}
          />
          <StillList
            movies={moreReviewedTitles}
            seeAllLinkTarget="/reviews/"
            seeAllLinkText="Reviews"
          />
        </StillListNav>
      </div>
    </main>
  );
}
