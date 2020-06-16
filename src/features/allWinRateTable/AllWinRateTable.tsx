import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";

import { usePost } from "utils/customHooks";
import * as backend from "api/endPoints";
import { AllWinRateInterface } from "api/types";

import LoadingScreen from "features/loadingScreen/LoadingScreen";
import CombinationSelect from "features/combinationSelect/CombinationSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textPadding: {
    paddingRight: theme.spacing(1),
  },
  icon:{
    fontSize: "0.75em",
    color: theme.palette.text.secondary
  }

}));

interface FormatObjectType {
  role: string;
  champion: string;
}

function formatObject(obj: AllWinRateInterface): FormatObjectType[] {
  let objects: any = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (key !== "total" && key !== "winRate") {
      objects.push({
        role: key,
        champion: value,
      });
    }
  });
  return objects;
}

export default function AllWinRateTable(): JSX.Element {
  const classes = useStyles();

  const [combination, setCombination] = useState<string>("all");
  const [data, loadingData]: [AllWinRateInterface[], boolean] = usePost(
    backend.GET_COMBINATION_RATE_FOR_ALL,
    {
      combination,
    }
  );

  return (
    <div>
      <LoadingScreen open={loadingData} />
      <TableContainer component={Paper} className={classes.root}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <CombinationSelect
                  value={combination}
                  setValue={setCombination}
                  disabled={false}
                />
              </TableCell>
              <TableCell align="right">Win Rate</TableCell>
              <TableCell align="right">
                Games
                <sup>

                <Tooltip title="200 games is minimum">
                  <HelpIcon className={classes.icon}/>
                </Tooltip>
                </sup>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((obj: AllWinRateInterface, i: number) => (
                <TableRow hover tabIndex={-1} key={i}>
                  <TableCell component="th" scope="row">
                    {formatObject(obj).map((champObject: FormatObjectType) => (
                      <div key={champObject.champion}>
                        <Typography
                          display="inline"
                          className={classes.textPadding}
                        >
                          {champObject.champion}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {champObject.role}
                        </Typography>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {(obj.winRate * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell align="right">{obj.total}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
