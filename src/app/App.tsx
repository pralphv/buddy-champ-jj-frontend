import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./App.css";
import MainLayout from "../layouts/mainLayout";
import { THEME } from "./theme";

export default function App() {
  return (
      <ThemeProvider theme={THEME}>
        <CssBaseline />
        <MainLayout />
      </ThemeProvider>
  );
}
