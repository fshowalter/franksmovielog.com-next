import { Box, BoxProps } from "@/components/Box";
import { typographyStyle } from "./PageTitle.css";

export function PageTitle({ children, ...rest }: BoxProps): JSX.Element {
  return (
    <Box as="h1" className={typographyStyle} {...rest}>
      {children}
    </Box>
  );
}
