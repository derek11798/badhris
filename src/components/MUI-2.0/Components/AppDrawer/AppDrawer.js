import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LgOwned from "../LgOwned/LgOwned";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Button } from "@mui/material";
import LeftNavigation from "../LeftNavigation/LeftNavigation";
import Box from "@mui/material/Box";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function AppDrawer(props) {
  console.log("App Drawer");
  const [appDrawer, setAppDrawer] = React.useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <IconButton color="secondary" onClick={() => setAppDrawer(!appDrawer)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        // sx={{ width: "60%" }}
        // hysteresis={0.6}
        anchor={"left"}
        open={appDrawer}
        onClose={() => setAppDrawer(false)}
        onOpen={() => setAppDrawer(true)}
      >
        <Box>
          <Button sx={{ width: "100%" }} onClick={() => navigate("/")}>
            <span to={"/"}>{t("display.helperText.texts.lifograf")}</span>
          </Button>{" "}
          {<LgOwned />}
          {<LgOwned />}
          {<LeftNavigation />}
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
