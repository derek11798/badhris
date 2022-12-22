import { Box } from "@mui/material";
import React, { useState } from "react";
import {
  fieldType,
  variant,
  visiblity,
  Api,
  bestQualities,
  worstQualities,
  favouriteSport,
  favouriteMusic,
} from "../../Constants/constant";
import ReactForms from "../ReactForms/ReactForms";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab/";
import { autoCompleteDropdownValidation } from "../../Functions/HelperFunction_validation";
import { connect } from "react-redux";
import { updateLgApi } from "../../Functions/Api's/CreateLgApi/updateLgApi";

const LgPersonality = (props) => {
  //-----------------------Declare constants Here-----------------------------//
  const { t } = useTranslation();
  const defaultValues = {
    best_qual: [],
    worst_qual: [],
    add_details: "",
    hobbies: [],
    fav_food: [],
    fav_books: [],
    fav_sports: [],
    fav_music: [],
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
    data.best_qual = data.best_qual.join("|");
    data.worst_qual = data.worst_qual.join("|");
    data.hobbies = data.hobbies.join("|");
    data.fav_food = data.fav_food.join("|");
    data.fav_books = data.fav_books.join("|");
    data.fav_sports = data.fav_sports.join("|");
    data.fav_music = data.fav_music.join("|");
    let formData = Object.assign(data, {
      lg_id: props.lgId,
    });
    updateLgApi(Api.lgPersonality, formData, setLoading);
  };

  //-----------------------Declare useState Here-----------------------------//

  const inputFieldArray = [
    {
      fieldType: fieldType.Chip,
      xs: 12,
      sm: 4,
      md: 4,
      name: "best_qual",
      freeSolo: true,
      rules: {},
      control: control,
      label: "Best Quality",
      type: "text",
      value: [],
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: bestQualities,
    },
    {
      fieldType: fieldType.Chip,
      xs: 12,
      sm: 4,
      md: 4,
      name: "worst_qual",
      freeSolo: true,
      rules: {},
      control: control,
      label: "Worst Quality",
      type: "text",
      value: [],
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: worstQualities,
    },
    {
      fieldType: fieldType.Chip,
      xs: 12,
      sm: 4,
      md: 4,
      name: "hobbies",
      freeSolo: true,
      rules: {},
      control: control,
      label: "Hobbies",
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
      name: "fav_food",
      freeSolo: true,
      rules: {},
      control: control,
      label: "Favourite Food",
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
      name: "fav_sports",
      freeSolo: true,
      rules: {},
      control: control,
      label: "Favourite Sports",
      type: "text",
      value: [],
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: favouriteSport,
    },
    {
      fieldType: fieldType.Chip,
      xs: 12,
      sm: 4,
      md: 4,
      name: "fav_music",
      freeSolo: true,
      rules: {},
      control: control,
      label: "Favourite Music",
      type: "text",
      value: [],
      // value: titleDropdown.sort(),
      maxLength: null,
      required: false,
      variant: variant,
      disabled: false,
      select: false,
      inputValue: favouriteMusic,
    },
    {
      fieldType: fieldType.Chip,
      xs: 12,
      sm: 4,
      md: 4,
      name: "fav_books",
      freeSolo: true,
      rules: {},
      control: control,
      label: "Favourite Books",
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
export default connect(mapStateToProp)(LgPersonality);
