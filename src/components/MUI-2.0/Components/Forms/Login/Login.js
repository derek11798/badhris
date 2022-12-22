import React from "react";
import { useEffect, useState } from "react";
import helperText from "../../../Constants/helperText.json";
import {
  variant,
  fieldType,
  regularExpressions,
} from "../../../Constants/constant";
import { LoadingButton } from "@mui/lab/";
import { loginForm_Api } from "../../../Functions/Api's/Api";
import ReactForms from "../../ReactForms/ReactForms";
import Box from "@mui/system/Box";
import { useForm, Controller } from "react-hook-form";
import store from "../../../../../redux/store/store";
import { alertAction } from "../../../../../redux/actions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const defaultValues = {};

const Login = (props) => {
  // console.log("helper Text Json", helperText.errors);
  //-----------------------Declare useState Here-----------------------------//
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, reset, setValue, control, getValues, formState } =
    useForm({
      mode: "onChange",
    });
  const { t } = useTranslation();

  //-----------------------Declare Functions Here-----------------------------//
  const formSubmit = async (data) => {
    console.log("form submit called");
    if (formState.errors) {
      let response = await loginForm_Api(data, setLoading);
      if (response) navigate("/");
    }
  };

  //-----------------------Declare Constants Here-----------------------------//
  const inputFieldArray = [
    {
      fieldType: fieldType.TextField,
      xs: 12,
      sm: 12,
      md: 12,
      name: "emailid",
      control: control,
      rules: {
        required: {
          value: true,
          message: t("display.helperText.errors.fieldIsRequired"),
        },
        pattern: {
          value: regularExpressions.email,
          message: t("display.helperText.errors.emailValidationErr"),
        },
      },
      label: t("display.helperText.inputField.email"),
      type: "email",
      inputValue: ["1", "2", "3", "4", "5", "6"],
      freeSolo: false,
      value: "",
      maxLength: null,
      required: true,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.TextField,
      xs: 12,
      sm: 12,
      md: 12,
      name: "password",
      control: control,
      label: t("display.helperText.inputField.password"),
      type: "password",
      rules: {
        required: {
          value: true,
          message: t("display.helperText.errors.fieldIsRequired"),
        },
        minLength: {
          value: 6,
          message: t("display.helperText.errors.properpassword"),
        },
      },
      value: "",
      maxLength: null,
      required: true,
      variant: variant,
      disabled: false,
      select: false,
    },
  ];

  //-----------------------Declare useEffect Here-----------------------------//

  return (
    <div>
      <Box
        component={"form"}
        onSubmit={handleSubmit((data) => formSubmit(data))}
      >
        <ReactForms input={inputFieldArray} />
        {/* <p>{t("display.helperText.texts.termsAndCondition")}</p> */}
        <LoadingButton
          variant="contained"
          type={"submit"}
          sx={{ borderRadius: 8, width: "100%", my: 2 }}
          loading={loading}
        >
          {t("display.helperText.button.login")}
        </LoadingButton>
      </Box>
    </div>
  );
};
export default Login;
