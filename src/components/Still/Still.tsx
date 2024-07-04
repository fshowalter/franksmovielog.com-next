import { Box, BoxProps } from "@/components/Box";
import  Image from 'next/image'

interface IStillProps extends Omit<BoxProps<typeof Image>, "alt"> {
  title: string;
  year: string | number;
  __width: number;
  __height: number;
}

export function Still({ title, year, ...rest }: IStillProps): JSX.Element {
  return <Box as={Image} {...rest} alt={`A still from ${title} (${year})`} />;
}
