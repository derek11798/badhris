import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuthentication } from "../../Functions/Api's/Api";
import AlertMessage from "../AlertMessage/AlertMessage";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(false);
  const onSuccessAuthentication = async (credentialResponse) => {
    let response = await googleAuthentication(
      credentialResponse.credential,
      null,
      setAlertMessage
    );
    if (response) navigate("/");
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          onSuccessAuthentication(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
        type="standard"
        shape="pill"
        logo_alignment="center"
        size="large"
        width="360px"
        text="continue_with "
      />
      {alertMessage && (
        <AlertMessage message={alertMessage} open={setAlertMessage} />
      )}
    </div>
  );
};
export default GoogleAuth;
