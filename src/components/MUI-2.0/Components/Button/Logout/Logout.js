import React from "react";
import store from "../../../../../redux/store/store";
import { userIdAction } from "../../../../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
const Logout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logout = () => {
    console.log("logout function");
    localStorage.clear();
    store.dispatch(userIdAction(""));
  };

  return (
    <Button onClick={() => logout()}>
      {t("display.helperText.button.logout")}
    </Button>
  );
};
export default Logout;
