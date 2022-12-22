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

const InputField = (props) => {
  // console.log("new login component props", props.input);

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
            sx={{ my: 1 }}
          >
            {input.fieldType == fieldType.TextField ||
            input.fieldType == fieldType.AutoSizeTextFields ? (
              <TextField
                key={id}
                label={input.label}
                type={input.type}
                value={input.value}
                inputProps={{ maxLength: input.maxLength }}
                required={input.required}
                onFocus={(e) => input.onFocus(e.target.value)}
                onChange={(e) => input.onChange(e.target.value)}
                onBlur={(e) => input.onBlur(e.target.value)}
                onKeyDown={(e) => (e.key == "Enter" ? input.onKeyDown() : null)}
                variant={input.variant}
                disabled={input.disabled}
                select={input.select}
                error={input.error}
                helperText={input.helperText}
                sx={{ width: "100%" }}
                InputProps={{
                  inputComponent:
                    input.fieldType == fieldType.AutoSizeTextFields
                      ? TextareaAutosize
                      : null,
                }}
              />
            ) : input.fieldType == fieldType.Suggestion ? (
              <Autocomplete
                options={input.inputValue}
                autoHighlight={input.freeSolo ? false : true}
                freeSolo={input.freeSolo ? true : false}
                value={input.value ? input.value : ""}
                defaultValue={input.value ? input.value : ""}
                disabled={input.disabled}
                getOptionLabel={(option) => option}
                onChange={(event, value) => input.onChange(value)}
                onBlur={(event, value) => input.onBlur(value)}
                onKeyDown={(e, value) =>
                  e.key == "Enter" ? input.onKeyDown() : null
                }
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
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
                      error={input.error}
                      helperText={input.helperText}
                      variant={input.variant}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                    />
                  </Box>
                )}
              />
            ) : input.fieldType == fieldType.DropDown ? (
              <TextField
                select={input.select}
                label={input.label}
                value={input.value}
                required={input.required}
                disabled={input.disabled}
                onChange={(e) => input.onChange(e.target.value)}
                onBlur={(e) => input.onBlur(e.target.value)}
                onKeyDown={(e) => (e.key == "Enter" ? input.onKeyDown() : null)}
                variant={input.variant}
                sx={{ width: "100%" }}
                error={input.error}
                helperText={input.helperText}
              >
                {input.inputValue.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : input.fieldType == fieldType.Chip ? (
              <Autocomplete
                multiple
                disabled={input.disabled}
                options={input.inputValue}
                defaultValue={input.value}
                freeSolo={input.freeSolo}
                onInputChange={(event, value) => console.log("onInputChange")}
                onChange={(event, value) => input.onChange(value)}
                onBlur={(event, value) => input.onBlur(value)}
                onKeyDown={(e, value) =>
                  e.key == "Enter" ? input.onKeyDown() : null
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
                    error={input.error}
                    helperText={input.helperText}
                    // placeholder="Favorites"
                  />
                )}
              />
            ) : input.fieldType == fieldType.DatePicker ? (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label={input.label}
                  inputFormat="dd/MM/yyyy"
                  value={input.value ? input.value : null}
                  disabled={input.disabled}
                  onChange={(value) => input.onChange(value)}
                  onClose={(value) => input.onBlur(value)}
                  onKeyDown={(e) => console.log("key press", e)}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "100%" }}
                      {...params}
                      variant={input.variant}
                      error={input.error}
                      helperText={input.helperText}
                    />
                  )}
                />
              </LocalizationProvider>
            ) : (
              ""
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default InputField;
