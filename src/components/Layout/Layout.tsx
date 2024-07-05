/* eslint-env browser, node */

import { Footer } from "./Footer";
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
          "image-filter bg-notcomingsoon mx-auto min-h-4 w-full max-w-canvas desktop:sticky desktop:top-0 desktop:z-40"
        }
      />

      <div className="mx-auto flex min-h-full max-w-canvas flex-col bg-default">
        <Mast />
        <div className="flex-grow" id="content">
          {children}
        </div>
        <Footer
          className={
            "px-pageMargin bg-notcomingsoon flex-col items-center gap-x-6 py-8"
          }
        />
      </div>
    </div>
  );
}
