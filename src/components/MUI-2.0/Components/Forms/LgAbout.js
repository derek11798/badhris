import { Box, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  fieldType,
  genderDropdown,
  regularExpressions,
  titleDropdown,
  variant,
  yesNoDropdown,
} from "../../Constants/constant";
import ReactForms from "../ReactForms/ReactForms";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab/";
import { connect } from "react-redux";
import { postLgAbout } from "../../Functions/Api's/CreateLgApi/LgAboutApi";
import { logout } from "../../Functions/HelperFunction";
import ProfilePicUploadButton from "../ProfilePicWithUploadButton";
import { primaryBorder } from "../../Constants/styles/styles";
import { useNavigate } from "react-router-dom";
const LgAbout = (props) => {
  //-----------------------Declare constants Here-----------------------------//
  console.log("props.mode :", props.mode);
  console.log("props.relationship :", props.relationship);
  console.log("props.relatedTo :", props.relatedTo);

  const { t } = useTranslation();
  const navigate = useNavigate();
  let defaultValues = {
    title: props.mode === "edit" ? props.aboutLg.title : "",
    first_name: props.mode === "edit" ? props.aboutLg.first_name : "",
    last_name: props.mode === "edit" ? props.aboutLg.last_name : "",
    nickname: props.mode === "edit" ? props.aboutLg.nickname : "",
    gender: props.mode === "edit" ? props.aboutLg.gender : "",
    email_id:
      props.mode === "self"
        ? localStorage.getItem("emailId")
        : props.mode === "edit"
        ? props.aboutLg.email_id
        : "",
    lg_url: props.mode === "edit" ? props.aboutLg.lg_url : "",
    deceased:
      props.mode === "self"
        ? "No"
        : props.mode === "edit"
        ? props.aboutLg.deceased
        : "",
    short_desc: props.mode === "edit" ? props.aboutLg.short_desc : "",
    add_details: props.mode === "edit" ? props.aboutLg.add_details : "",
    base_relation:
      props.mode === "self"
        ? "Self"
        : props.mode === "new"
        ? props.relationship
        : props.mode === "edit"
        ? props.aboutLg.base_relation
        : "",
    base_lg_id:
      props.mode === "self"
        ? ""
        : props.mode === "new"
        ? props.relatedTo
        : props.mode === "edit"
        ? props.aboutLg.base_lg_id
        : "",
  };
  //-----------------------Declare Hooks Here-----------------------------//
  const [loading, setLoading] = useState(false);
  const [imageFlag, setImageFlag] = useState(false);
  const [croppedImage, setCroppedImage] = useState(false);

  let inputArray;
  const { handleSubmit, reset, setValue, control, getValues, formState } =
    useForm({
      mode: "onChange",
      defaultValues,
    });
  useEffect(() => {
    defaultValues = {
      title: props.mode === "edit" ? props.aboutLg.title : "",
      first_name: props.mode === "edit" ? props.aboutLg.first_name : "",
      last_name: props.mode === "edit" ? props.aboutLg.last_name : "",
      nickname: props.mode === "edit" ? props.aboutLg.nickname : "",
      gender: props.mode === "edit" ? props.aboutLg.gender : "",
      email_id:
        props.mode === "self"
          ? localStorage.getItem("emailId")
          : props.mode === "edit"
          ? props.aboutLg.email_id
          : "",
      lg_url: props.mode === "edit" ? props.aboutLg.lg_url : "",
      deceased:
        props.mode === "self"
          ? "No"
          : props.mode === "edit"
          ? props.aboutLg.deceased
          : "",
      short_desc: props.mode === "edit" ? props.aboutLg.short_desc : "",
      add_details: props.mode === "edit" ? props.aboutLg.add_details : "",
      base_relation:
        props.mode === "self"
          ? "Self"
          : props.mode === "new"
          ? props.relationship
          : props.mode === "edit"
          ? props.aboutLg.base_relation
          : "",
      base_lg_id:
        props.mode === "self"
          ? ""
          : props.mode === "new"
          ? props.relatedTo
          : props.mode === "edit"
          ? props.aboutLg.base_lg_id
          : "",
    };
  }, [props.mode]);
  //-----------------------Declare Functions Here-----------------------------//
  const formatData = async (data) => {
    if (data.deceased === "Yes") props.deceased(true);
    else {
      props.deceased(false);
    }
    const formData = Object.assign(data, {
      visibility: "Public",
    });
    console.log("image flag before posting", imageFlag);
    console.log("image  before posting", croppedImage);
    let response = await postLgAbout(
      formData,
      setLoading,
      imageFlag,
      croppedImage
    );
    console.log("postLgAbout Response :", response);
    if (response) {
      props.pagination(true);
      props.currentPage(2);
      props.setMode("edit");
    }
  };

  const SelfLg = () => {
    if (props.mode === "self") {
      inputArray = inputFieldArray.filter(
        (item) => item.name !== "email_id" && item.name !== "deceased"
      );
      // if (!localStorage.getItem("emailId")) logout();
    } else {
      inputArray = inputFieldArray;
    }
  };
  const newLg = () => {
    if (props.mode === "new" && props.ownedLg.length > 0) {
      inputArray = inputFieldArray;
    } else if (props.ownedLg.length === 0) {
      // navigate("/home");
    }
  };
  const editLg = () => {
    if (props.mode === "edit" && props.lgId !== "") {
      inputArray = inputFieldArray;
    } else if (props.lgId === "") {
      navigate("/home");
    }
  };
  //-----------------------Declare useState Here-----------------------------//

  const inputFieldArray = [
    {
      fieldType: fieldType.DropDown,
      xs: 12,
      sm: 4,
      md: 4,
      name: "title",
      rules: {
        required: {
          value: true,
          message: t("display.helperText.errors.fieldIsRequired"),
        },
      },
      control: control,
      label: "Title",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: true,
      variant: variant,
      disabled: false,
      select: true,
      inputValue: titleDropdown.sort(),
    },
    {
      fieldType: fieldType.TextField,
      xs: 12,
      sm: 4,
      md: 4,
      name: "first_name",
      rules: {
        required: {
          value: true,
          message: t("display.helperText.errors.fieldIsRequired"),
        },
        maxLength: {
          value: 45,
          message: t("display.helperText.errors.userNameValidationErr"),
        },
      },
      control: control,
      label: "First Name",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 46,
      required: true,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.TextField,
      xs: 12,
      sm: 4,
      md: 4,
      name: "last_name",
      rules: {
        required: {
          value: true,
          message: t("display.helperText.errors.fieldIsRequired"),
        },
        maxLength: {
          value: 45,
          message: t("display.helperText.errors.userNameValidationErr"),
        },
      },
      control: control,
      label: "Last Name",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 46,
      required: true,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.TextField,
      xs: 12,
      sm: 4,
      md: 4,
      name: "nickname",
      rules: {
        required: {
          value: true,
          message: t("display.helperText.errors.fieldIsRequired"),
        },
        maxLength: {
          value: 45,
          message: t("display.helperText.errors.userNameValidationErr"),
        },
      },
      control: control,
      label: "Nick Name",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 46,
      required: true,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.DropDown,
      xs: 12,
      sm: 4,
      md: 4,
      name: "gender",
      rules: {
        required: {
          value: true,
          message: t("display.helperText.errors.fieldIsRequired"),
        },
      },
      control: control,
      label: "Gender",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: true,
      variant: variant,
      disabled: false,
      select: true,
      inputValue: genderDropdown,
    },
    {
      fieldType: fieldType.TextField,
      xs: 12,
      sm: 4,
      md: 4,
      name: "email_id",
      rules: {
        pattern: {
          value: regularExpressions.email,
          message: t("display.helperText.errors.emailValidationErr"),
        },
      },
      control: control,
      label: "Email",
      type: "email",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.TextField,
      xs: 12,
      sm: 4,
      md: 4,
      name: "lg_url",
      rules: {
        required: {
          value: true,
          message: t("display.helperText.errors.fieldIsRequired"),
        },
        maxLength: {
          value: 45,
          message: t("display.helperText.errors.userNameValidationErr"),
        },
        minLength: {
          value: 4,
          message: t("display.helperText.errors.userNameValidationErr"),
        },
      },
      control: control,
      label: "Unique Id",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 46,
      required: true,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.DropDown,
      xs: 12,
      sm: 4,
      md: 4,
      name: "deceased",
      rules: {
        required: {
          value: true,
          message: t("display.helperText.errors.fieldIsRequired"),
        },
      },
      control: control,
      label: "Deseased",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: true,
      variant: variant,
      disabled: false,
      select: true,
      inputValue: yesNoDropdown,
    },
    {
      fieldType: fieldType.AutoSizeTextFields,
      xs: 12,
      sm: 12,
      md: 12,
      name: "short_desc",
      rules: {
        required: {
          value: true,
          message: t("display.helperText.errors.fieldIsRequired"),
        },
        maxLength: {
          value: 250,
          message: t("display.helperText.errors.userNameValidationErr"),
        },
      },
      control: control,
      label: "Short Intro/Quote",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 250,
      required: true,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.AutoSizeTextFields,
      xs: 12,
      sm: 12,
      md: 12,
      name: "add_details",
      rules: {
        maxLength: {
          value: 1000,
          message: t("display.helperText.errors.userNameValidationErr"),
        },
      },
      control: control,
      label: "Add details",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 250,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
    },
  ];
  if (props.mode === "self") {
    SelfLg();
  } else if (props.mode === "new") {
    newLg();
  } else if (props.mode === "edit") {
    editLg();
  }
  return (
    <Paper elevation={3} sx={primaryBorder}>
      <Box>
        <center>
          <Typography sx={{ py: 2 }} variant="h4">
            {t("display.helperText.texts.createLgAboutTitle")}
          </Typography>
          <ProfilePicUploadButton
            mode={props.mode}
            width={120}
            height={120}
            imageFlag={setImageFlag}
            croppedImage={setCroppedImage}
          />
        </center>
      </Box>
      <Box
        sx={{ p: 2 }}
        component={"form"}
        onSubmit={handleSubmit((data) => formatData(data))}
      >
        <ReactForms input={inputArray} />
        <LoadingButton
          variant="contained"
          type={"submit"}
          sx={{ borderRadius: 8, width: "100%", my: 2, px: 2 }}
          loading={loading}
        >
          {t("display.helperText.button.save")}
        </LoadingButton>
      </Box>
    </Paper>
  );
};
const mapStateToProp = (state) => {
  return {
    lgId: state.commonState.lgId,
    ownedLg: state.commonState.ownedLg,
    aboutLg: state.commonState.aboutLg,
  };
};
export default connect(mapStateToProp)(LgAbout);
