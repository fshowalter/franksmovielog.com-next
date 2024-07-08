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
        "text-md/7 tracking-0.3px tablet:text-xl/8",
        className,
      )}
    />
  );
}
