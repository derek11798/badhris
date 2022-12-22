import React from "react";
import { Grid } from "@mui/material";
import LoginPage from "../UI/LoginPage/LoginPage";
const LoginScreen = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <LoginPage />
      </Grid>
      <Grid item sm={6} sx={{ display: { xs: "none", sm: "view" } }}>
        hello
      </Grid>
    </Grid>
  );
};
export default LoginScreen;
