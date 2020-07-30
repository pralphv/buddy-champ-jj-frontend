import React, { useState } from "react";

import { Grid, makeStyles } from "@material-ui/core";

import CaptionText from "features/captionText/CaptionText";
import LoadingScreen from "features/loadingScreen/LoadingScreen";
import ChampionSuggest from "features/championSuggest/ChampionSuggest";
import WinRateTable from "features/winRateTable/WinRateTable";
import AllWinRateTable from "features/allWinRateTable/AllWinRateTable";
import RoleSelect from "features/roleSelect/RoleSelect";
import * as backend from "api/endPoints";
import * as apiTypes from "api/types";
import { useFetch, usePost, useIsMobile, useWindow } from "utils/customHooks";

const ROLES: string[] = ["Top", "Jungle", "Mid", "AD", "Support"];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function Home(): JSX.Element {
  const classes = useStyles();
  const isMobile: boolean = useIsMobile();
  const { width } = useWindow();
  const [data, loading]: [string[], boolean] = useFetch(
    backend.GET_CHAMPION_LIST
  );
  const [gameVersion, gameVersionLoading]: [string, boolean] = useFetch(
    backend.GET_GAME_VERSION
  );
  const [gameCount, gameCountLoading]: [string, boolean] = useFetch(
    backend.GET_GAME_COUNT
  );
  const [champion, setChampion] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [buddyRole, setBuddyRole] = useState<string>("");
  const [results, resultsLoading]: [
    apiTypes.WinRateInterface[],
    boolean
  ] = usePost(backend.POST_COMBINATION_RATE, {
    champion,
    role,
    buddyRole: buddyRole === role ? "" : buddyRole,
  });

  const screenWidth = isMobile ? width * 0.9 : width * 0.5;
  return (
    <div className={classes.root}>
      <LoadingScreen
        open={
          loading || resultsLoading || gameVersionLoading || gameCountLoading
        }
      />
      <div>
        <CaptionText>
          Game Version: {gameVersion?.split("-").join(".")}
        </CaptionText>
        <CaptionText>Region: Taiwan</CaptionText>
        <CaptionText>No. of games: {gameCount}</CaptionText>
        <br />
        <Grid
          container
          direction="row"
          justify="center"
          spacing={isMobile ? 0 : 10}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.form}
              spacing={2}
              style={{ width: screenWidth }}
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  className={classes.root}
                >
                  <Grid item xs={9}>
                    <ChampionSuggest
                      options={data || []}
                      champion={champion}
                      setChampion={setChampion}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <RoleSelect
                      roles={ROLES}
                      role={role}
                      setRole={setRole}
                      label="Role"
                      disabled={false}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <RoleSelect
                  roles={ROLES.filter((role_: string) => role_ !== role)}
                  role={buddyRole}
                  setRole={setBuddyRole}
                  label="Buddy"
                  disabled={role === ""}
                />
              </Grid>
            </Grid>
            <WinRateTable data={results || []} />
          </Grid>
          <Grid item style={{paddingTop: 50}}> 
            <AllWinRateTable />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
