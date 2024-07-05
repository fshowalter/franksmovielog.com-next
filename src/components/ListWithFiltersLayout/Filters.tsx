import { Box } from "@/components/Box";
import { Fieldset } from "@/components/Fieldset";

import { stickyFiltersStyle } from "./Filters.css";

export function Filters({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Box className={stickyFiltersStyle}>
      <Fieldset legend="Filter & Sort">{children}</Fieldset>
    </Box>
  );
}
