import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import AlertMessage from "../mui-alertmessage";
import { aboutLgAction } from "../../redux/actions";
import Spinner from "../mui-spinner";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import SuggestionChip from "../mui-suggestionChip";
import Suggestion from "../mui-suggestion";
import { educational_Area } from "../../helpers/dropdownlist";
import VisibilityIcon from "@mui/icons-material/Visibility";

const education_Level = [
  "None",
  "High School",
  "Secondary school",
  "Graduate",
  "Post graduate",
  "Doctorate",
];
// const educational_Area = [
//   "Science/Tech",
//   "Arts",
//   "Humanities",
//   "Social Science",
//   "Medical",
//   "Business/Commerce",
// ];
const Visiblity = [
  "Public",
  "2nd cousins",
  "1st cousins",
  "Direct Family",
  "Descendants",
];

function EducationForm(props) {
  const [educationLevel, setEducationLevel] = useState(
    props.aboutLg.edu_lvl ? props.aboutLg.edu_lvl : ""
  );
  const [educationalArea, setEducationalArea] = useState(
    props.aboutLg.edu_area ? props.aboutLg.edu_area.split("|") : []
  );
  const [addDetails, setAddDetails] = useState();
  const [addDetailsVisiblity, setAddDetailsVisiblity] = useState(null);
  const [visiblity, setVisiblity] = useState(
    props.aboutLg.edwrk_visib ? props.aboutLg.edwrk_visib : "Public"
  );
  const [educationalDetails, setEducationalDetails] = useState(
    props.aboutLg.edu_details ? props.aboutLg.edu_details : ""
  );
  const [mainOccupation, setMainOccupation] = useState(
    props.aboutLg.main_occupation
      ? props.aboutLg.main_occupation.split("|")
      : []
  );
  const [secondaryOccupation, setSecondaryOccupation] = useState(
    props.aboutLg.sec_occupation ? props.aboutLg.sec_occupation.split("|") : []
  );
  const [occupationDetails, setOccupationDetails] = useState(
    props.aboutLg.occu_details ? props.aboutLg.occu_details : ""
  );
  const [disabled, setDisabled] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (
      educationLevel == props.aboutLg.edu_lvl &&
      educationalArea.join("|") == props.aboutLg.edu_area &&
      educationalDetails == props.aboutLg.edu_details &&
      mainOccupation.join("|") == props.aboutLg.main_occupation &&
      secondaryOccupation.join("|") == props.aboutLg.sec_occupation &&
      occupationDetails == props.aboutLg.occu_details &&
      visiblity == props.aboutLg.edwrk_visib
    ) {
      setDisableButton(true);
    } else if (
      educationLevel == "" &&
      educationalArea == [] &&
      educationalDetails == "" &&
      mainOccupation == [] &&
      secondaryOccupation == [] &&
      occupationDetails == "" &&
      visiblity == "Public"
    ) {
      console.log("deseased false ans disable button false2");
      setDisableButton(true);
    } else if (
      educationLevel == "" &&
      educationalArea == [] &&
      educationalDetails == "" &&
      mainOccupation == [] &&
      secondaryOccupation == [] &&
      occupationDetails == "" &&
      addDetails == "" &&
      visiblity == "Public"
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [
    educationLevel,
    educationalArea,
    educationalDetails,
    mainOccupation,
    secondaryOccupation,
    occupationDetails,
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
      edu_lvl: educationLevel,
      edu_area: educationalArea.join("|"),
      edu_details: educationalDetails,
      main_occupation: mainOccupation.join("|"),
      sec_occupation: secondaryOccupation.join("|"),
      occu_details: occupationDetails,
      add_details: addDetails,
      add_detail_visb: addDetailsVisiblity,
      visibility: visiblity,
      edwrk_visib: visiblity,
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
    fetch("https://lifograf.com/lg_api/lgEduWork", requestOptions)
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
          m: 1,
          display: "flex",
          flexWrap: "wrap",
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container columns={9} sx={{ flexGrow: "1" }}>
          <Grid item sm={4.5} sx={{ p: 3 }}>
            {/* <TextField
              select
              disabled={disabled}
              label="Educational Level"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            >
              {education_Level.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <Suggestion
              label="Educational Level"
              value={education_Level}
              returnValue={setEducationLevel}
              disabled={disabled}
              defaultValue={educationLevel}
            />
          </Grid>

          <Grid item sm={4.5} sx={{ p: 3 }}>
            {/* <TextField
              select
              disabled={disabled}
              label="Educational Area"
              value={educationalArea}
              onChange={(e) => setEducationalArea(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            >
              {educational_Area.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <SuggestionChip
              label="Educational Area"
              value={educational_Area}
              returnValue={setEducationalArea}
              // disabled={disabled}
              defaultValue={educationalArea}
            />
          </Grid>

          <Grid item sm={12} sx={{ p: 3 }}>
            <TextareaAutosize
              placeholder="Educational Details"
              disabled={disabled}
              multiline
              fullWidth
              minRows={2}
              maxRows={4}
              inputProps={{ maxLength: 1000 }}
              value={educationalDetails}
              onChange={(e) => setEducationalDetails(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
              style={{ width: "100%" }}
            />
          </Grid>

          {/*           <Grid item sm={3} sx={{ p: 3 }}>

          <TextField
            select
            label="Add Details Visiblity"
            value={addDetailsVisiblity}
            onChange={(e) => setAddDetailsVisiblity(e.target.value)}
            variant="standard"
            sx={{width : "40ch", m : 1}}
          >
            {Visiblity.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
                  </Grid>
 */}

          <Grid item sm={4.5} sx={{ p: 3 }}>
            {/* <TextField
              label="Main Occupation"
              disabled={disabled}
              value={mainOccupation}
              onChange={(e) => setMainOccupation(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            /> */}
            <SuggestionChip
              label="Main Occupation"
              value={[]}
              returnValue={setMainOccupation}
              defaultValue={mainOccupation}
            />
          </Grid>

          <Grid item sm={4.5} sx={{ p: 3 }}>
            {/* <TextField
              label="Secondary Occupation"
              disabled={disabled}
              value={secondaryOccupation}
              onChange={(e) => setSecondaryOccupation(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            /> */}
            <SuggestionChip
              label="secondary Occupation"
              value={[]}
              returnValue={setSecondaryOccupation}
              defaultValue={secondaryOccupation}
            />
          </Grid>

          <Grid item sm={12} sx={{ p: 3 }}>
            <TextareaAutosize
              placeholder="Occupation Details"
              disabled={disabled}
              inputProps={{ maxLength: 1000 }}
              multiline
              fullWidth
              minRows={2}
              maxRows={4}
              value={occupationDetails}
              onChange={(e) => setOccupationDetails(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
              style={{ width: "100%" }}
            />
          </Grid>

          {/* <Grid item sm={12} sx={{ p: 3 }}>
            <TextareaAutosize
              placeholder="Add Details"
              multiline
              minRows={2}
              maxRows={4}
              fullWidth
              disabled={disabled}
              inputProps={{ maxLength: 1000 }}
              defaultValue={addDetails}
              onChange={(e) => setAddDetails(e.target.value)}
              variant="standard"
              sx={{ m: 1 }}
              style={{ width: "100%" }}
            />
          </Grid> */}

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
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

      {/*           <Grid item sm={3} sx={{ p: 3 }}>
       */}
      {/* <TextField
            label="Main Occupation"
            value={mainOccupation}
            onChange={(e) => setMainOccupation(e.target.value)}
            variant="standard"
          /> */}
      {/*           </Grid>
       */}
      {/*           <Grid item sm={3} sx={{ p: 3 }}>
       */}
      {/* <TextField
            label="Secondary Occupation"
            value={secondaryOccupation}
            onChange={(e) => setSecondaryOccupation(e.target.value)}
            variant="standard"
          /> */}
      {/*           </Grid>
       */}
      {/*           <Grid item sm={3} sx={{ p: 3 }}>
       */}
      {/* <TextField
            label="Occupation Details"
            value={occupationDetails}
            onChange={(e) => setOccupationDetails(e.target.value)}
            variant="standard"
          /> */}
      {/*           </Grid>
       */}
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
export default connect(mapStateToProp, { aboutLgAction })(EducationForm);
