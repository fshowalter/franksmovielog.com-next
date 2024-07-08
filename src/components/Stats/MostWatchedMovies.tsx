import Image from "next/image";
import Link from "next/link";
import { ListItemTitle } from "@/components/ListItemTitle";
import { StatHeading } from "@/components/StatHeading";
import { twMerge } from "tailwind-merge";

export function MostWatchedMovies({
  titles,
}: {
  titles: readonly IMostWatchedTitle[];
}): JSX.Element | null {
  if (titles.length === 0) {
    return null;
  }

  return (
    <section>
      <StatHeading>Most Watched Movies</StatHeading>
      <div>
        <div className="tablet:spacer-y-4" />
        <List>
          {titles.map((movie) => {
            return <ListItem movie={movie} key={movie.imdbId} />;
          })}
        </List>
        <div className="tablet:spacer-y-4" />
      </div>
    </section>
  );
}

function List({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ol className="grid-cols-[repeat(auto-fill,_minmax(128px,_1fr))] gap-x-6 gap-y-8 tablet:grid">
      {children}
    </ol>
  );
}

function ListItem({ movie }: { movie: IMostWatchedTitle }): JSX.Element {
  return (
    <li className="flex items-center gap-x-6 px-gutter py-4 even:bg-subtle tablet:flex-col tablet:p-0 tablet:even:bg-unset">
      <Poster movie={movie} className="shrink-0" />
      <div className="grow tablet:w-full">
        <div className="tablet:hidden">
          <div className="tablet:spacer-y-1" />
          <ListItemTitle
            title={movie.title}
            year={movie.year}
            slug={movie.slug}
          />
          <div className="spacer-y-1 tablet:spacer-y-2" />
        </div>
        <div className="flex justify-start text-base text-subtle tablet:justify-center">
          <div>{movie.count.toLocaleString()} times</div>
        </div>
        <div className="spacer-y-1 tablet:spacer-y-0" />
      </div>
    </li>
  );
}

function Poster({
  movie,
  className,
}: {
  movie: IMostWatchedTitle;
  className?: string;
}) {
  if (movie.slug) {
    return (
      <Link
        href={`/reviews/${movie.slug}/`}
        className={twMerge(
          "safari-border-radius-fix min-w-12 max-w-12 overflow-hidden rounded-lg shadow-all tablet:max-w-poster",
          className,
        )}
      >
        <Image
          src={`/assets/posters/${movie.slug}.png`}
          alt={`A poster from ${movie.title} (${movie.year})`}
          width={200}
          height={300}
          className="h-auto"
        />
      </Link>
    );
  }

  return (
    <div
      className={twMerge(
        "safari-border-radius-fix min-w-12 max-w-12 overflow-hidden rounded-lg shadow-all tablet:max-w-poster",
        className,
      )}
    >
      <Image
        src={`/assets/posters/default.png`}
        alt={`${movie.title} (${movie.year})`}
        title={`${movie.title} (${movie.year})`}
        width={200}
        height={300}
        className="h-auto"
      />
    </div>
  );
}

export interface IMostWatchedTitle {
  imdbId: string;
  title: string;
  year: string;
  slug: string | null;
  count: number;
}
