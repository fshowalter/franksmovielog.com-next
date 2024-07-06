import { twMerge } from "tailwind-merge";

export function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <h1
      className={twMerge(
        "desktop:text-[2.5rem] text-[2rem] font-normal leading-none",
        className,
      )}
    >
      {children}
    </h1>
  );
}
