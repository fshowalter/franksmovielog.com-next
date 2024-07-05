import { Box, BoxProps } from "@/components/Box";
import { ElementType } from "react";

interface ILabelTextProps extends BoxProps {
  text: string;
  htmlFor?: string;
  as: ElementType;
}

export function LabelText({ text, as, ...rest }: ILabelTextProps) {
  return (
    <Box
      as={as}
      fontSize="small"
      display="inline-block"
      letterSpacing={0.5}
      textAlign="left"
      fontWeight="semiBold"
      height={24}
      {...rest}
    >
      {text}
    </Box>
  );
}
