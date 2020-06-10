import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import { WinRateInterface } from "api/types";

interface WinRateTableProps {
  data: WinRateInterface[];
}

export default function WinRateTable({ data }: WinRateTableProps): JSX.Element {
  const [minGames, setMinGames] = React.useState<number>(120);
  data = data.filter((obj: WinRateInterface) => obj.total >= minGames);
  return (
    <div>
      <Typography gutterBottom>Min. Games</Typography>
      <Slider
        value={minGames}
        onChange={(e: any, newValue: number | number[]) =>
          setMinGames(newValue as number)
        }
        aria-labelledby="continuous-slider"
        min={1}
        max={1000}
        valueLabelDisplay="auto"
        style={{ width: "50%" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Win Rate</TableCell>
              <TableCell align="right">No. of Games</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(Math.max(data.length - 10, 1))
              .map((obj: WinRateInterface, i: number) => (
                <TableRow hover tabIndex={-1} key={i}>
                  <TableCell component="th" scope="row">
                    {obj.buddyChamp}
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
