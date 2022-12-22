import { Box } from "@mui/material";
import React, { useState } from "react";
import {
  fieldType,
  variant,
  visiblity,
  bloodGroup,
  physicalActivity,
  smoking,
  Api,
} from "../../Constants/constant";
import ReactForms from "../ReactForms/ReactForms";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab/";
import { autoCompleteDropdownValidation } from "../../Functions/HelperFunction_validation";
import { connect } from "react-redux";
import { updateLgApi } from "../../Functions/Api's/CreateLgApi/updateLgApi";

const LgHealth = (props) => {
  //-----------------------Declare constants Here-----------------------------//
  const { t } = useTranslation();
  const defaultValues = {
    blood_group: "",
    physical_activity: "",
    chronic_illness: [],
    smoking: "",
    drinking: "",
    add_details: "",
    visibility: "",
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
    data.chronic_illness = data.chronic_illness.join("|");
    let formData = Object.assign(data, {
      lg_id: props.lgId,
    });
    updateLgApi(Api.lgHealth, formData, setLoading);
  };

  //-----------------------Declare useState Here-----------------------------//

  const inputFieldArray = [
    {
      fieldType: fieldType.Suggestion,
      xs: 12,
      sm: 4,
      md: 4,
      name: "blood_group",
      freeSolo: false,
      rules: {
        validate: (value) =>
          autoCompleteDropdownValidation(value, bloodGroup) ||
          t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Blood Group",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: bloodGroup.sort(),
    },
    {
      fieldType: fieldType.Suggestion,
      xs: 12,
      sm: 4,
      md: 4,
      name: "physical_activity",
      freeSolo: false,
      rules: {
        validate: (value) =>
          autoCompleteDropdownValidation(value, physicalActivity) ||
          t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Physical Activity",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: physicalActivity.sort(),
    },
    {
      fieldType: fieldType.Chip,
      xs: 12,
      sm: 4,
      md: 4,
      name: "chronic_illness",
      freeSolo: true,
      rules: {
        // validate: (value) =>
        //   value === undefined ||
        //   t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Chronic Illness",
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
      fieldType: fieldType.Suggestion,
      xs: 12,
      sm: 4,
      md: 4,
      name: "smoking",
      freeSolo: false,
      rules: {
        validate: (value) =>
          autoCompleteDropdownValidation(value, smoking) ||
          t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Smoking",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: smoking.sort(),
    },
    {
      fieldType: fieldType.Suggestion,
      xs: 12,
      sm: 4,
      md: 4,
      name: "drinking",
      freeSolo: false,
      rules: {
        validate: (value) =>
          autoCompleteDropdownValidation(value, smoking) ||
          t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Drinking",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: smoking.sort(),
    },
    {
      fieldType: fieldType.AutoSizeTextFields,
      xs: 12,
      sm: 12,
      md: 12,
      name: "add_details",
      freeSolo: false,
      rules: {},
      control: control,
      label: "Add Details",
      type: "text",
      value: [],
      // value: titleDropdown.sort(),
      maxLength: 1000,
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
export default connect(mapStateToProp)(LgHealth);
