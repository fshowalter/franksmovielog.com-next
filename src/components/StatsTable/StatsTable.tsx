import React from "react";
import { twMerge } from "tailwind-merge";

export function Table({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <table className="relative w-full border-collapse shadow-all tablet:whitespace-nowrap">
      {children}
    </table>
  );
}

export function TableHead({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <thead className="sticky top-10 z-10 bg-default px-6 leading-[calc(2.5rem_-_2px)] desktop:top-[calc(208px_+_2.5rem)] max:top-[calc(160px_+_2.5rem)]">
      {children}
    </thead>
  );
}

export function TableRow({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <tr className="leading-10 odd:bg-subtle">{children}</tr>;
}

export function TableHeaderCell({
  align,
  children,
}: {
  align: "left" | "right";
  children: React.ReactNode;
}): JSX.Element {
  if (align === "left") {
    return <th className="pl-gutter text-left">{children}</th>;
  }

  return <th className="pr-gutter text-right">{children}</th>;
}

export function TableDataCell({
  align,
  children,
  hideOnSmallScreens = false,
  className,
}: {
  hideOnSmallScreens?: boolean;
  align: "left" | "right" | "fill";
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  const hideOnSmallScreensClass = hideOnSmallScreens
    ? "max-tablet:w-0 max-tablet:*:hidden"
    : undefined;

  if (align === "fill") {
    return (
      <td
        className={twMerge("w-full py-0", className, hideOnSmallScreensClass)}
      >
        {children}
      </td>
    );
  }

  if (align === "left") {
    return (
      <td
        className={twMerge(
          "px-gutter py-0 text-left",
          className,
          hideOnSmallScreensClass,
        )}
      >
        {children}
      </td>
    );
  }

  return (
    <td
      className={twMerge(
        "px-gutter py-0 text-right",
        className,
        hideOnSmallScreensClass,
      )}
    >
      {children}
    </td>
  );
}
