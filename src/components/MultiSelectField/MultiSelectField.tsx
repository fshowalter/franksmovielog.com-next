import { LabelText } from "@/components/LabelText";
import Select, { MultiValue } from "react-select";

export function MultiSelectField({
  onChange,
  options,
  label,
}: {
  label: string;
  onChange: (e: MultiValue<{ value: string; label: string }>) => void;
  options: readonly string[];
}) {
  return (
    <div className="flex flex-col text-left">
      <LabelText text={label} as="label" htmlFor={label} />
      <Select
        inputId={label}
        theme={(theme) => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            neutral0: "var(--bg-subtle)",
            neutral20: "var(--border-default)",
            neutral50: "var(--fg-subtle)",
            danger: "var(--fg-accent)",
            primary25: "var(--bg-stripe)",
          },
        })}
        styles={{
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            color: "var(--border-color-accent)",
          }),
        }}
        classNamePrefix="reactSelect"
        isSearchable={false}
        onChange={onChange}
        isMulti={true}
        options={options.map((option) => {
          return { value: option, label: option };
        })}
      />
    </div>
  );
}
