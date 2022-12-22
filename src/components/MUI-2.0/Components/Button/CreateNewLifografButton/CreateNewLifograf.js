import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreateNewLifografButton = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Button
      variant="contained"
      sx={{ width: "100%", borderRadius: 8 }}
      onClick={() => navigate("/new/about")}
    >
      <AddIcon />
      <div>{t("display.helperText.texts.lifograf")}</div>
    </Button>
  );
};
export default CreateNewLifografButton;
