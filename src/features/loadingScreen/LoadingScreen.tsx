import React from "react";
import {
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 10000,
  },
}));

interface LoadingScreenProps {
  open: boolean;
}
export default function LoadingScreen({ open }: LoadingScreenProps):JSX.Element {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <CircularProgress color="inherit" />
        </Grid>
        <Grid item>
          <Typography color="textSecondary" variant="caption">This may take a while</Typography>
        </Grid>
      </Grid>
    </Backdrop>
  );
}
