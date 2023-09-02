import * as React from "react";
import { AppBar } from "react-admin";
import Typography from "@mui/material/Typography";


export const MyAppBar = (props) => (
  <AppBar {...props}>
    <Typography variant="h6" color="inherit" id="react-admin-title" />
  </AppBar>
);
