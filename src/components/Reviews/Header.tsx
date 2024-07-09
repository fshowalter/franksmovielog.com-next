import Link from "next/link";
import { PageTitle } from "@/components/PageTitle";

export function Header({ reviewCount }: { reviewCount: number }): JSX.Element {
  return (
    <>
      <PageTitle className="text-center">Reviews</PageTitle>
      <div className="spacer-y-2" />
      <q className="block text-center text-subtle">
        We have such sights to show you.
      </q>
      <div className="spacer-y-8" />
      <div className="text-center text-subtle">
        <p>
          Since 2012, I&apos;ve published{" "}
          <span className="text-emphasis">{reviewCount.toLocaleString()}</span>{" "}
          reviews.
        </p>
        <div className="spacer-y-4" />
        <p>
          <span className="font-semibold">Looking for something new?</span>
          <br /> Peruse my list of{" "}
          <Link href="/reviews/underseen/">underseen gems</Link>.
        </p>
        <div className="spacer-y-4" />
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
