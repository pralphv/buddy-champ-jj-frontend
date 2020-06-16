import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

interface CombinationSelectProps {
  value: string;
  setValue: (role: string) => void;
  disabled: boolean;
}

const COMBINATIONS = [
  "all",
  "ad-jg",
  "ad-mid",
  "ad-sup",
  "ad-top",
  "jg-mid",
  "jg-sup",
  "jg-top",
  "mid-sup",
  "mid-top",
  "sup-top",
];

export default function CombinationSelect({
  value,
  setValue,
  disabled,
}: CombinationSelectProps): JSX.Element {
  return (
    <FormControl >
      <Select
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        label="Combination"
        disabled={disabled}
        style={{ width: "110px" }}
        disableUnderline 
      >
        {COMBINATIONS.map((combination_: string) => (
          <MenuItem key={combination_} value={combination_}>
            {combination_}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
