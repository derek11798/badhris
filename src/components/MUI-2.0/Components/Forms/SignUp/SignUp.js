import React from "react";
import { useEffect, useState } from "react";
import helperText from "../../../Constants/helperText.json";
import {
  variant,
  fieldType,
  regularExpressions,
} from "../../../Constants/constant";
import { LoadingButton } from "@mui/lab/";
import { signUpForm_Api } from "../../../Functions/Api's/Api";
import ReactForms from "../../ReactForms/ReactForms";
import Box from "@mui/system/Box";
import { useForm, Controller } from "react-hook-form";
import store from "../../../../../redux/store/store";
import { alertAction } from "../../../../../redux/actions";
import { useTranslation } from "react-i18next";

const defaultValues = {};

const SignUp = (props) => {
  // console.log("helper Text Json", helperText.errors);
  //-----------------------Declare useState Here-----------------------------//
  const [loading, setLoading] = useState(false);
  const { handleSubmit, reset, setValue, control, getValues, formState } =
    useForm({
      mode: "onChange",
    });
  const { t } = useTranslation();

  //-----------------------Declare Functions Here-----------------------------//
  const formSubmit = async (data) => {
    console.log("form submit called");
    if (formState.errors) {
      let response = await signUpForm_Api(data, setLoading);
      try {
        let responseJSON = await response.json();
        if (!responseJSON.error) {
          store.dispatch(alertAction(responseJSON));
          props.verifyEmail(responseJSON);
          console.log("Api responseJSON", responseJSON);
        } else {
          store.dispatch(alertAction(responseJSON));
          console.error(responseJSON);
        }
      } catch (e) {
        store.dispatch(
          alertAction({
            error: true,
            message: helperText.errors.apiFailed,
          })
        );
        console.error(e);
      }
    }
  };

  //-----------------------Declare Constants Here-----------------------------//
  const inputFieldArray = [
    {
      fieldType: fieldType.TextField,
      xs: 12,
      sm: 12,
      md: 12,
      name: "uname",
      rules: {
        required: { value: true, message: helperText.errors.fieldIsRequired },
        maxLength: {
          value: 45,
          message: helperText.errors.userNameValidationErr,
        },
      },
      control: control,
      label: "User Name",
      type: "text",
      value: "",
      maxLength: 46,
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
      name: "emailid",
      control: control,
      rules: {
        required: { value: true, message: helperText.errors.fieldIsRequired },
        pattern: {
          value: regularExpressions.email,
          message: helperText.errors.emailValidationErr,
        },
      },
      label: "Email",
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
      label: "Password",
      type: "password",
      rules: {
        required: { value: true, message: helperText.errors.fieldIsRequired },
        pattern: {
          value: regularExpressions.password,
          message: helperText.errors.passwordValidationErr,
        },
      },
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
      name: "cpassword",
      control: control,
      label: "Confirm Password",
      type: "password",
      value: "",
      rules: {
        required: { value: true, message: helperText.errors.fieldIsRequired },
        validate: {
          positive: (value) =>
            getValues("password") === value ||
            helperText.errors.passwordMissMatchErr,
        },
      },
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
        <p>{t("display.helperText.texts.termsAndCondition")}</p>
        <LoadingButton
          variant="contained"
          type={"submit"}
          sx={{ borderRadius: 8, width: "100%", my: 2 }}
          loading={loading}
        >
          {t("display.helperText.button.signup1")}
        </LoadingButton>
      </Box>
    </div>
  );
};
export default SignUp;
