"use client"

import React, { ChangeEvent } from "react";
import { Box, BoxProps } from "../Box";
import { inputSyle } from "./SelectInput.css";

interface ISelectInputProps extends BoxProps<"select"> {
  value?: string | number;
  children: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export function SelectInput({
  value,
  onChange,
  children,
  ...rest
}: ISelectInputProps): JSX.Element {
  return (
    <Box
      as="select"
      value={value}
      borderRadius={4}
      className={inputSyle}
      onChange={onChange}
      {...rest}
    >
      {children}
    </Box>
  );
}
