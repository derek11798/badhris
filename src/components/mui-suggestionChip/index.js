import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { PropaneSharp } from "@mui/icons-material";

export default function SuggestionChip(props) {
  const [defaultValue, setDefaultValue] = React.useState(false);
  const [helperText, setHelperText] = React.useState();

  React.useEffect(() => {
    console.log("props value", props);
    setDefaultValue(props.defaultValue);
  }, []);
  //   React.useEffect(() => {
  //     console.log("default value", defaultValue);
  //   }, [defaultValue]);

  return (
    <Box sx={{ width: "100%" }}>
      <Autocomplete
        multiple
        disabled={props.disabled}
        options={props.value}
        defaultValue={props.defaultValue}
        freeSolo
        onInputChange={(event, value) => setHelperText(true)}
        onChange={(event, value) => props.returnValue(value)}
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
            variant="standard"
            label={props.label}
            helperText={helperText ? "Press ENTER after adding an item" : ""}
            // placeholder="Favorites"
          />
        )}
      />
    </Box>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
