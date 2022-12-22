import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import SignUp from "../../Forms/SignUp/SignUp";
import "./styles.css";
import GoogleAuth from "../../Google/GoogleLogin";
import { Link } from "react-router-dom";
import ConfirmEmail from "../../ConfirmEmail/ConfirmEmail";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  console.log("Signup");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const { t } = useTranslation();
  if (!verifyEmail) {
    return (
      <Box sx={{ marginTop: { xs: 0, sm: "5%" } }}>
        <center>
          <div className="container">
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
              <div>
                <div>
                  <h1>{t("display.helperText.texts.signup")}</h1>
                  <h6>{t("display.helperText.texts.signupHeader")}</h6>
                </div>
                <SignUp verifyEmail={setVerifyEmail} />
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
                {t("display.helperText.texts.signupFooter")}
                <Link to="/">{t("display.helperText.button.login")}</Link>
              </h6>
            </div>
          </div>
        </center>
      </Box>
    );
  } else if (verifyEmail) {
    return (
      <Box
        sx={{
          marginTop: { xs: "2%", sm: "5%" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ConfirmEmail verifyEmail={verifyEmail} />
      </Box>
    );
  }
};
export default SignUpPage;
