import Image, { ImageProps } from "next/image";

interface IStillProps extends Omit<ImageProps, "alt"> {
  title: string;
  year: string | number;
}

export function Still({ title, year, ...rest }: IStillProps): JSX.Element {
  return <Image {...rest} alt={`A still from ${title} (${year})`} />;
}
