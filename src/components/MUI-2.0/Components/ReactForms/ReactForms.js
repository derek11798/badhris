import React from "react";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { fieldType } from "../../Constants/constant";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LoadingButton } from "@mui/lab/";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ReactForms = (props) => {
  const { t } = useTranslation();
  // console.log("new login component props", props.input);
  const [validate, setValidation] = React.useState(false);
  const validateChip = (data, freeSolo) => {
    if (!freeSolo && data !== "") {
      setValidation(t("display.helperText.errors.chipValidationError"));
    } else {
      setValidation(false);
    }
  };

  return (
    <div>
      <Grid container>
        {props.input.map((input, id) => (
          <Grid
            item
            xs={input.xs}
            sm={input.sm}
            md={input.md}
            key={id}
            sx={{ my: 1, px: { xs: 0, sm: 2 } }}
          >
            {input.fieldType == fieldType.TextField ||
            input.fieldType == fieldType.AutoSizeTextFields ? (
              <Controller
                name={input.name}
                control={input.control}
                defaultValue={input.value}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    key={id}
                    label={input.label}
                    type={input.type}
                    inputProps={{ maxLength: input.maxLength }}
                    required={input.required}
                    variant={input.variant}
                    disabled={input.disabled}
                    select={input.select}
                    error={fieldState.error ? true : false}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                    sx={{ width: "100%" }}
                    InputProps={{
                      inputComponent:
                        input.fieldType == fieldType.AutoSizeTextFields
                          ? TextareaAutosize
                          : null,
                    }}
                  />
                )}
                rules={input.rules}
              />
            ) : input.fieldType == fieldType.Suggestion ? (
              <Controller
                name={input.name}
                control={input.control}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    {...field}
                    value={field.value}
                    options={input.inputValue}
                    autoHighlight={input.freeSolo ? false : true}
                    freeSolo={input.freeSolo ? true : false}
                    disabled={input.disabled}
                    isOptionEqualToValue={(option, value) => option === value}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        // sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        {option}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <Box>
                        <TextField
                          {...params}
                          label={input.label}
                          error={fieldState.error ? true : false}
                          helperText={
                            fieldState.error ? fieldState.error.message : null
                          }
                          variant={input.variant}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
                      </Box>
                    )}
                    onChange={(_, data) => field.onChange(data)}
                    onInputChange={(_, data) => field.onChange(data)}
                  />
                )}
                rules={input.rules}
              />
            ) : input.fieldType == fieldType.DropDown ? (
              <Controller
                name={input.name}
                control={input.control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    select={input.select}
                    label={input.label}
                    value={field.value}
                    required={input.required}
                    disabled={input.disabled}
                    variant={input.variant}
                    sx={{ width: "100%" }}
                    error={fieldState.error ? true : false}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                  >
                    {input.inputValue.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            ) : input.fieldType === fieldType.Chip ? (
              <Controller
                name={input.name}
                control={input.control}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    disabled={input.disabled}
                    options={input.inputValue}
                    freeSolo={input.freeSolo}
                    onChange={(_, data) => field.onChange(data)}
                    // onBlur={(_, data) => field.onChange(data)}
                    onInputChange={(_, data) =>
                      validateChip(data, input.freeSolo)
                    }
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant={input.variant}
                        label={input.label}
                        error={fieldState.error || validate ? true : false}
                        helperText={
                          fieldState.error
                            ? fieldState.error.message
                            : validate
                            ? validate
                            : "Press enter to add fields"
                        }
                        // placeholder="Favorites"
                      />
                    )}
                  />
                )}
                rules={input.rules}
              />
            ) : input.fieldType == fieldType.DatePicker ? (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name={input.name}
                  control={input.control}
                  render={({ field, fieldState }) => (
                    <DesktopDatePicker
                      {...field}
                      label={input.label}
                      inputFormat="dd/MM/yyyy"
                      value={field.value ? field.value : null}
                      disabled={input.disabled}
                      // onChange={(value) => input.onChange(value)}
                      // onClose={(value) => input.onBlur(value)}
                      // onKeyDown={(e) => console.log("key press", e)}
                      renderInput={(params) => (
                        <TextField
                          sx={{ width: "100%" }}
                          {...params}
                          variant={input.variant}
                          error={fieldState.error}
                          helperText={
                            fieldState.error ? fieldState.error.message : null
                          }
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            ) : null}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default ReactForms;
