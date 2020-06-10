import React from "react";

import Grid from "@material-ui/core/Grid";


export interface NavigationProps {
  children: React.ReactNode;
}

export default function Navigation({ children }: NavigationProps): JSX.Element {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      {children}
    </Grid>
  );
}
