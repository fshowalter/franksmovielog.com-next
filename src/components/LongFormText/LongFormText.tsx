import { RenderedMarkdown } from "@/components/RenderedMarkdown";
import { twMerge } from "tailwind-merge";

export function LongFormText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <RenderedMarkdown
      text={text}
      className={twMerge(
        "tracking-0.3px, text-md/7 desktop:text-xl/8",
        className,
      )}
    />
  );
}
