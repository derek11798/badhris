import { Box, Paper } from "@mui/material";
import React from "react";
import "./styles.css";
import GoogleAuth from "../../Google/GoogleLogin";
import { Link } from "react-router-dom";
import Login from "../../Forms/Login/Login";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  console.log("Login");
  const { t } = useTranslation();
  return (
    <Box sx={{ marginTop: { xs: 0, sm: "5%" } }}>
      <center>
        <div className="container">
          <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
            <div>
              <div>
                <h1>{t("display.helperText.texts.login")}</h1>
                <h6>{t("display.helperText.texts.loginHeader")}</h6>
              </div>
              <Login />
              <div className="seperator">
                <span>or</span>
              </div>
              <div style={{ margin: "12px 0px" }}>
                <GoogleAuth />
              </div>
            </div>
          </Paper>
          <div style={{ margin: "24px 0px" }}>
            <h6>
              {t("display.helperText.texts.loginFooter")}
              <Link to="/signup">{t("display.helperText.button.signup")}</Link>
            </h6>
          </div>
        </div>
      </center>
    </Box>
  );
};
export default LoginPage;
