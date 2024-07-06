import { Grade } from "@/components/Grade";
import Link from "next/link";
import { Still } from "@/components/Still";

export function StillListMovie({ movie }: { movie: IStillListMovie }) {
  return (
    <li className="px-gutter">
      <div>
        <Link href={`/reviews/${movie.slug}/`}>
          <Still
            slug={movie.slug}
            title={movie.title}
            year={movie.year}
            width={312}
            height={175.5}
          />
        </Link>
      </div>
      <div>
        <Link
          href={`/reviews/${movie.slug}/`}
          className="text-md text-default block"
        >
          {movie.title}{" "}
          <span className="text-muted text-sm font-light leading-none">
            {movie.year}
          </span>
        </Link>
      </div>
      <div>
        <Grade grade={movie.grade} height={16} />
      </div>
      <div>
        <Genres genres={movie.genres} />
      </div>
    </li>
  );
}

function Genres({ genres }: { genres: readonly string[] }): JSX.Element | null {
  return (
    <div className="text-subtle tracking-0.5px text-sm leading-4">
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
