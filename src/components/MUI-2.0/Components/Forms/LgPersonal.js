import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  fieldType,
  language,
  race,
  variant,
  religion,
  star,
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
import { primaryBorder } from "../../Constants/styles/styles";

const LgPersonal = (props) => {
  //-----------------------Declare constants Here-----------------------------//
  let inputArray;
  const { t } = useTranslation();
  const defaultValues = {
    dob: "",
    birth_time: "",
    dod: "",
    nat_lang: "",
    religion: "",
    birth_cntry: "",
    nation: "",
    last_res: "",
    dth_loc: "",
    race: "",
    caste: "",
    clan: "",
    star: "",
    add_details: "",
    pers_add_details: "",
    add_detail_visb: "",
    mort_rem: "",
    mort_rem_loc: "",
    visibility: "",
    pers_visib: "",
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
    let formData = Object.assign(data, {
      lg_id: props.lgId,
    });
    updateLgApi(Api.lgPersonal, formData, setLoading);
  };

  //-----------------------Declare useState Here-----------------------------//

  const inputFieldArray = [
    {
      fieldType: fieldType.DatePicker,
      xs: 12,
      sm: 4,
      md: 4,
      name: "dob",
      rules: {},
      control: control,
      label: "DOB",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.DatePicker,
      xs: 12,
      sm: 4,
      md: 4,
      name: "dod",
      rules: {},
      control: control,
      label: "DOD",
      type: "text",
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
      name: "birth_cntry",
      rules: {},
      control: control,
      label: "Birth Country",
      type: "text",
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
      name: "nation",
      rules: {},
      control: control,
      label: "Nationality",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.Suggestion,
      xs: 12,
      sm: 4,
      md: 4,
      freeSolo: false,
      name: "nat_lang",
      rules: {
        validate: (value) =>
          autoCompleteDropdownValidation(value, language) ||
          t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Native Language",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: language,
    },
    {
      fieldType: fieldType.Suggestion,
      xs: 12,
      sm: 4,
      md: 4,
      freeSolo: false,
      name: "race",
      rules: {
        validate: (value) =>
          autoCompleteDropdownValidation(value, race) ||
          t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Race",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: race,
    },
    {
      fieldType: fieldType.Suggestion,
      xs: 12,
      sm: 4,
      md: 4,
      freeSolo: false,
      name: "religion",
      rules: {
        validate: (value) =>
          autoCompleteDropdownValidation(value, religion) ||
          t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Religion",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: religion,
    },
    {
      fieldType: fieldType.TextField,
      xs: 12,
      sm: 4,
      md: 4,
      name: "caste",
      rules: {},
      control: control,
      label: "Caste",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 45,
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
      name: "clan",
      rules: {},
      control: control,
      label: "Clan / Gothra",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 45,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.Suggestion,
      xs: 12,
      sm: 4,
      md: 4,
      freeSolo: false,
      name: "star",
      rules: {
        validate: (value) =>
          autoCompleteDropdownValidation(value, star) ||
          t("display.helperText.errors.autoselectDropdownError"),
      },
      control: control,
      label: "Star",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: star,
    },
    {
      fieldType: fieldType.TextField,
      xs: 12,
      sm: 4,
      md: 4,
      freeSolo: false,
      name: "last_res",
      rules: {},
      control: control,
      label: "Last Residence City/Country",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 45,
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
      freeSolo: false,
      name: "dth_loc",
      rules: {},
      control: control,
      label: "Death Location",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 45,
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
      freeSolo: false,
      name: "mort_rem",
      rules: {},
      control: control,
      label: "Mortal Remaining",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 45,
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
      freeSolo: false,
      name: "mort_rem_loc",
      rules: {},
      control: control,
      label: "Mortal Remaining Location",
      type: "text",
      // value: titleDropdown.sort(),
      maxLength: 45,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
    },
    {
      fieldType: fieldType.AutoSizeTextFields,
      xs: 12,
      sm: 12,
      md: 12,
      freeSolo: false,
      name: "add_details",
      rules: {},
      control: control,
      label: "Add Details",
      type: "text",
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
  if (!props.deceased) {
    console.log("deceased false inputArray");
    inputArray = inputFieldArray.filter(
      (item) =>
        item.name !== "mort_rem_loc" &&
        item.name !== "mort_rem" &&
        item.name !== "dth_loc" &&
        item.name !== "dod"
    );
  } else {
    inputArray = inputFieldArray;
  }
  return (
    <Paper elevation={3} sx={primaryBorder}>
      <Box>
        <center>
          <Typography sx={{ py: 2 }} variant="h4">
            {t("display.helperText.texts.createLgPersonalTitle")}
          </Typography>
        </center>
        <Box
          sx={{ p: 2 }}
          component={"form"}
          onSubmit={handleSubmit((data) => formatData(data))}
        >
          <ReactForms input={inputArray} />
          <LoadingButton
            variant="contained"
            type={"submit"}
            sx={{ borderRadius: 8, width: "100%", my: 2 }}
            loading={loading}
          >
            {t("display.helperText.button.save")}
          </LoadingButton>
        </Box>
      </Box>
    </Paper>
  );
};
const mapStateToProp = (state) => {
  return {
    lgId: state.commonState.lgId,
  };
};
export default connect(mapStateToProp)(LgPersonal);
