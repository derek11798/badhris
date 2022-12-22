import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import { lgIdAction, aboutLgAction } from "../../redux/actions";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Spinner from "../mui-spinner";
import AlertMessage from "../mui-alertmessage";
import validator from "validator";
import Snackbar from "@mui/material/Snackbar";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import MuiAlert from "@mui/material/Alert";
import Suggestion from "../mui-suggestion";
import { grid } from "@mui/system";
import ConfirmationDialogBox from "../mui-confirmationdialoguebox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Paper from "@mui/material/Paper";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Gender = ["Male", "Female"];
const titles = ["Mr", "Mrs", "Ms", "Master", "Baby"];
const Deseased = ["Yes", "No"];
const Visiblity = ["Public", "Family"];
const Relation = [
  "Mother",
  "Father",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Wife",
  "Husband",
];

function AboutForm(props) {
  const [selfLg, setSelfLg] = useState(false);

  const [firstName, setFirstName] = useState(
    props.aboutLg.first_name ? props.aboutLg.first_name : ""
  );
  const [addDetails, setAddDetails] = useState(
    props.aboutLg.basic_add_details ? props.aboutLg.basic_add_details : ""
  );
  const [secondName, setSecondName] = useState(
    props.aboutLg.last_name ? props.aboutLg.last_name : ""
  );
  const [nickName, setNickName] = useState(
    props.aboutLg.nickname ? props.aboutLg.nickname : ""
  );
  const [gender, setGender] = useState(
    props.aboutLg.gender ? props.aboutLg.gender : ""
  );
  const [title, setTitle] = useState(
    props.aboutLg.title ? props.aboutLg.title : ""
  );
  const [lgurl, setLgurl] = useState(
    props.aboutLg.lg_url ? props.aboutLg.lg_url : ""
  );
  const [deseased, setDeseased] = useState(
    props.aboutLg.deceased ? props.aboutLg.deceased : "No"
  );
  const [visiblity, setVisiblity] = useState(
    props.aboutLg.basic_visib ? props.aboutLg.basic_visib : "Public"
  );
  const [description, setDescription] = useState(
    props.aboutLg.short_desc ? props.aboutLg.short_desc : ""
  );
  const [email, setEmail] = useState(
    selfLg
      ? props.emailId
      : props.aboutLg.email_id
      ? props.aboutLg.email_id
      : ""
  );
  const [urlAvailable, setUrlAvailable] = useState(true);
  const [baseRelation, setBaseRelation] = useState("");
  const [baseRelationLg, setBaseRelationLg] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [firstNameValidation, setFirstNameValidation] = useState(false);
  const [secondNameValidation, setSecondNameValidation] = useState(false);
  const [lgUrlValidation, setLgUrlValidation] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmDialogueBox, setConfirmDialogueBox] = useState(false);

  const handleFormSubmit = () => {
    if (!selfLg && !props.lgId) {
      setConfirmDialogueBox(true);
    } else {
      updateForm();
    }
  };
  const disableButtonForNoValueChange = () => {
    console.log("edit mode state ", props.editModeState);
    if (props.editModeState && props.lgId) {
      if (
        title == props.aboutLg.title &&
        firstName == props.aboutLg.first_name &&
        secondName == props.aboutLg.last_name &&
        nickName == props.aboutLg.nickname &&
        gender == props.aboutLg.gender &&
        email == props.aboutLg.email_id &&
        lgurl == props.aboutLg.lg_url &&
        deseased == props.aboutLg.deceased &&
        addDetails == props.aboutLg.basic_add_details &&
        description == props.aboutLg.short_desc
      ) {
        console.log("same value disable butto true");
        setDisableButton(true);
      } else {
        console.log("same value disable butto false");
        setDisableButton(false);
      }
    }
  };

  useEffect(() => {
    if (email != "") {
      console.log("email validation on edit");
      setEmailValidation(validator.isEmail(email) ? false : true);
    } else {
      setEmailValidation(false);
    }
  }, [email]);

  useEffect(() => {
    if (selfLg) {
      setEmail(selfLg ? props.emailId : "");
    }
  }, [selfLg]);

  useEffect(() => {
    if (!selfLg) {
      // if(props.aboutLg.lg_id){
      //   setDisableButton(false)
      // }
      if (
        firstName &&
        secondName &&
        nickName &&
        gender &&
        title &&
        // email &&
        lgurl &&
        description &&
        // baseRelation &&
        // baseRelationLg &&
        emailValidation == false &&
        lgUrlValidation == false
      ) {
        console.log("notself lg also disable button false");
        setDisableButton(false);
        if (emailValidation == false && lgUrlValidation == false) {
          disableButtonForNoValueChange();
        }
      } else {
        console.log("notself lg also disable button true");
        setDisableButton(true);
        if (emailValidation == false && lgUrlValidation == false) {
          disableButtonForNoValueChange();
        }
      }
    } else {
      if (
        firstName &&
        secondName &&
        nickName &&
        gender &&
        title &&
        // email &&
        lgurl &&
        description &&
        !emailValidation &&
        !lgUrlValidation
      ) {
        console.log("self lg also disable button false");
        setDisableButton(false);
        if (emailValidation == false && lgUrlValidation == false) {
          disableButtonForNoValueChange();
        }
      } else {
        console.log("self lg also disable button true");
        setDisableButton(true);
        if (emailValidation == false && lgUrlValidation == false) {
          disableButtonForNoValueChange();
        }
      }
    }
  }, [
    firstName,
    secondName,
    nickName,
    gender,
    title,
    email,
    lgurl,
    description,
    deseased,
    baseRelation,
    addDetails,
    baseRelationLg,
    isEmpty,
    emailValidation,
    lgUrlValidation,
    props.aboutLg.lg_id,
    props.ownedLg,
    props.editModeState,
  ]);

  useEffect(() => {
    if (lgurl != "") {
      if (lgurl != props.aboutLg.lg_url) {
        checkLgUrl(lgurl);
      }
    }
  }, [lgurl]);

  useEffect(() => {
    if (deseased == "No") {
      props.deseased(false);
    } else {
      props.deseased(true);
    }
  }, [deseased]);

  useEffect(() => {
    checkIfSelfLG();
  }, [props.ownedLg]);

  const checkIfSelfLG = () => {
    if (props.ownedLg[0]) {
      setSelfLg(false);
      console.log("not self lg ", props.ownedLg);
    } else {
      setSelfLg(true);
      console.log("self lg ", props.ownedLg);
    }
  };

  useEffect(() => {
    if (firstName.length >= 45) {
      setFirstNameValidation(true);
    } else {
      setFirstNameValidation(false);
    }
  }, [firstName]);

  useEffect(() => {
    if (secondName.length >= 45) {
      setSecondNameValidation(true);
    } else {
      setSecondNameValidation(false);
    }
  }, [secondName]);

  useEffect(() => {
    if (lgurl) {
      setLgUrlValidation(validator.isAlphanumeric(lgurl) ? false : true);
    }
  }, [lgurl]);

  const updateForm = () => {
    // setFirstNameValidation(validator.isAlpha(firstName) ? false : true);
    // setSecondNameValidation(validator.isAlpha(secondName) ? false : true);
    // setLgUrlValidation(validator.isAlphanumeric(lgurl) ? false : true);

    let form_details;
    let Body;
    let ownerType = { user_owner_type: "Owner" };
    if (
      !emailValidation &&
      !firstNameValidation &&
      !secondNameValidation &&
      !lgUrlValidation
    ) {
      if (props.lgId) {
        form_details = {
          lg_id: props.lgId,
          lg_url: lgurl,
          email_id: email,
          title: title,
          first_name: firstName,
          last_name: secondName,
          nickname: nickName,
          short_desc: description,
          deceased: deseased,
          gender: gender,
          visibility: visiblity,
          // base_relation: selfLg ? "Self" : baseRelation,
          // base_lg_id: selfLg ? "" : baseRelationLg,
          add_details: addDetails,
          basic_add_details: addDetails,
        };
      } else {
        form_details = {
          lg_url: lgurl,
          email_id: email,
          title: title,
          first_name: firstName,
          last_name: secondName,
          nickname: nickName,
          short_desc: description,
          deceased: deseased,
          gender: gender,
          visibility: visiblity,
          base_relation: selfLg ? "Self" : baseRelation,
          base_lg_id: selfLg ? "" : baseRelationLg,
          add_details: addDetails,
          basic_add_details: addDetails,
        };
      }

      if (props.lgId) {
        Body = JSON.stringify({
          basic_details: form_details,
          lg_id: props.lgId,
        });
      } else {
        Body = JSON.stringify({
          basic_details: form_details,
        });
      }
      const requestOptions = {
        method: props.lgId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          UserId: `${props.userId}`,
          token: `${props.authToken}`,
        },
        body: Body,
      };
      setSpinner(true);
      fetch("https://lifograf.com/lg_api/lgBasic", requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          if (!responseJSON.error) {
            if (requestOptions.method == "POST") {
              props.lgIdAction(responseJSON.lg_id);
            }
            setSpinner(false);
            setAlert(true);
            setAlertType(true);
            setAlertMessage(responseJSON.message);
            props.aboutLgAction({
              ...props.aboutLg,
              ...form_details,
              ...ownerType,
            });
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
    }
  };

  const checkLgUrl = (e) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        UserId: `${props.userId}`,
        token: `${props.authToken}`,
      },
      body: JSON.stringify({
        lg_url: e,
      }),
    };
    fetch("https://lifograf.com/lg_api/chkLgUrl", requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        if (!responseJSON.error) {
          if (responseJSON.message === "URL is available") {
            if (props.lgId && lgurl == props.aboutLg.lg_url) {
              setUrlAvailable(false);
            } else {
              setUrlAvailable(true);
            }
            setUrlAvailable(true);
          } else {
            setUrlAvailable(false);
          }
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
          width: "100%",
          // "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        display="grid"
        // gridTemplateColumns="repeat(12, 1fr)"
        gap={3}
        autoComplete="on"
      >
        <Grid container columns={{ sm: 9 }}>
          {!selfLg && !props.lgId && (
            <Grid
              item
              sm={12}
              sx={{
                p: 3,
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  width: "100%",
                  p: 3,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography
                  align="left"
                  sx={{
                    color: "#000000",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {"This life story is the "}
                </Typography>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Relation"
                  value={baseRelation}
                  required
                  disabled={props.aboutLg.lg_id}
                  onChange={(e) => setBaseRelation(e.target.value)}
                  variant="standard"
                  sx={{ mx: 3, mt: -3, width: "20%" }}
                >
                  {Relation.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <Typography
                  align="left"
                  sx={{
                    m: 0,
                    color: "#000000",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  of
                </Typography>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Person"
                  value={baseRelationLg}
                  required
                  disabled={props.aboutLg.lg_id}
                  onChange={(e) => setBaseRelationLg(e.target.value)}
                  variant="standard"
                  sx={{ mx: 3, mt: -3, width: "20%" }}
                >
                  {props.ownedLg.map((option) => (
                    <MenuItem value={option.lg_id}>
                      {option.fname + " " + option.lname}
                    </MenuItem>
                  ))}
                </TextField>
              </Paper>
            </Grid>
          )}
          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
              id="standard-select-currency"
              select
              label="Title"
              value={title}
              disabled={
                selfLg
                  ? false
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
              required
              onChange={(e) => setTitle(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            >
              {titles.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <Suggestion
              label="Title"
              value={titles}
              returnValue={setTitle}
              disabled={
                selfLg
                  ? false
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
              defaultValue={title}
            />
          </Grid>
          <Grid item sm={3} sx={{ p: 3 }}>
            <TextField
              label="First Name"
              inputProps={{ maxLength: 45 }}
              value={firstName}
              required
              error={firstNameValidation}
              helperText={
                firstNameValidation ? "Only 45 characters are allowed" : ""
              }
              onChange={(e) => setFirstName(e.target.value)}
              variant="standard"
              disabled={
                selfLg
                  ? false
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item sm={3} component={Box} sx={{ p: 3 }}>
            <TextField
              id="standard-select-currency"
              label="Last Name"
              inputProps={{ maxLength: 45 }}
              value={secondName}
              error={secondNameValidation}
              helperText={
                secondNameValidation ? "Only 45 characters are allowed" : ""
              }
              required
              onChange={(e) => setSecondName(e.target.value)}
              variant="standard"
              disabled={
                selfLg
                  ? false
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item sm={3} sx={{ p: 3 }}>
            <TextField
              id="standard-select-currency"
              label="Nick Name"
              inputProps={{ maxLength: 45 }}
              value={nickName}
              required
              onChange={(e) => setNickName(e.target.value)}
              variant="standard"
              disabled={
                selfLg
                  ? false
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            {/* <TextField
              id="standard-select-currency"
              select
              label="Gender"
              value={gender}
              required
              onChange={(e) => setGender(e.target.value)}
              variant="standard"
              disabled={
                selfLg
                  ? false
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
              sx={{ width: "100%", m: 1 }}
            >
              {Gender.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <Suggestion
              label="Gender"
              value={Gender}
              returnValue={setGender}
              defaultValue={gender}
              disabled={
                selfLg
                  ? false
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            <TextField
              id="standard-select-currency"
              label="Email"
              value={email}
              error={emailValidation}
              helperText={emailValidation ? "Enter a proper Email" : ""}
              required={selfLg ? true : false}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
              disabled={
                selfLg
                  ? true
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item sm={3} sx={{ p: 3 }}>
            <TextField
              id="standard-select-currency"
              label="Public Url"
              value={lgurl}
              required
              color={urlAvailable ? "success" : "error"}
              onChange={(e) => setLgurl(e.target.value)}
              variant="standard"
              disabled={
                selfLg
                  ? false
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
              sx={{ width: "100%" }}
              error={!urlAvailable || lgUrlValidation}
              helperText={
                lgurl
                  ? !urlAvailable
                    ? lgUrlValidation
                      ? "Numbers and letters are only allowed in URL"
                      : "URL is unavailable enter a different URL"
                    : lgUrlValidation
                    ? "Numbers and letters are only allowed in URL"
                    : "URL is available"
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography color={"blue"} fontWeight="bold">
                      {"www.lifograf.com/profile/"}
                    </Typography>
                  </InputAdornment>
                ),
                // endAdornment: (
                //   <InputAdornment position="end">
                //     {lgurl == "" ? "" : (urlAvailable ? <DoneIcon /> : <CloseIcon />)}
                //   </InputAdornment>
                // ),
              }}
              inputProps={{ maxLength: 15 }}
            />
          </Grid>
          {!selfLg && (
            <Grid item sm={3} sx={{ p: 3 }}>
              {/* <TextField
                id="standard-select-currency"
                select
                label="Deceased"
                value={deseased}
                onChange={(e) => setDeseased(e.target.value)}
                variant="standard"
                disabled={
                  selfLg
                    ? false
                    : baseRelation && baseRelationLg
                    ? props.lgId
                      ? true
                      : false
                    : props.lgId
                    ? false
                    : true
                }
                sx={{ width: "100%", m: 1 }}
              >
                {Deseased.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField> */}
              <Suggestion
                label="Deceased"
                returnValue={setDeseased}
                value={Deseased}
                defaultValue={deseased}
                disabled={
                  selfLg
                    ? false
                    : baseRelation && baseRelationLg
                    ? props.lgId
                      ? true
                      : false
                    : props.lgId
                    ? false
                    : true
                }
              />
            </Grid>
          )}

          {/* {!selfLg && (
          <Grid item sm={3} sx={{ m: 0 }}>
            <TextField
              id="standard-select-currency"
              select
              label="Base Relation"
              value={baseRelationLg}
              required
              disabled={selfLg ? false :props.aboutLg.lg_id}
              onChange={(e) => setBaseRelationLg(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            >
              {props.ownedLg.map((option) => (
                <MenuItem value={option.lg_id}>
                  {option.fname + " " + option.lname}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        {!selfLg && (
          <Grid item sm={3} sx={{ m: 0 }}>
            <TextField
              id="standard-select-currency"
              select
              label="Base Relation to"
              value={baseRelation}
              required
              disabled={selfLg ? false :props.aboutLg.lg_id}
              onChange={(e) => setBaseRelation(e.target.value)}
              variant="standard"
              sx={{ width: "100%", m: 1 }}
            >
              {Relation.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )} */}
          <Grid item sm={12} sx={{ p: 3 }}>
            <TextareaAutosize
              id="standard-select-currency"
              placeholder="Short Intro / Quote"
              multiline
              fullWidth
              minRows={2}
              maxRows={4}
              inputProps={{ maxLength: 250 }}
              defaultValue={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              variant="standard"
              disabled={
                selfLg
                  ? false
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
              style={{ width: "100%" }}
              sx={{ m: 0 }}
            />
          </Grid>

          <Grid item sm={12} sx={{ p: 3 }}>
            <TextareaAutosize
              id="standard-select-currency"
              placeholder="Add Details"
              multiline
              minRows={2}
              maxRows={4}
              fullWidth
              inputProps={{ maxLength: 1000 }}
              defaultValue={addDetails}
              onChange={(e) => setAddDetails(e.target.value)}
              variant="standard"
              disabled={
                selfLg
                  ? false
                  : baseRelation && baseRelationLg
                  ? props.lgId
                    ? true
                    : false
                  : props.lgId
                  ? false
                  : true
              }
              style={{ width: "100%" }}
              sx={{ m: 0, resize: "both" }}
            ></TextareaAutosize>
          </Grid>

          {/* </Box> */}
        </Grid>
      </Box>

      <AlertMessage
        open={alert}
        close={setAlert}
        message={alertMessage}
        type={alertType}
      ></AlertMessage>
      <Box justifyContent={"center"} textAlign="center">
        <Button
          sx={{ alignItem: "center", color: "#FFFFFF", mb: 1 }}
          onClick={() => {
            handleFormSubmit();
          }}
          variant="contained"
          disabled={disableButton}
        >
          Save
        </Button>
      </Box>
      <ConfirmationDialogBox
        open={confirmDialogueBox}
        close={setConfirmDialogueBox}
        message={
          "Relationship entered onced cannot be modified are you sure you want to proceed"
        }
        title={"Confirm Relationship"}
        onConfirm={updateForm}
      />
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
    emailId: state.commonState.emailId,
    ownedLg: state.commonState.ownedLg,
  };
};
export default connect(mapStateToProp, { lgIdAction, aboutLgAction })(
  AboutForm
);
