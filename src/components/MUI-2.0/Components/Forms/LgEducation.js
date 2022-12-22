import { Box } from "@mui/material";
import React, { useState } from "react";
import {
  fieldType,
  variant,
  education,
  education_Area,
  visiblity,
  Api,
} from "../../Constants/constant";
import ReactForms from "../ReactForms/ReactForms";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab/";
import { autoCompleteDropdownValidation } from "../../Functions/HelperFunction_validation";
import { connect } from "react-redux";
import { updateLgApi } from "../../Functions/Api's/CreateLgApi/updateLgApi";

const LgEducation = (props) => {
  //-----------------------Declare constants Here-----------------------------//
  const { t } = useTranslation();
  const defaultValues = {
    edu_lvl: "",
    edu_area: [],
    edu_details: "",
    main_occupation: [],
    sec_occupation: [],
    occu_details: "",
  };
  //-----------------------Declare Hooks Here-----------------------------//
  const [loading, setLoading] = useState(false);
  const { handleSubmit, reset, setValue, control, getValues, formState } =
    useForm({
      mode: "onChange",
      defaultValues,
    });
  //-----------------------Declare Functions Here-----------------------------//
  const formatData = (data) => {
    data.edu_area = data.edu_area.join("|");
    data.main_occupation = data.main_occupation.join("|");
    data.sec_occupation = data.sec_occupation.join("|");
    let formData = Object.assign(data, {
      lg_id: props.lgId,
    });
    updateLgApi(Api.lgEducation, formData, setLoading);
  };

  //-----------------------Declare useState Here-----------------------------//

  const inputFieldArray = [
    {
      fieldType: fieldType.Suggestion,
      xs: 12,
      sm: 4,
      md: 4,
      name: "edu_lvl",
      freeSolo: false,
      rules: {
        validate: (value) =>
          autoCompleteDropdownValidation(value, education) ||
          t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Education Level",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: education.sort(),
    },
    {
      fieldType: fieldType.Chip,
      xs: 12,
      sm: 4,
      md: 4,
      name: "edu_area",
      freeSolo: false,
      rules: {
        // validate: (value) =>
        //   value === undefined ||
        //   t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Education Area",
      type: "text",
      value: [],
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: education_Area,
    },
    {
      fieldType: fieldType.AutoSizeTextFields,
      xs: 12,
      sm: 12,
      md: 12,
      name: "edu_details",
      freeSolo: false,
      rules: {},
      control: control,
      label: "Educational Details",
      type: "text",
      value: [],
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.Chip,
      xs: 12,
      sm: 4,
      md: 4,
      name: "main_occupation",
      freeSolo: true,
      rules: {},
      control: control,
      label: "Occupational Details",
      type: "text",
      value: [],
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: [],
    },
    {
      fieldType: fieldType.Chip,
      xs: 12,
      sm: 4,
      md: 4,
      name: "sec_occupation",
      freeSolo: true,
      rules: {},
      control: control,
      label: "Secondary Details",
      type: "text",
      value: [],
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: [],
    },
    {
      fieldType: fieldType.AutoSizeTextFields,
      xs: 12,
      sm: 12,
      md: 12,
      name: "occu_details",
      freeSolo: false,
      rules: {},
      control: control,
      label: "Occupational Details",
      type: "text",
      value: [],
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.DropDown,
      xs: 12,
      sm: 4,
      md: 4,
      freeSolo: false,
      name: "visibility",
      rules: {},
      control: control,
      label: "Visiblity",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: true,
      inputValue: visiblity,
    },
  ];
  return (
    <Box
      sx={{ p: 2 }}
      component={"form"}
      onSubmit={handleSubmit((data) => formatData(data))}
    >
      <ReactForms input={inputFieldArray} />
      <LoadingButton
        variant="contained"
        type={"submit"}
        sx={{ borderRadius: 8, width: "100%", my: 2 }}
        loading={loading}
      >
        {t("display.helperText.button.save")}
      </LoadingButton>
    </Box>
  );
};
const mapStateToProp = (state) => {
  return {
    lgId: state.commonState.lgId,
  };
};
export default connect(mapStateToProp)(LgEducation);
