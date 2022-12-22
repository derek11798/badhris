import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { primaryBorder } from "../../Constants/styles/styles";
import { useTranslation } from "react-i18next";
import LgPersonality from "../Forms/LgPersonality";
const CreateLgPersonality = () => {
  const { t } = useTranslation();
  return (
    <Paper elevation={3} sx={primaryBorder}>
      <Box>
        <center>
          <Typography sx={{ py: 2 }} variant="h4">
            {t("display.helperText.texts.createLgPersonalityTitle")}
          </Typography>
        </center>
      </Box>
      <Box color={"primary"}>
        <LgPersonality />
      </Box>
    </Paper>
  );
};
export default CreateLgPersonality;
