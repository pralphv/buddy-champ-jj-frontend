import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

interface RoleSelectProps {
  roles: string[];
  role: string;
  setRole: (role: string) => void;
  label: string;
  disabled: boolean;
}

export default function RoleSelect({
  roles,
  role,
  setRole,
  label,
  disabled,
}: RoleSelectProps): JSX.Element {
  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={role}
        onChange={(e: any) => setRole(e.target.value)}
        label="Role"
        disabled={disabled}
        style={{ width: "110px" }}
      >
        {roles.map((role: string) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
