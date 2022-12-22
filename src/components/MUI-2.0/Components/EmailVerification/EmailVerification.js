import React, { useEffect } from "react";
import { useParams, useNavigate, useMatch } from "react-router-dom";
import { verifyEmail_Api } from "../../Functions/Api's/Api";

const EmailVerification = () => {
  //-----------------------Declare constants Here-----------------------------//
  const urlParams = useParams();
  const navigate = useNavigate();
  //-----------------------Declare functions Here-----------------------------//
  const verifyEmail = async (urlParams) => {
    let response = await verifyEmail_Api(urlParams.urlParams);
    if (response) navigate("/");
  };
  //-----------------------Declare useEffect Here-----------------------------//
  useEffect(() => {
    verifyEmail(urlParams);
  }, []);

  return null;
};
export default EmailVerification;
