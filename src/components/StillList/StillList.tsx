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
    <ul className="destkop:grid-cols-[repeat(4,1fr)] desktop:max-w-unset w-full tablet:grid tablet:w-auto tablet:grid-cols-[repeat(2,minmax(100px,312px))] tablet:gap-8 tablet:px-gutter desktop:px-pageMargin desktop:pt-2">
      {movies.map((movie) => {
        return <StillListMovie key={movie.slug} movie={movie} />;
      })}
      <li className="block px-gutter py-4 text-right">
        <Link href={seeAllLinkTarget}>
          All{" "}
          <span className="inline tablet:hidden desktop:inline">
            {seeAllLinkText}
          </span>{" "}
          &#8594;
        </Link>
      </li>
    </ul>
  );
}
