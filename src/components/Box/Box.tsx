// Copied from https://github.com/TheMightyPenguin/dessert-box
// The MIT License (MIT) - Copyright (c) 2021 Victor Tortolero

/* eslint-disable no-restricted-syntax */

import React, { createElement, forwardRef, ElementType } from "react";
import { sprinkles, Sprinkles } from "../../styles/sprinkles.css";
import { custom } from "zod";

function composeClassNames(...classNames: (string | undefined)[]) {
  const classes = classNames
    .filter((className) => Boolean(className) && className !== ` `)
    .map((className) => className?.toString().trim()) as string[];
  return classes.length === 0 ? undefined : classes.join(` `);
}

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

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width" | "size"
>;

type OverrideTokens<T> = {
  [K in keyof T as K extends string ? `__${K}` : number]: any;
};

interface CreateBoxParams<AtomsFn> {
  atoms: AtomsFn;
}

function createBox<AtomsFn extends IAtomsFnBase>({
  atoms: atomsFn,
}: CreateBoxParams<AtomsFn>) {
  type Tokens = Parameters<AtomsFn>[0];
  type BoxProps = {
    as?: React.ElementType;
    children?: React.ReactNode;
    className?: string;
    style?: Record<string, any>;
  } & Tokens &
    OverrideTokens<Tokens> &
    HTMLProperties;

  const Box = forwardRef<HTMLElement, BoxProps>(
    ({ as: element = "div", className, style, ...props }: BoxProps, ref) => {
      const { atomProps, customProps, otherProps } = extractAtomsFromProps(
        props,
        atomsFn,
      );

      return createElement(element, {
        ref,
        style: { ...style },
        ...otherProps,
        ...customProps,
        className: composeClassNames(className, atomsFn(atomProps)),
      });
    },
  );

  Box.displayName = "DessertBox";

  return Box;
}

const BaseBox = createBox({ atoms: sprinkles });

export type BoxProps<C extends ElementType = "div"> = Sprinkles &
  React.ComponentPropsWithRef<C> & {
    as?: C;
    innerRef?: React.Ref<HTMLElement>;
  };

export const Box = <C extends ElementType = "div">({
  innerRef,
  ...rest
}: BoxProps<C>) => {
  return <BaseBox ref={innerRef} {...rest} />;
};
