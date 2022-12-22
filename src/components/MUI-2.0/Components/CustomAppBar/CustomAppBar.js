import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import AppDrawer from "../AppDrawer/AppDrawer";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import HomeButton from "../Button/HomeButton/HomeButton";
import SearchButton from "../Button/SearchButton/SearchButton";
import ExploreButton from "../Button/ExploreButton/ExploreButton";
import NotificationButton from "../Button/NotificationButton/NotificationButton";
import RelationRequestButton from "../Button/RelationRequestButton/RelationRequestButton";
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function CustomAppBar(props) {
  console.log("custom App Bar");
  const { t } = useTranslation();
  const navigate = useNavigate();
  if (props.auth === true) {
    return (
      <Grid container>
        <React.Fragment>
          <CssBaseline />
          <HideOnScroll {...props}>
            <AppBar>
              <Toolbar sx={{ display: "flex" }}>
                <Box
                  sx={{ display: { xs: "flex", sm: "none" }, flexGrow: "1" }}
                >
                  <AppDrawer />
                </Box>
                <Box
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    flexGrow: "1",
                    justifyContent: "flex-start",
                  }}
                >
                  <Button color="secondary" onClick={() => navigate("/home")}>
                    <span>{t("display.helperText.texts.lifograf")}</span>
                  </Button>{" "}
                </Box>
                <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                  <HomeButton />
                </Box>
                <SearchButton />
                <ExploreButton />
                <NotificationButton />
                <RelationRequestButton />
                <ProfileIcon />
              </Toolbar>
            </AppBar>
          </HideOnScroll>
          <Toolbar />
        </React.Fragment>
      </Grid>
    );
  } else if (props.auth === false) {
    return (
      <Grid container>
        <React.Fragment>
          <CssBaseline />
          <HideOnScroll {...props}>
            <AppBar>
              <Toolbar sx={{ display: "flex" }}></Toolbar>
            </AppBar>
          </HideOnScroll>
          <Toolbar />
        </React.Fragment>
      </Grid>
    );
  }
}
