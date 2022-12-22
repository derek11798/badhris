import React from "react";
import { Grid } from "@mui/material";
import SignUpPage from "../UI/SignUpPage/SignUpPage";
const SignupScreen = () => {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={12} sm={6}>
        <SignUpPage />
      </Grid>
      <Grid item sm={6} sx={{ display: { xs: "none", sm: "view" } }}>
        hello
      </Grid>
    </Grid>
  );
};
export default SignupScreen;
