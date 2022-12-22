import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Country, State, City } from "country-state-city";

export default function Suggestion(props) {
  const handleInputChange = (value) => {
    if (props.freeSolo) {
      props.returnValue(value);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Autocomplete
        // sx={{ width: 300 }}
        options={props.value.sort()}
        autoHighlight={props.freeSolo ? false : true}
        freeSolo={props.freeSolo ? true : false}
        value={props.defaultValue}
        disabled={props.disabled}
        onInputChange={(event, value) => console.log("onInputChange", value)} //handleInputChange(value)}
        getOptionLabel={(option) => option}
        onChange={(event, value) => props.returnValue(value)}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {/* <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          /> */}
            {option}
          </Box>
        )}
        renderInput={(params) => (
          <Box>
            <TextField
              {...params}
              label={props.label}
              variant="standard"
              // onChange={(e) => console.log(e.target.value)}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          </Box>
        )}
      />
    </Box>
  );
}
