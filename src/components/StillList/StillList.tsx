import Link from "next/link";
import { IStillListMovie, StillListMovie } from "./StillListMovie";

export function StillList({
  movies,
  seeAllLinkText,
  seeAllLinkTarget,
}: {
  movies: IStillListMovie[];
  seeAllLinkText: string;
  seeAllLinkTarget: string;
}): JSX.Element {
  return (
    <ul>
      {movies.map((movie) => {
        return <StillListMovie key={movie.slug} movie={movie} />;
      })}
      <li className="px-gutter block py-4 text-right">
        <Link href={seeAllLinkTarget}>
          All{" "}
          <span className="tablet:hidden desktop:inline inline">
            {seeAllLinkText}
          </span>{" "}
          &#8594;
        </Link>
      </li>
    </ul>
  );
}
