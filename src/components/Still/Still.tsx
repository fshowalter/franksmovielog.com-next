import Image from "next-export-optimize-images/image";
import { Box, BoxProps } from "@/components/Box";

interface IStillProps extends BoxProps<Image> {
  title: string;
  year: string | number;
}

export function Still({ title, year, ...rest }: IStillProps): JSX.Element {
  return <Box as={Image} {...rest} alt={`A still from ${title} (${year})`} />;
}
