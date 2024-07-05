import { ElementType, ComponentPropsWithoutRef } from "react";
import { sprinkles, Sprinkles } from "@/styles/sprinkles.css";

function composeClassNames(...classNames: (string | undefined)[]) {
  const classes = classNames
    .filter((className) => Boolean(className) && className !== ` `)
    .map((className) => className?.toString().trim()) as string[];
  return classes.length === 0 ? undefined : classes.join(` `);
}

export type BoxProps<C extends ElementType> = Sprinkles &
  ComponentPropsWithoutRef<C> & {
    as?: C;
    className?: string;
    style?: Record<string, any>;
  };

interface IAtomsFnBase {
  (...args: any): string;
  properties: Set<string>;
}

function extractAtomsFromProps<AtomsFn extends IAtomsFnBase>(
  props: Record<string, unknown>,
  atomsFn: AtomsFn,
) {
  let hasAtomProps = false;
  const atomProps: Record<string, unknown> = {};
  const otherProps: Record<string, unknown> = {};
  const customProps: Record<string, unknown> = {};

  for (const key in props) {
    if (key.startsWith(`_`) && key[1] === `_`) {
      const actualKey = key.substring(2);
      customProps[actualKey] = props[key];
    } else if (atomsFn.properties.has(key)) {
      hasAtomProps = true;
      atomProps[key] = props[key];
    } else {
      otherProps[key] = props[key];
    }
  }

  return { hasAtomProps, atomProps, otherProps, customProps };
}

export const Box = <C extends ElementType = "div">({
  as,
  children,
  className,
  style,
  ...props
}: BoxProps<C>) => {
  const Component = as || "div";
  const { atomProps, customProps, otherProps } = extractAtomsFromProps(
    props,
    sprinkles,
  );

  return (
    <Component
      className={composeClassNames(className, sprinkles(atomProps))}
      style={{ ...style, ...customProps }}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
