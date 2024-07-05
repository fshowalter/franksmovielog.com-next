import NextLink, {LinkProps} from 'next/link'
import { composeClassNames } from "../../styles/composeClassNames";
import { Box, BoxProps } from "@/components/Box";


interface ILinkProps extends Omit<LinkProps, "as">, Omit<BoxProps, "href"> {
  className?: string;
}

export const Link = ({ className = undefined, ...rest }: ILinkProps) => (
  <Box as={NextLink} className={composeClassNames(className)} {...rest} />
);

export const ExternalLink = ({ className = undefined, ...rest }: BoxProps) => (
  <Box as="a" className={composeClassNames(className)} {...rest} />
);
