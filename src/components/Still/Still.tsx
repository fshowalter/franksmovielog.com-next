import Image, { ImageProps } from "next/image";

interface IStillProps extends Omit<ImageProps, "alt" | "src"> {
  slug: string;
  title: string;
  year: string | number;
}

export function Still({
  title,
  year,
  slug,
  ...rest
}: IStillProps): JSX.Element {
  return (
    <Image
      {...rest}
      src={`/assets/stills/${slug}.png`}
      alt={`A still from ${title} (${year})`}
    />
  );
}
