import { Grade } from "@/components/Grade";
import Link from "next/link";
import { Still } from "@/components/Still";

export function StillListMovie({ movie }: { movie: IStillListMovie }) {
  return (
    <li className="tablet:shadow-border tablet:shadow-all flow-root w-full py-6 even:bg-subtle tablet:bg-default tablet:p-0">
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
          className="block text-md text-default"
        >
          {movie.title}{" "}
          <span className="text-sm font-light leading-none text-muted">
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
