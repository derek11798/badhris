import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import "./styles.css";
import CreateNewLifografButton from "../Button/CreateNewLifografButton/CreateNewLifograf";
const LeftNavigation = () => {
  const { t } = useTranslation();
  const styles = {
    borderRadius: 8,
    width: { sm: "100%" },
    mb: { xs: 1, sm: 3 },
  };
  return (
    <Box sx={{ width: { sm: "80%" } }}>
      <CreateNewLifografButton />
      <Button sx={styles}>
        <AddCircleOutlineOutlinedIcon />
        <Typography>{t("display.helperText.button.addLifeEvent")}</Typography>
      </Button>
      <Button sx={styles}>
        <AddCircleOutlineOutlinedIcon />
        <Typography>{t("display.helperText.button.addLifeEvent")}</Typography>
      </Button>
      <Button sx={styles}>
        <AddCircleOutlineOutlinedIcon />
        <Typography>{t("display.helperText.button.addLifeEvent")}</Typography>
      </Button>
      <Button sx={styles}>
        <AddCircleOutlineOutlinedIcon />
        <Typography>{t("display.helperText.button.addLifeEvent")}</Typography>
      </Button>
    </Box>
  );
};
export default LeftNavigation;
