import React, { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

export function SelectInput({
  value,
  onChange,
  children,
  className,
}: {
  value?: string | number;
  children: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}): JSX.Element {
  return (
    <select
      value={value}
      onChange={onChange}
      className={twMerge("rounded-md", className)}
    >
      {children}
    </select>
  );
}
