import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { primaryBorder } from "../../Constants/styles/styles";
import LgAbout from "../Forms/LgAbout";
import { useTranslation } from "react-i18next";
import ProfilePicUploadButton from "../ProfilePicWithUploadButton";
const CreateLgAbout = (props) => {
  const { t } = useTranslation();
  const [imageParams, setImageParams] = useState();
  return (
    <Paper elevation={3} sx={primaryBorder}>
      <Box>
        <center>
          <Typography sx={{ py: 2 }} variant="h4">
            {t("display.helperText.texts.createLgAboutTitle")}
          </Typography>
          <ProfilePicUploadButton
            mode={"lgUpload"}
            imageParams={setImageParams}
            width={120}
            height={120}
          />
        </center>
      </Box>
      <Box color={"primary"}>
        <LgAbout imageParams={imageParams} mode={props.mode} />
      </Box>
    </Paper>
  );
};
export default CreateLgAbout;
