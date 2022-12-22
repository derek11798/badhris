import { Box, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const NotificationButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Button color="secondary">
      <NotificationsIcon />
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        {t("display.helperText.button.notification")}
      </Box>
    </Button>
  );
};
export default NotificationButton;
