import { Box, Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const RelationRequestButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Button color="secondary">
      <PeopleIcon />
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        {t("display.helperText.button.relationRequest")}
      </Box>
    </Button>
  );
};
export default RelationRequestButton;
