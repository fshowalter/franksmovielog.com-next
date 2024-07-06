import Link from "next/link";
import Image from "next/image";

export function ListItemPoster({
  slug,
  title,
  year,
}: {
  slug: string | null;
  title: string;
  year: string;
}) {
  if (slug) {
    return (
      <Link href={`/reviews/${slug}/`} className="list-item-poster">
        <Image
          src={`/assets/posters/${slug}.png`}
          alt={`A poster from ${title} (${year})`}
          width={56}
          height={84}
        />
      </Link>
    );
  }

  return (
    <Image
      src="/assets/posters/default.png"
      alt="An unreviewed title."
      className="list-item-poster"
    />
  );
}
