import { composeClassNames } from "@/styles/composeClassNames";
import { Box, BoxProps } from "@/components/Box";
import { ElementType } from "react";

export interface IGridAreaProps<T extends string> extends BoxProps {
  name: T;
}

export function gridAreaComponent<T extends string>(
  gridAreas: Record<T, string>,
): (args: IGridAreaProps<T>) => JSX.Element {
  return function GridArea({ name, ...rest }: IGridAreaProps<T>) {
    return <Box className={gridAreas[name]} {...rest} />;
  };
}

export function gridComponent<T extends ElementType>(
  gridStyle: string,
): (args: BoxProps<T>) => JSX.Element {
  return function Grid({ as, className, ...rest }: BoxProps<T>) {
    return (
      <Box as={as} className={composeClassNames(className, gridStyle)} {...rest} />
    );
  };
}
