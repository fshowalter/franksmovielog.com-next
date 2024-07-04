'use client'

import { Box, BoxProps } from "@/components/Box";
import { Link } from "@/components//Link";
import { usePathname } from 'next/navigation'

function NavItem({
  to,
  children,
  activeClassName,
}: {
  to: string;
  children: React.ReactNode;
  activeClassName?: string;
}): JSX.Element {
  const pathname = usePathname();

  let className;

  if (pathname === to) {
    className = activeClassName;
  }

  return (
    
    <Box as="li" display="block" letterSpacing={0.5} whiteSpace="nowrap">
      <Link color="inherit" className={className} href={to}>
        {children}
      </Link>
    </Box>
  );
}

interface INavProps extends BoxProps {
  activeClassName?: string;
}

export function Nav({ activeClassName, justifyContent, ...rest }: INavProps) {
  return (
    <Box as="nav" {...rest}>
      <Box
        as="ul"
        display="flex"
        flexWrap="wrap"
        justifyContent={justifyContent}
        rowGap={8}
        columnGap={{ default: 16, tablet: 24 }}
      >
        <NavItem activeClassName={activeClassName} to="/">
          Home
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/how-i-grade/">
          How I Grade
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/reviews/">
          Reviews
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/viewings/">
          Viewing Log
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/cast-and-crew/">
          Cast & Crew
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/collections/">
          Collections
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/watchlist/">
          Watchlist
        </NavItem>
      </Box>
    </Box>
  );
}
