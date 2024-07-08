import { Grade } from "@/components/Grade";
import Link from "next/link";
import { Still } from "@/components/Still";

export function StillListMovie({ movie }: { movie: IStillListMovie }) {
  return (
    <li className="tablet:shadow-border tablet:shadow-all flow-root w-full px-gutter py-6 even:bg-subtle tablet:grid tablet:max-w-[312px] tablet:grid-rows-[auto_auto_1fr_auto] tablet:gap-y-2 tablet:overflow-hidden tablet:rounded-lg tablet:bg-default tablet:p-0 tablet:pb-8 tablet:even:bg-default">
      <div className="row-start-1 row-end-1">
        <Link
          href={`/reviews/${movie.slug}/`}
          className="safari-border-radius-fix float-right mb-2 ml-6 block w-[calc(50%_-_12px)] max-w-[312px] overflow-hidden rounded-lg tablet:float-none tablet:m-0 tablet:w-auto tablet:rounded-none"
        >
          <Still
            slug={movie.slug}
            title={movie.title}
            year={movie.year}
            width={312}
            height={175.5}
            className="h-auto"
          />
        </Link>
      </div>
      <div className="row-start-2 mb-2 tablet:m-0 tablet:px-6">
        <Link
          href={`/reviews/${movie.slug}/`}
          className="block text-md text-default"
        >
          {movie.title}{" "}
          <span className="text-sm font-light leading-none text-muted">
            {movie.year}
          </span>
        </Link>
      </div>
      <div className="mb-6 tablet:m-0 tablet:px-6 tablet:pb-6">
        <Grade grade={movie.grade} height={16} />
      </div>
      <div className="tablet:px-6">
        <Genres genres={movie.genres} />
      </div>
    </li>
  );
}

function Genres({ genres }: { genres: readonly string[] }): JSX.Element | null {
  return (
    <div className="text-sm leading-4 tracking-0.5px text-subtle">
      {genres.map((genre, index) => {
        if (index === 0) {
          return <span key={genre}>{genre}</span>;
        }

        return <span key={genre}> | {genre}</span>;
      })}
    </div>
  );
}

export interface IStillListMovie {
  title: string;
  grade: string;
  slug: string;
  year: string;
  genres: string[];
}
