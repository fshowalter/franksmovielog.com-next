import Link from "next/link";

export function ListItemTitle({
  title,
  year,
  slug,
}: {
  title: string;
  year: string;
  slug: string | null | undefined;
}) {
  const yearBox = (
    <span className="text-subtle text-xs font-light">{year}</span>
  );

  if (slug) {
    return (
      <Link href={`/reviews/${slug}/`} className="text-md block">
        {title}&#8239;&#8239;{yearBox}
      </Link>
    );
  }

  return (
    <span className="text-md block">
      {title}&#8239;&#8239;{yearBox}
    </span>
  );
}
