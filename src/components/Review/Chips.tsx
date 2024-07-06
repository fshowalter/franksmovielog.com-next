import Link from "next/link";
import Image from "next/image";
import type { IReview } from "./data";

export function Chips({ review }: { review: IReview }): JSX.Element {
  return (
    <ul className="flex flex-wrap gap-2">
      {review.castAndCrew.map((member) => {
        return (
          <Chip
            linkTarget={`/cast-and-crew/${member.slug}`}
            slug={member.slug}
            name={member.name}
            key={member.slug}
          />
        );
      })}
      {review.collections.map((collection) => {
        return (
          <Chip
            linkTarget={`/collections/${collection.slug}`}
            slug={collection.slug}
            name={collection.name}
            key={collection.slug}
          />
        );
      })}
    </ul>
  );
}

function Chip({
  linkTarget,
  slug,
  name,
}: {
  linkTarget: string;
  slug: string;
  name: string;
}) {
  return (
    <li className="block">
      <Link
        href={linkTarget}
        className="bg-inverse border-all hover:border-all-accent flex items-center whitespace-nowrap rounded-lg px-4 py-2"
      >
        <Image
          src={`/assets/avatars/${slug}.png`}
          alt={`More ${name} reviews`}
          width={40}
          height={40}
          className="avatar-border mr-[1ch] block size-10"
        />
        {name}
      </Link>
    </li>
  );
}
