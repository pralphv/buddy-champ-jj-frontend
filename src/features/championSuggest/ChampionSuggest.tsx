import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface ChampionSuggestProps {
  options: string[];
  champion: string;
  setChampion: (champion: string) => void;
}

export default function ChampionSuggest({
  options,
  champion,
  setChampion,
}: ChampionSuggestProps):JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <Autocomplete
      value={champion}
      onChange={(event, newValue) => {
        if (newValue) {
          setChampion(newValue);
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label="Champion" variant="outlined" />
      )}
    />
  );
}
