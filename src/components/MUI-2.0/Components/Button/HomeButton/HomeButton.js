import { Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const HomeButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Button color="secondary" onClick={() => navigate("/home")}>
      <HomeIcon />
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        {t("display.helperText.button.home")}
      </Box>
    </Button>
  );
};
export default HomeButton;
