import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import CreateNewLifografButton from "../../Button/CreateNewLifografButton/CreateNewLifograf";
import CustomAppBar from "../../CustomAppBar/CustomAppBar";
import LeftNavigation from "../../LeftNavigation/LeftNavigation";
import RightNavigation from "../../RightNavigation/RightNavigation";
import { Route, Routes } from "react-router-dom";
import CreateSelfLg from "../../Screens/CreateSelfLg";

const Home = () => {
  return (
    <div>
      {/* <CustomAppBar /> */}
      <Grid container sx={{ mt: 5 }}>
        <Grid
          item
          xs={0}
          sm={3}
          sx={{
            display: {
              xs: "none",
              sm: "flex",
              height: "100%",
              overflowY: "auto",
            },
            justifyContent: "center",
          }}
        >
          <LeftNavigation />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Routes>
            <Route
              exact
              path="/new/*"
              element={<CreateSelfLg mode={"new"} />}
            />
          </Routes>{" "}
        </Grid>
        <Grid
          item
          xs={0}
          sm={3}
          sx={{
            display: {
              xs: "none",
              sm: "flex",
              height: "100%",
              overflowY: "auto",
            },
            justifyContent: "center",
          }}
        >
          <RightNavigation />
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;
