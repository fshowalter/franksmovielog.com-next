/* eslint-env browser, node */

import { NavListItems } from "./NavListItems";
import { Mast } from "./Mast";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <a
        href="#content"
        className="bg-subtle text-accent translate-skip-to-content absolute left-1/2 top-0.5 z-50 mx-auto px-6 py-2 text-center"
      >
        Skip to content
      </a>
      <div
        className={
          "image-filter bg-notcomingsoon max-w-canvas desktop:sticky desktop:top-0 desktop:z-40 mx-auto min-h-4 w-full"
        }
      />

      <div className="max-w-canvas bg-default mx-auto flex min-h-full flex-col">
        <Mast />
        <div className="grow" id="content">
          {children}
        </div>
        <footer
          className={
            "px-pageMargin bg-notcomingsoon text-inverse flex flex-col items-center gap-y-6 py-8"
          }
        >
          <ul className="tablet:gap-x-6 text-inverse max:w-auto flex w-full flex-wrap justify-center gap-x-4 gap-y-2">
            <NavListItems activeClassName="text-inverse" />
          </ul>
          <p className="text-sm font-light leading-4">
            All stills used in accordance with the{" "}
            <a
              href="http://www.copyright.gov/title17/92chap1.html#107"
              className="text-inherit"
            >
              Fair Use Law.
            </a>
          </p>
          <a href="#top" className="sr-only">
            To the top ↑
          </a>
        </footer>
      </div>
    </div>
  );
}
