import { Box, Button } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const ExploreButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Button color="secondary">
      <ExploreIcon />
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        {t("display.helperText.button.explore")}
      </Box>
    </Button>
  );
};
export default ExploreButton;
