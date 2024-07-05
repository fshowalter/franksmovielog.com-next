import { Box } from "@/components/Box";
import { legendPaddingStyle, responsiveFlexStyle } from "./Fieldset.css";

interface IFieldSetProps {
  legend: string;
  children: React.ReactNode;
}

export function Fieldset({ legend, children }: IFieldSetProps): JSX.Element {
  return (
    <Box
      as="fieldset"
      boxShadow="borderAll"
      borderRadius={4}
      color="subtle"
      paddingX="gutter"
      paddingTop={24}
      paddingBottom={32}
    >
      <Box
        as="legend"
        textAlign="center"
        fontSize="medium"
        className={legendPaddingStyle}
        backgroundColor="default"
      >
        {legend}
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        className={responsiveFlexStyle}
      >
        {children}
      </Box>
    </Box>
  );
}
