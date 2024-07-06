import Link from "next/link";

export function StillListHeading({
  leadText,
  linkText,
  linkTarget,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
}) {
  return (
    <div className="desktop:py-4 px-gutter desktop:px-pageMargin border-bottom tablet:shadow-none w-full">
      <span className="text-muted font-semibold">{leadText} </span>
      <Link href={linkTarget}>{linkText}</Link>
    </div>
  );
}
