import NextLink, {LinkProps} from 'next/link'
import { composeClassNames } from "../../styles/composeClassNames";
import { Box, BoxProps } from "@/components/Box";

interface ILinkProps extends BoxProps<typeof NextLink> {}

export const Link = ({ className = undefined, href, ...rest }: ILinkProps) => (
  <Box as={NextLink} href={href} className={composeClassNames(className)} {...rest} />
);

export const ExternalLink = ({ className = undefined, ...rest }: BoxProps<"a">) => (
  <Box as="a" className={composeClassNames(className)} {...rest} />
);
