import Link from "next/link";

export function Header({ reviewCount }: { reviewCount: number }): JSX.Element {
  return (
    <>
      <h1 className="page-title text-center">Reviews</h1>
      <q className="text-subtle block text-center">
        We have such sights to show you.
      </q>
      <div className="max-h-4 min-h-4" />

      <div className="text-subtle text-center">
        <div className="max-h-4 min-h-4" />
        <p>
          Since 2012, I&apos;ve published{" "}
          <span className="text-emphasis">{reviewCount.toLocaleString()}</span>{" "}
          reviews.
        </p>
        <div className="max-h-4 min-h-4" />
        <p>
          <span className="font-semibold">Looking for something new?</span>
          <br /> Peruse my list of{" "}
          <Link href="/reviews/underseen/">underseen gems</Link>.
        </p>
        <div className="max-h-4 min-h-4" />
        <p>
          <span className="font-semibold">Feeling contrarian?</span>
          <br />
          Behold my list of{" "}
          <Link href="/reviews/overrated/">overrated disappointments</Link>.
        </p>
      </div>
    </>
  );
}
