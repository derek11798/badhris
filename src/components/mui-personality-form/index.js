import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Suggestion from "../mui-suggestion";
import {
  FavouriteMusic,
  FavouriteSport,
  GoodQualities,
  WorstQualities,
} from "../../helpers/dropdownlist";
import TagsInput from "../mui-chiptextfield";
import AlertMessage from "../mui-alertmessage";
import { aboutLgAction } from "../../redux/actions";
import Spinner from "../mui-spinner";
import SuggestionChip from "../mui-suggestionChip";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Visiblity = [
  "Public",
  "2nd cousins",
  "1st cousins",
  "Direct Family",
  "Descendants",
];

function PersonalityForm(props) {
  const [bestQuality, setBestQuality] = useState(
    props.aboutLg.best_qualities ? props.aboutLg.best_qualities.split("|") : []
  );
  const [worstQuality, setWorstQuality] = useState(
    props.aboutLg.worst_qualities
      ? props.aboutLg.worst_qualities.split("|")
      : []
  );
  const [hobbies, setHobbies] = useState(
    props.aboutLg.hobbies ? props.aboutLg.hobbies.split("|") : []
  );
  const [favouriteFood, setFavouriteFood] = useState(
    props.aboutLg.fav_food ? props.aboutLg.fav_food.split("|") : []
  );
  const [favouriteSports, setFavouriteSports] = useState(
    props.aboutLg.fav_sports ? props.aboutLg.fav_sports.split("|") : []
  );
  const [favouriteBooks, setFavouriteBooks] = useState(
    props.aboutLg.fav_books ? props.aboutLg.fav_books.split("|") : []
  );
  const [favouriteMusic, setFavouriteMusic] = useState(
    props.aboutLg.fav_music ? props.aboutLg.fav_music.split("|") : []
  );
  const [addDetails, setAddDetails] = useState(
    props.aboutLg.persntly_add_details ? props.aboutLg.persntly_add_details : ""
  );
  const [addDetailsVisiblity, setAddDetailsVisiblity] = useState(null);
  const [visiblity, setVisiblity] = useState(
    props.aboutLg.persnlty_visib ? props.aboutLg.persnlty_visib : "Public"
  );
  const [disabled, setDisabled] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (
      bestQuality.join("|") == props.aboutLg.best_qualities &&
      worstQuality.join("|") == props.aboutLg.worst_qualities &&
      hobbies.join("|") == props.aboutLg.hobbies &&
      favouriteFood.join("|") == props.aboutLg.fav_food &&
      favouriteSports.join("|") == props.aboutLg.fav_sports &&
      favouriteBooks.join("|") == props.aboutLg.fav_books &&
      favouriteMusic.join("|") == props.aboutLg.fav_music &&
      addDetails == props.aboutLg.persntly_add_details &&
      visiblity == props.aboutLg.hlth_visib
    ) {
      setDisableButton(true);
    } else if (
      bestQuality == [] &&
      worstQuality == [] &&
      hobbies == [] &&
      favouriteFood == [] &&
      favouriteSports == [] &&
      favouriteBooks == [] &&
      favouriteMusic == [] &&
      addDetails == "" &&
      visiblity == "Public"
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [
    bestQuality,
    worstQuality,
    hobbies,
    favouriteFood,
    favouriteSports,
    favouriteBooks,
    favouriteMusic,
    addDetails,
    visiblity,
  ]);

  useEffect(() => {
    if (props.lgId) {
      setDisabled(false);
    }
  }, []);

  const updateForm = () => {
    setSpinner(true);
    const form_details = {
      best_qualities: bestQuality.join("|"),
      worst_qualities: worstQuality.join("|"),
      best_qual: bestQuality.join("|"),
      worst_qual: worstQuality.join("|"),
      hobbies: hobbies.join("|"),
      fav_food: favouriteFood.join("|"),
      fav_sports: favouriteSports.join("|"),
      fav_books: favouriteBooks.join("|"),
      fav_music: favouriteMusic.join("|"),
      add_details: addDetails,
      add_detail_visb: addDetailsVisiblity,
      visibility: visiblity,
      hlth_visib: visiblity,
      persntly_add_details: addDetails,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        UserId: `${props.userId}`,
        token: `${props.authToken}`,
      },
      body: JSON.stringify({
        lg_id: props.lgId,
        basic_details: form_details,
      }),
    };
    fetch("https://lifograf.com/lg_api/lgPersonality", requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        if (!responseJSON.error) {
          setSpinner(false);
          setAlert(true);
          setAlertType(true);
          setAlertMessage(responseJSON.message);
          props.aboutLgAction({ ...props.aboutLg, ...form_details });
          setDisableButton(true);
        } else {
          setSpinner(false);
          setAlert(true);
          setAlertType(false);
          setAlertMessage(responseJSON.message);
        }

        //   props.lgIdAction(responseJSON.lg_id)
      })
      .catch((error) => {
        console.log(error);
        setAlert(true);
        setAlertType(false);
        setAlertMessage("something went wrong please try again later");
      });
  };

  return (
    <Box>
      {spinner && <Spinner />}
      <Box justifyContent="flex-end" alignItems="flex-end" display={"flex"}>
        <Box>
          {props.lgId && (
            <Button onClick={() => props.editMode(false)}>
              <VisibilityIcon />
            </Button>
          )}
        </Box>
      </Box>
      <Box
        component="form"
        sx={{
          // "& .MuiTextField-root": { m: 1, width: "40ch" },
          m: 1,
          display: "flex",
          flexWrap: "wrap",
        }}
        noValidate
        display="grid"
        // gridTemplateColumns="repeat(12, 1fr)"
        gap={3}
        autoComplete="on"
      >
        <Grid container columns={{ sm: 9 }}>
          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField id="standard-select-currency" label="Best Quality" value={bestQuality} onChange={(e) => setBestQuality(e.target.value)} variant="standard" /> */}
            <SuggestionChip
              label="Best Quality"
              value={GoodQualities}
              returnValue={setBestQuality}
              defaultValue={bestQuality}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField id="standard-select-currency" label="Worst Quality" value={worstQuality} onChange={(e) => setWorstQuality(e.target.value)} variant="standard" /> */}
            <SuggestionChip
              label="Worst Quality"
              value={WorstQualities}
              returnValue={setWorstQuality}
              defaultValue={worstQuality}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField id="standard-select-currency" label="Hobbies" disabled={disabled} value={hobbies} onChange={(e) => setHobbies(e.target.value)} variant="standard" /> */}
            <SuggestionChip
              returnValue={setHobbies}
              defaultValue={hobbies}
              label="Hobbies"
              value={[]}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            <SuggestionChip
              returnValue={setFavouriteFood}
              defaultValue={favouriteFood}
              label="Favourite Food"
              value={[]}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField id="standard-select-currency" label="Favourite Sports" value={favouriteSports} onChange={(e) => setFavouriteSports(e.target.value)} variant="standard" /> */}
            <SuggestionChip
              label="Favourite Sports"
              disabled={disabled}
              defaultValue={favouriteSports}
              value={FavouriteSport}
              returnValue={setFavouriteSports}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField id="standard-select-currency" label="Favourite Music" value={favouriteMusic} onChange={(e) => setFavouriteMusic(e.target.value)} variant="standard" /> */}
            <SuggestionChip
              label="Favourite Music"
              value={FavouriteMusic}
              defaultValue={favouriteMusic}
              returnValue={setFavouriteMusic}
              disabled={disabled}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            <SuggestionChip
              label="Favourite Book"
              value={[]}
              defaultValue={favouriteBooks}
              returnValue={setFavouriteBooks}
              disabled={disabled}
            />
          </Grid>

          <Grid item sm={12} sx={{ p: 3 }}>
            <TextareaAutosize
              id="standard-select-currency"
              disabled={disabled}
              multiline
              minRows={2}
              maxRows={4}
              fullWidth
              inputProps={{ maxLength: 1000 }}
              placeholder="Add Details"
              defaultValue={addDetails}
              onChange={(e) => setAddDetails(e.target.value)}
              variant="standard"
              style={{ width: "100%" }}
            />
          </Grid>

          {/*           <Grid item sm={3} sx={{ p: 3 }}>

          <TextField id="standard-select-currency" select label="Add Details Visiblity" value={addDetailsVisiblity} onChange={(e) => setAddDetailsVisiblity(e.target.value)} variant="standard">
            {Visiblity.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
                    </Grid>
 */}
          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
              id="standard-select-currency"
              select
              label="Visiblity"
              disabled={disabled}
              value={visiblity}
              onChange={(e) => setVisiblity(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            >
              {Visiblity.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <Suggestion
              label="Visiblity"
              value={Visiblity}
              returnValue={setVisiblity}
              defaultValue={visiblity}
            />
          </Grid>
        </Grid>
      </Box>
      <Box textAlign="center" justifyContent={"center"}>
        <Button
          disabled={disableButton}
          sx={{ alignItem: "center", color: "#FFFFFF", mb: 1 }}
          onClick={() => {
            updateForm();
          }}
          variant="contained"
        >
          Save
        </Button>
      </Box>
      <AlertMessage
        open={alert}
        close={setAlert}
        message={alertMessage}
        type={alertType}
      ></AlertMessage>
    </Box>
  );
}
const mapStateToProp = (state) => {
  return {
    authToken: state.commonState.authToken,
    userId: state.commonState.userId,
    lgId: state.commonState.lgId,
    userName: state.commonState.userName,
    aboutLg: state.commonState.aboutLg,
  };
};
export default connect(mapStateToProp, { aboutLgAction })(PersonalityForm);
