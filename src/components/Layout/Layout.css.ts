import { style } from "@vanilla-extract/css";
import { breakpoints, minMediaQuery } from "../../styles/breakpoints";
import { STILL_WIDTH } from "../../styles/sizes.css";

export const headerLayoutStyle = style({
  flexDirection: "column",
  textAlign: "center",

  "@media": {
    [minMediaQuery("desktop")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      textAlign: "left",
      position: "sticky",
      flexWrap: "wrap",
      top: "16px",
      zIndex: 10000,
    },
  },
});

export const skipToMainContentStyle = style({
  left: "50%",
  margin: "0 auto",
  position: "absolute",
  top: "2px",
  transform: "translate(-50%, calc(-100% - 2px))",
  zIndex: 100000,

  [":focus"]: {
    transform: "translate(-50%, 0%)",
  },
});
