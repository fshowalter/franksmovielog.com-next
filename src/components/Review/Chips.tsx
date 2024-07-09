import Link from "next/link";
import Image from "next/image";

interface CastAndCrewMember {
  name: string;
  slug: string;
}

interface Collection {
  name: string;
  slug: string;
}

export interface ChipsData {
  castAndCrew: CastAndCrewMember[];
  collections: Collection[];
}

export function Chips({ data }: { data: ChipsData }): JSX.Element {
  return (
    <ul className="flex flex-wrap gap-2">
      {data.castAndCrew.map((member) => {
        return (
          <Chip
            linkTarget={`/cast-and-crew/${member.slug}`}
            slug={member.slug}
            name={member.name}
            key={member.slug}
          />
        );
      })}
      {data.collections.map((collection) => {
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
        className="border-all hover:border-all-accent flex items-center whitespace-nowrap rounded-lg bg-inverse px-4 py-2"
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
