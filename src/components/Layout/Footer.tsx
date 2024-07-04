import { Box, BoxProps } from "../Box";
import { ExternalLink } from "../Link";
import ScreenReaderOnly from "@/components/ScreenReaderOnly";
import { Nav } from "./Nav";

export function Footer({ ...rest }: BoxProps) {
  return (
    <Box as="footer" color="inverse" display="flex" {...rest}>
      <Nav justifyContent="center" />
      <Box as="p" fontWeight="light" fontSize="small" lineHeight={16}>
        All stills used in accordance with the{" "}
        <ExternalLink
          href="http://www.copyright.gov/title17/92chap1.html#107"
          color="inherit"
        >
          Fair Use Law.
        </ExternalLink>
      </Box>
      <ScreenReaderOnly>
        <a href="#top">To the top ↑</a>
      </ScreenReaderOnly>
    </Box>
  );
}
