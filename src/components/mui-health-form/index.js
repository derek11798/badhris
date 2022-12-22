import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import AlertMessage from "../MUI-2.0/Components/AlertMessage/AlertMessage";
import { aboutLgAction } from "../../redux/actions";
import Spinner from "../mui-spinner";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import SuggestionChip from "../mui-suggestionChip";
import Suggestion from "../mui-suggestion";
import VisibilityIcon from "@mui/icons-material/Visibility";

const blood_group = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
const smoking_habit = [
  "Never",
  "Experimented",
  "Occasional",
  "Regular",
  "Heavy",
];
const physical_activity = ["Low", "Medium", "High"];
const Visiblity = [
  "Public",
  "2nd cousins",
  "1st cousins",
  "Direct Family",
  "Descendants",
];

function HealthForm(props) {
  const [bloodGroup, setBloodGroup] = useState(
    props.aboutLg.blood_group ? props.aboutLg.blood_group : ""
  );
  const [smoking, setSmoking] = useState(
    props.aboutLg.smoking ? props.aboutLg.smoking : ""
  );
  const [drinking, setDrinking] = useState(
    props.aboutLg.drinking ? props.aboutLg.drinking : ""
  );
  const [chronicIllness, setChronicIllness] = useState(
    props.aboutLg.chronic_illness
      ? props.aboutLg.chronic_illness.split("|")
      : []
  );
  const [physicalActivity, setPhysicalActivity] = useState(
    props.aboutLg.physical_activity ? props.aboutLg.physical_activity : ""
  );
  const [addDetails, setAddDetails] = useState(
    props.aboutLg.health_details ? props.aboutLg.health_details : ""
  );
  const [addDetailsVisiblity, setAddDetailsVisiblity] = useState(null);
  const [visiblity, setVisiblity] = useState(
    props.aboutLg.hlth_visib ? props.aboutLg.hlth_visib : "Public"
  );
  const [disabled, setDisabled] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (props.lgId) {
      setDisabled(false);
    }
  }, []);

  useEffect(() => {
    if (
      bloodGroup == props.aboutLg.blood_group &&
      physicalActivity == props.aboutLg.physical_activity &&
      chronicIllness.join("|") == props.aboutLg.chronic_illness &&
      smoking == props.aboutLg.smoking &&
      drinking == props.aboutLg.drinking &&
      addDetails == props.aboutLg.health_details &&
      visiblity == props.aboutLg.hlth_visib
    ) {
      setDisableButton(true);
    } else if (
      bloodGroup == "" &&
      physicalActivity == "" &&
      chronicIllness == [] &&
      smoking == "" &&
      drinking == "" &&
      addDetails == "" &&
      visiblity == "Public"
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [
    bloodGroup,
    physicalActivity,
    chronicIllness,
    smoking,
    drinking,
    addDetails,
    visiblity,
  ]);

  const updateForm = () => {
    setSpinner(true);
    const form_details = {
      blood_group: bloodGroup,
      smoking: smoking,
      drinking: drinking,
      chronic_illness: chronicIllness.join("|"),
      physical_activity: physicalActivity,
      add_details: addDetails,
      add_detail_visb: addDetailsVisiblity,
      visibility: visiblity,
      health_details: addDetails,
      hlth_visib: visiblity,
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
    fetch("https://lifograf.com/lg_api/lgHealth", requestOptions)
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

  // return (
  //   <Box>
  //     {spinner && <Spinner />}
  //     <Box
  //       component="form"
  //       sx={{
  //         "& .MuiTextField-root": { m: 1, width: "47ch" },
  //         m: 1,
  //         display: "flex",
  //         flexWrap: "wrap",
  //       }}
  //       noValidate
  //       autoComplete="off"
  //     >
  //       <Grid container columns={{ sm: 9 }}>
  //         <Grid item sm={3} sx={{ p: 3 }}>
  //           <TextField
  //             select
  //             label="Blood Group"
  //             disabled={disabled}
  //             value={bloodGroup}
  //             onChange={(e) => setBloodGroup(e.target.value)}
  //             variant="standard"
  //             sx={{ width: "100%" }}
  //           >
  //             {blood_group.map((option) => (
  //               <MenuItem key={option} value={option}>
  //                 {option}
  //               </MenuItem>
  //             ))}
  //           </TextField>
  //         </Grid>
  //         <Grid item sm={3} sx={{ p: 3 }}>
  //           <TextField
  //             select
  //             label="Physical Activity"
  //             disabled={disabled}
  //             value={physicalActivity}
  //             onChange={(e) => setPhysicalActivity(e.target.value)}
  //             variant="standard"
  //             sx={{ width: "100%" }}
  //           >
  //             {physical_activity.map((option) => (
  //               <MenuItem key={option} value={option}>
  //                 {option}
  //               </MenuItem>
  //             ))}
  //           </TextField>
  //         </Grid>
  //         <Grid item sm={3} sx={{ p: 3 }}>
  //           <TextField
  //             label="Chronic Illness"
  //             disabled={disabled}
  //             value={chronicIllness}
  //             onChange={(e) => setChronicIllness(e.target.value)}
  //             variant="standard"
  //             sx={{ width: "100%" }}
  //           />
  //         </Grid>

  //         <Grid item sm={3} sx={{ p: 3 }}>
  //           <TextField
  //             select
  //             label="Smoking Habit"
  //             disabled={disabled}
  //             value={smoking}
  //             onChange={(e) => setSmoking(e.target.value)}
  //             variant="standard"
  //             sx={{ width: "100%" }}
  //           >
  //             {smoking_habit.map((option) => (
  //               <MenuItem key={option} value={option}>
  //                 {option}
  //               </MenuItem>
  //             ))}
  //           </TextField>
  //         </Grid>
  //         <Grid item sm={3} sx={{ p: 3 }}>
  //           <TextField
  //             select
  //             label="Drinking Habit"
  //             disabled={disabled}
  //             value={drinking}
  //             onChange={(e) => setDrinking(e.target.value)}
  //             variant="standard"
  //             sx={{ width: "100%" }}
  //           >
  //             {smoking_habit.map((option) => (
  //               <MenuItem key={option} value={option}>
  //                 {option}
  //               </MenuItem>
  //             ))}
  //           </TextField>
  //         </Grid>

  //         <Grid item sm={3} sx={{ p: 3 }}>
  //           <TextField
  //             multiline
  //             inputProps={{ maxLength: 1000 }}
  //             label="Add Details"
  //             disabled={disabled}
  //             value={addDetails}
  //             onChange={(e) => setAddDetails(e.target.value)}
  //             variant="standard"
  //             sx={{ width: "100%" }}
  //           />
  //         </Grid>
  //         {/* <Box sx={{ m: 3 }}> */}
  //         {/* <TextField id="standard-select-currency" label="Add Details Visiblity" value={addDetailsVisiblity} onChange={(e) => setAddDetailsVisiblity(e.target.value)} variant="standard">
  //           {Visiblity.map((option) => (
  //             <MenuItem key={option} value={option}>
  //               {option}
  //             </MenuItem>
  //           ))}
  //         </TextField> */}
  //         {/* </Box> */}
  //         <Grid item sm={3} sx={{ p: 3 }}>
  //           <TextField
  //             select
  //             label="Visiblity"
  //             disabled={disabled}
  //             value={visiblity}
  //             onChange={(e) => setVisiblity(e.target.value)}
  //             variant="standard"
  //             sx={{ width: "100%" }}
  //           >
  //             {Visiblity.map((option) => (
  //               <MenuItem key={option} value={option}>
  //                 {option}
  //               </MenuItem>
  //             ))}
  //           </TextField>
  //         </Grid>
  //         {/* <Box sx={{m : 3}}>
  //           <TextField id="standard-select-currency"  label="Occupation Details" value={occupationDetails} onChange={(e)=>setOccupationDetails(e.target.value)} variant="standard"/>
  //           </Box> */}
  //       </Grid>
  //     </Box>
  //     <Box textAlign="center" justifyContent={"center"}>
  //       <Button
  //         disabled={disabled}
  //         sx={{ alignItem: "center", color: "#FFFFFF", mb: 1 }}
  //         onClick={() => {
  //           updateForm();
  //         }}
  //         variant="contained"
  //       >
  //         Save
  //       </Button>
  //     </Box>
  //     <AlertMessage
  //       open={alert}
  //       close={setAlert}
  //       message={alertMessage}
  //       type={alertType}
  //     ></AlertMessage>
  //   </Box>
  // );
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
          // "& .MuiTextField-root": { m: 1, width: "47ch" },
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
            {/* <TextField
              select
              disabled={disabled}
              label="Blood Group"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            >
              {blood_group.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <Suggestion
              label="Blood Group"
              value={blood_group}
              returnValue={setBloodGroup}
              defaultValue={bloodGroup}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
              select
              disabled={disabled}
              label="Physical Activity"
              value={physicalActivity}
              onChange={(e) => setPhysicalActivity(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            >
              {physical_activity.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <Suggestion
              label="Physical Activity"
              value={physical_activity}
              returnValue={setPhysicalActivity}
              defaultValue={physicalActivity}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
              label="Chronic Illness"
              disabled={disabled}
              value={chronicIllness}
              onChange={(e) => setChronicIllness(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            /> */}
            <SuggestionChip
              label="Chronic Illness"
              value={[]}
              returnValue={setChronicIllness}
              defaultValue={chronicIllness}
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

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
              select
              label="Smoking"
              disabled={disabled}
              value={smoking}
              onChange={(e) => setSmoking(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            >
              {smoking_habit.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <Suggestion
              label="Smoking"
              value={smoking_habit}
              returnValue={setSmoking}
              defaultValue={smoking}
            />
          </Grid>

          {/* <Grid item sm={3} sx={{ p: 3 }}>
            <TextField
              label="Secondary Occupation"
              disabled={disabled}
              value={secondaryOccupation}
              onChange={(e) => setSecondaryOccupation(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            />
            <SuggestionChip
              label="secondary Occupation"
              value={[]}
              returnValue={setSecondaryOccupation}
              defaultValue={secondaryOccupation}
            />
          </Grid> */}

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
              select
              label="Drinking"
              disabled={disabled}
              value={drinking}
              onChange={(e) => setDrinking(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            >
              {smoking_habit.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <Suggestion
              label="Drinking"
              value={smoking_habit}
              returnValue={setDrinking}
              defaultValue={drinking}
            />
          </Grid>

          <Grid item sm={12} sx={{ p: 3 }}>
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
          </Grid>

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
export default connect(mapStateToProp, { aboutLgAction })(HealthForm);
