import Link from "next/link";
import { navActiveLinkStyle, orderStyle } from "./Mast.css";
import { Nav } from "./NavList";
import { SiteSearchForm } from "./SiteSearchForm";

export function Mast() {
  return (
    <header className="border-bottom px-pageMargin flex flex-col items-center gap-6 bg-default py-6 text-center desktop:sticky desktop:top-4 desktop:z-40 desktop:flex-row desktop:flex-wrap desktop:justify-between desktop:py-8 desktop:text-left">
      <div className="items-inherit justify-items-inherit flex flex-col">
        <h1
          className="whitespace-nowrap font-normal leading-8"
          style={{ fontSize: "1.5625rem" }}
        >
          <Link className="text-default" href="/">
            Frank&apos;s Movie Log
          </Link>
        </h1>
        <p
          className={"text-muted w-full text-sm italic leading-4 desktop:pl-px"}
        >
          My life at the movies.
        </p>
      </div>
      <div className="w-full max-w-prose desktop:w-auto max:order-4">
        <SiteSearchForm />
      </div>
      <Nav
        activeClassName={navActiveLinkStyle}
        className="text-accent w-full justify-center desktop:justify-start max:w-auto"
      />
    </header>
  );
}
