import { Box } from "../Box";
import Link from "next/link";

export function StillListHeading({
  leadText,
  linkText,
  linkTarget,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
}) {
  return (
    <Box
      boxShadow={{ default: "borderBottom", tablet: "unset" }}
      paddingY={{ default: 8, tablet: 16 }}
      paddingX={{ default: "gutter", desktop: "pageMargin" }}
      width="full"
    >
      <span className="text-muted font-semibold">{leadText} </span>
      <Link href={linkTarget}>{linkText}</Link>
    </Box>
  );
}
