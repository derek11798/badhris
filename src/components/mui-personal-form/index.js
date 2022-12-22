import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CountrySelect from "../mui-countrydropdown";
import { Country, State, City } from "country-state-city";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Suggestion from "../mui-suggestion";
import AlertMessage from "../MUI-2.0/Components/AlertMessage/AlertMessage";
import { relegion, Race, Language, Star } from "../../helpers/dropdownlist";
import { aboutLgAction } from "../../redux/actions";
import Spinner from "../mui-spinner";
import { countries } from "../../helpers/dropdownlist";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Gender = ["Male", "Female"];
const titles = ["Mr", "Mrs", "Ms", "Master", "Baby"];
const Deseased = ["Yes", "No"];
const Visiblity = [
  "Public",
  "2nd cousins",
  "1st cousins",
  "Direct Family",
  "Descendants",
];

function PersonalForm(props) {
  const [dob, setDob] = useState(props.aboutLg.dob ? props.aboutLg.dob : "");
  const [birthTime, setBirthTime] = useState("0");
  const [dod, setDod] = useState(props.aboutLg.dod ? props.aboutLg.dod : "");
  const [nationalLanguage, setNationalLanguage] = useState(
    props.aboutLg.native_language ? props.aboutLg.native_language : ""
  );
  const [nationality, setNationality] = useState(
    props.aboutLg.nation ? props.aboutLg.nation : ""
  );
  const [birthCountry, setBirthCountry] = useState(
    props.aboutLg.birth_cntry ? props.aboutLg.birth_cntry : ""
  );
  const [religion, setReligion] = useState(
    props.aboutLg.religion ? props.aboutLg.religion : ""
  );
  const [lastResidence, setLastResidence] = useState(
    props.aboutLg.last_res ? props.aboutLg.last_res : ""
  );
  const [deathLocation, setDeathLocation] = useState(
    props.aboutLg.dth_loc ? props.aboutLg.dth_loc : ""
  );
  const [race, setRace] = useState(
    props.aboutLg.race ? props.aboutLg.race : ""
  );
  const [caste, setCaste] = useState(
    props.aboutLg.caste ? props.aboutLg.caste : ""
  );
  const [clan, setClan] = useState(
    props.aboutLg.clan ? props.aboutLg.clan : ""
  );
  const [star, setStar] = useState(
    props.aboutLg.star ? props.aboutLg.star : ""
  );
  const [addDetails, setAddDetails] = useState(
    props.aboutLg.pers_add_details ? props.aboutLg.pers_add_details : ""
  );
  const [addDetailsVisiblity, setAddDetailsVisiblity] = useState(null);
  const [mortalRemaining, setMortalRemaining] = useState(
    props.aboutLg.mortal_remains ? props.aboutLg.mortal_remains : ""
  );
  const [mortalRemainingLocation, setMortalRemainingLocation] = useState(
    props.aboutLg.mortal_remains_location
      ? props.aboutLg.mortal_remains_location
      : ""
  );
  const [visibility, setVisiblity] = useState(
    props.aboutLg.pers_visib ? props.aboutLg.pers_visib : "Public"
  );
  const [countryCode, setCountryCode] = useState();
  const [citiesOfCountry, setCities] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [dobValidation, setDobValidation] = useState(false);
  const [dodValidation, setDodValidation] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  let cities = "";
  useEffect(() => {
    if (birthCountry) {
      setCountryCode(
        Country.getAllCountries().filter((item) => item.name == nationality)[0]
          .isoCode
      );
    }
  }, [birthCountry]);

  useEffect(() => {
    if (!props.deseased && props.aboutLg) {
      console.log();
      if (
        dob == props.aboutLg.dob &&
        birthCountry == props.aboutLg.birth_cntry &&
        nationality == props.aboutLg.nation &&
        nationalLanguage == props.aboutLg.native_language &&
        race == props.aboutLg.race &&
        religion == props.aboutLg.religion &&
        caste == props.aboutLg.caste &&
        clan == props.aboutLg.clan &&
        star == props.aboutLg.star &&
        lastResidence == props.aboutLg.last_res &&
        addDetails == props.aboutLg.pers_add_details &&
        visibility == props.aboutLg.pers_visib
      ) {
        console.log("deseased false ans disable button true1");
        setDisableButton(true);
      } else if (
        dob == "" &&
        birthCountry == "" &&
        nationality == "" &&
        nationalLanguage == "" &&
        race == "" &&
        religion == "" &&
        caste == "" &&
        clan == "" &&
        star == "" &&
        lastResidence == "" &&
        addDetails == "" &&
        visibility == "Public"
      ) {
        console.log("deseased false ans disable button false2");
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    } else {
      if (props.aboutLg) {
        if (
          dod == props.aboutLg.dod &&
          deathLocation == props.aboutLg.dth_loc &&
          mortalRemaining == props.aboutLg.mortal_remains &&
          mortalRemainingLocation == props.aboutLg.mortal_remains_location &&
          dob == props.aboutLg.dob &&
          birthCountry == props.aboutLg.birth_cntry &&
          nationality == props.aboutLg.nation &&
          nationalLanguage == props.aboutLg.native_language &&
          race == props.aboutLg.race &&
          religion == props.aboutLg.religion &&
          caste == props.aboutLg.caste &&
          clan == props.aboutLg.clan &&
          star == props.aboutLg.star &&
          lastResidence == props.aboutLg.last_res &&
          addDetails == props.aboutLg.pers_add_details &&
          visibility == props.aboutLg.pers_visib
        ) {
          console.log("deseased true ans disable button true3");
          setDisableButton(true);
        } else {
          console.log("deseased true ans disable button false4");
          setDisableButton(false);
        }
      }
    }
  }, [
    dob,
    birthTime,
    dod,
    birthCountry,
    nationality,
    nationalLanguage,
    race,
    religion,
    caste,
    clan,
    star,
    lastResidence,
    deathLocation,
    mortalRemaining,
    mortalRemainingLocation,
    addDetails,
    visibility,
    props.deseased,
    props.aboutLg,
  ]);

  useEffect(() => {
    if (countryCode) {
      console.log("cities Array", City.getCitiesOfCountry(countryCode));
      cities = City.getCitiesOfCountry(countryCode).map((item) => item.name);
      setCities(cities);
      console.log("cities name", cities);
    }
  }, [countryCode]);

  useEffect(() => {
    if (props.lgId) {
      setDisabled(false);
    }
  }, []);
  const updateForm = () => {
    setSpinner(true);
    const form_details = {
      dob: dob,
      birth_time: birthTime,
      dod: dod,
      nat_lang: nationalLanguage,
      religion: religion,
      birth_cntry: birthCountry,
      nation: nationality,
      last_res: lastResidence,
      dth_loc: deathLocation,
      race: race,
      caste: caste,
      clan: clan,
      star: star,
      add_details: addDetails,
      pers_add_details: addDetails,
      add_detail_visb: addDetailsVisiblity,
      mort_rem: mortalRemaining,
      mort_rem_loc: mortalRemainingLocation,
      visibility: visibility,
      pers_visib: visibility,
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
    fetch("https://lifograf.com/lg_api/lgPersonal", requestOptions)
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
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleDobChange = (newValue) => {
    setDob(newValue);
    let d1 = new Date(newValue);
    if (d1 > new Date()) {
      setDobValidation(true);
    } else {
      setDobValidation(false);
    }
  };
  const handleBirthTimeChange = (newValue) => {
    setBirthTime(newValue);
  };
  const handleDodChange = (newValue) => {
    setDod(newValue);
    if (dob) {
      let deathday = new Date(newValue);
      let birthday = new Date(dob);
      if (birthday > deathday || deathday > new Date()) {
        setDodValidation(true);
      } else {
        setDodValidation(false);
      }
    } else {
      setDodValidation(true);
    }
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
          // "& .MuiTextField-root": { m: 1 },
          m: 1,
          display: "flex",
          flexWrap: "wrap",
        }}
        noValidate
        autoComplete="off"
        display="grid"
        // gridTemplateColumns="repeat(12, 1fr)"
        gap={3}
      >
        <Grid container columns={{ sm: 9 }}>
          <Grid item sm={3} sx={{ p: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                sx={{ m: "8px" }}
                label="Date Of Birth"
                inputFormat="dd/MM/yyyy"
                value={dob ? dob : null}
                disabled={disabled}
                onChange={handleDobChange}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "100%" }}
                    {...params}
                    variant="standard"
                    error={dobValidation}
                    helperText={
                      dobValidation
                        ? "Date of birth should be less than or equal to present date"
                        : ""
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {/* <Grid item sm={3} sx={{ p: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Birth Time"
                value={birthTime}
                disabled={disabled}
                onChange={handleBirthTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid> */}
          {props.deseased && (
            <Grid item sm={3} sx={{ p: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date Of Death"
                  inputFormat="dd/MM/yyyy"
                  value={dod ? dod : null}
                  disabled={disabled}
                  onChange={handleDodChange}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "100%" }}
                      variant="standard"
                      {...params}
                      error={dodValidation}
                      helperText={
                        dodValidation
                          ? "Date of death should be greater than  DOB and less than or equal to present date"
                          : ""
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          )}
          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
            id="standard-select-currency"
            label="Birth Country"
            value={birthCountry}
            onChange={(e) => setBirthCountry(e.target.value)}
            variant="standard"
          /> */}
            {/* <CountrySelect
              location={setBirthCountry}
              label="Birth Country"
              // type="country"
              countryCode={setCountryCode}
              disabled={disabled}
              defaultValue={birthCountry}
            /> */}
            <Suggestion
              value={Country.getAllCountries().map((item) => item.name)}
              label="Birth country"
              returnValue={setBirthCountry}
              defaultValue={birthCountry}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
            id="standard-select-currency"
            label="Nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            variant="standard"
          /> */}
            {/* <CountrySelect
              location={setNationality}
              label="Nationality"
              type="country"
              countryCode={setCountryCode}
              disabled={disabled}
              defaultValue={nationality}
            /> */}
            <Suggestion
              value={Country.getAllCountries().map((item) => item.name)}
              label="Nationality"
              returnValue={setNationality}
              defaultValue={nationality}
            />
          </Grid>
          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
            id="standard-select-currency"
            label="Native Language"
            value={nationalLanguage}
            onChange={(e) => setNationalLanguage(e.target.value)}
            variant="standard"
          /> */}
            <Suggestion
              label="Native Language"
              value={Language}
              returnValue={setNationalLanguage}
              disabled={disabled}
              defaultValue={nationalLanguage}
            />
          </Grid>
          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
            id="standard-select-currency"
            label="Race"
            value={race}
            onChange={(e) => setRace(e.target.value)}
            variant="standard"
          /> */}
            <Suggestion
              label="Race"
              value={Race}
              returnValue={setRace}
              disabled={disabled}
              defaultValue={race}
            />
          </Grid>
          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
            id="standard-select-currency"
            label="Religion"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            variant="standard"
          /> */}
            <Suggestion
              label="Religion"
              value={relegion}
              returnValue={setReligion}
              disabled={disabled}
              defaultValue={religion}
            />
          </Grid>
          <Grid item sm={3} sx={{ p: 3 }}>
            <TextField
              id="standard-select-currency"
              label="Caste"
              value={caste}
              disabled={disabled}
              onChange={(e) => setCaste(e.target.value)}
              variant="standard"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item sm={3} sx={{ p: 3 }}>
            <TextField
              id="standard-select-currency"
              label="Clan / Gotra"
              value={clan}
              disabled={disabled}
              onChange={(e) => setClan(e.target.value)}
              variant="standard"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
            id="standard-select-currency"
            label="Star"
            value={star}
            onChange={(e) => setStar(e.target.value)}
            variant="standard"
          /> */}
            <Suggestion
              label="Star"
              value={Star}
              returnValue={setStar}
              disabled={disabled}
              defaultValue={star}
            />
          </Grid>
          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
            id="standard-select-currency"
            label="Last Residence City / Country"
            value={lastResidence}
            onChange={(e) => setLastResidence(e.target.value)}
            variant="standard"
          /> */}
            <Suggestion
              label="Last Residence City / Country"
              value={citiesOfCountry}
              freeSolo={true}
              returnValue={setLastResidence}
              disabled={disabled}
              defaultValue={lastResidence}
            />
          </Grid>
          {props.deseased && (
            <Grid item sm={3} sx={{ p: 3 }}>
              <TextField
                id="standard-select-currency"
                label="Death Location"
                disabled={disabled}
                value={deathLocation}
                onChange={(e) => setDeathLocation(e.target.value)}
                variant="standard"
                sx={{ width: "100%" }}
              />
            </Grid>
          )}

          {/*           <Grid item sm={3} sx={{ p: 3 }}>

          <TextField
            id="standard-select-currency"
            select
            label="Add Details Visiblity"
            value={addDetailsVisiblity}
            onChange={(e) => setAddDetailsVisiblity(e.target.value)}
            variant="standard"
          >
            {Visiblity.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
          </TextField>
        </Box> */}
          {props.deseased && (
            <Grid item sm={3} sx={{ p: 3 }}>
              <TextField
                id="standard-select-currency"
                label="Mortal Remaining"
                value={mortalRemaining}
                disabled={disabled}
                onChange={(e) => setMortalRemaining(e.target.value)}
                variant="standard"
                sx={{ width: "100%" }}
              />
            </Grid>
          )}
          {props.deseased && (
            <Grid item sm={3} sx={{ p: 3 }}>
              <TextField
                id="standard-select-currency"
                label="Mortal Remaining Location"
                value={mortalRemainingLocation}
                disabled={disabled}
                onChange={(e) => setMortalRemainingLocation(e.target.value)}
                variant="standard"
                sx={{ width: "100%" }}
              />
            </Grid>
          )}
          <Grid item sm={12} sx={{ p: 3 }}>
            <TextareaAutosize
              id="standard-select-currency"
              multiline
              placeholder="Add Details"
              minRows={2}
              maxRows={4}
              inputProps={{ maxLength: 1000 }}
              defaultValue={addDetails}
              disabled={disabled}
              onChange={(e) => setAddDetails(e.target.value)}
              variant="standard"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
              id="standard-select-currency"
              select
              label="Visiblity"
              value={visibility}
              disabled={disabled}
              onChange={(e) => setVisiblity(e.target.value)}
              variant="standard"
              sx={{ width: "100%" }}
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
              defaultValue={visibility}
            />
          </Grid>
        </Grid>
      </Box>
      <Box justifyContent={"center"} textAlign="center">
        <Button
          disabled={disableButton || dobValidation}
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
export default connect(mapStateToProp, { aboutLgAction })(PersonalForm);
