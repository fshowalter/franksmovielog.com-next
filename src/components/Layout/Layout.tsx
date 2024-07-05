/* eslint-env browser, node */

import React from "react";
import { composeClassNames } from "@/styles/composeClassNames";
import "@/styles/global.css";
import { Box } from "@/components/Box";
import { Footer } from "./Footer";
import {
  bandStickyStyle,
  headerLayoutStyle,
  pageCanvasStyle,
  skipToMainContentStyle,
} from "./Layout.css";
import { Mast } from "./Mast";
import { ripNotComingSoonBackgroundImageStyle } from "./backgroundImage.css";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <Box
        as="a"
        className={skipToMainContentStyle}
        href="#content"
        paddingX={24}
        paddingY={8}
        backgroundColor="subtle"
        color="accent"
        textAlign="center"
      >
        Skip to content
      </Box>
      <div
        className={
          "bg-rip-notcomingsoon max-w-canvas desktop:sticky desktop:top-0 desktop:z-50 mx-auto min-h-4 w-full"
        }
      />

      <Box
        backgroundColor="default"
        className={pageCanvasStyle}
        display="flex"
        flexDirection="column"
      >
        <Mast
          rowGap={24}
          paddingX="pageMargin"
          paddingY={{ default: 24, desktop: 32 }}
          alignItems="center"
          boxShadow="borderBottom"
          backgroundColor="default"
          columnGap={24}
          className={headerLayoutStyle}
        />
        <Box flexGrow={1} id="content">
          {children}
        </Box>
        <Footer
          paddingX="pageMargin"
          paddingY={32}
          rowGap={24}
          alignItems="center"
          flexDirection="column"
          className={ripNotComingSoonBackgroundImageStyle}
        />
      </Box>
    </div>
  );
}
