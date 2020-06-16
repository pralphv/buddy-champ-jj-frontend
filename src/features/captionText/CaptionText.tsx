import React from "react";

import { Typography } from "@material-ui/core";

interface CaptionTextProps {
  children: React.ReactNode;
}

export default function CaptionText({
  children,
}: CaptionTextProps): JSX.Element {
  return (
    <Typography
      align="right"
      variant="body2"
      color="textSecondary"
      style={{ fontSize: "0.75em" }}
    >
      {children}
    </Typography>
  );
}
