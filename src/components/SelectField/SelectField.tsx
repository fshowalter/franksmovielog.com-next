import { ChangeEvent } from "react";
import { Box, BoxProps } from "@/components/Box";
import { LabelText } from "@/components/LabelText";
import { SelectInput } from "@/components/SelectInput";

interface SelectFieldProps extends BoxProps {
  label: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

export function SelectField({
  label,
  value,
  onChange,
  children,
  ...rest
}: SelectFieldProps): JSX.Element {
  return (
    <Box as="label" display="flex" flexDirection="column" {...rest}>
      <LabelText as="span" text={label} />
      <SelectInput value={value?.toString()} onChange={onChange}>
        {children}
      </SelectInput>
    </Box>
  );
}
