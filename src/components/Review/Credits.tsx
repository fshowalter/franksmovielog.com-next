import { toSentence } from "../../utils";
import Image from "next/image";
import { Chips } from "./Chips";
import type { IReview } from "./data";
import { twMerge } from "tailwind-merge";

export function Credits({
  review,
  className,
}: {
  review: IReview;
  className?: string;
}): JSX.Element {
  return (
    <aside
      id="credits"
      className={twMerge(
        "px-gutter tablet:pt-12 bg-subtle scroll-margin-top relative pb-8 pt-8",
        className,
      )}
    >
      <header className="flex items-baseline justify-center gap-x-2 pb-6 text-center text-lg">
        {review.title}{" "}
        <span className="text-subtle text-sm font-light">({review.year})</span>
      </header>
      <div className="tablet:float-left tablet:max-w-1/2 tablet:mr-gutter mx-auto block">
        <Image
          src={`/assets/posters/${review.slug}.png`}
          alt={`A poster from ${review.title} (${review.year})`}
          className="poster-border max-w-poster tablet:mx-0 mx-auto mb-4 mt-0 rounded-lg"
          width={248}
          height={372}
        />
      </div>

      <dl className="flex flex-col gap-y-6">
        {review.originalTitle && (
          <Credit title="Original Title" creditValue={review.originalTitle} />
        )}
        <Credit title="Financing" creditValue={toSentence(review.countries)} />
        <Credit
          title="Running Time"
          creditValue={`${review.runtimeMinutes} min`}
        />
        <Credit
          title="Directed by"
          creditValue={review.directorNames.map((name) => (
            <div key={name}>{name}</div>
          ))}
        />
        <Credit
          title="Written by"
          creditValue={review.writerNames.map((name) => (
            <div key={name}>{name}</div>
          ))}
        />
        <Credit
          title="Starring"
          creditValue={toSentence(review.principalCastNames)}
        />
      </dl>
      <div className="h-8 min-h-8" />
      <Chips review={review} />
      <div className="h-8 min-h-8" />
      <a
        href="#top"
        className="border-all max-w-1/2 flex cursor-pointer content-center items-center rounded-lg p-2"
      >
        Back to Top
        <svg viewBox="0 0 24 24" className="fill-default size-6">
          <path d="M7.997 10l3.515-3.79a.672.672 0 0 1 .89-.076l.086.075L16 10 13 10.001V18h-2v-7.999L7.997 10z"></path>
        </svg>
      </a>
    </aside>
  );
}

function Credit({
  title,
  creditValue,
}: {
  title: string;
  creditValue: React.ReactNode;
}) {
  return (
    <div className="mb-4 overflow-hidden">
      <dt className="text-subtle font-bold">{title}</dt>
      <dd className="text-subtle">{creditValue}</dd>
    </div>
  );
}
