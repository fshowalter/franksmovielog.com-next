import { ElementType } from "react";

export function LabelText({
  text,
  as = "span",
}: {
  text: string;
  htmlFor?: string;
  as?: ElementType;
}) {
  const Componet = as;

  return (
    <Componet className="tracking-0.5px inline-block h-6 text-left text-sm font-semibold">
      {text}
    </Componet>
  );
}
