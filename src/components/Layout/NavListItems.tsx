"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavListItem({
  to,
  children,
  activeClassName,
}: {
  to: string;
  children: React.ReactNode;
  activeClassName: string;
}): JSX.Element {
  const pathname = usePathname();

  let className = "text-inherit";

  if (pathname === to) {
    className = activeClassName;
  }

  return (
    <li className="tracking-0.5px block whitespace-nowrap">
      <Link className={className} href={to}>
        {children}
      </Link>
    </li>
  );
}

export function NavListItems({ activeClassName }: { activeClassName: string }) {
  return (
    <>
      <NavListItem activeClassName={activeClassName} to="/">
        Home
      </NavListItem>
      <NavListItem activeClassName={activeClassName} to="/how-i-grade/">
        How I Grade
      </NavListItem>
      <NavListItem activeClassName={activeClassName} to="/reviews/">
        Reviews
      </NavListItem>
      <NavListItem activeClassName={activeClassName} to="/viewings/">
        Viewing Log
      </NavListItem>
      <NavListItem activeClassName={activeClassName} to="/cast-and-crew/">
        Cast & Crew
      </NavListItem>
      <NavListItem activeClassName={activeClassName} to="/collections/">
        Collections
      </NavListItem>
      <NavListItem activeClassName={activeClassName} to="/watchlist/">
        Watchlist
      </NavListItem>
    </>
  );
}
