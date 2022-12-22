import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { GoogleLogin } from "@react-oauth/google";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bg_1 from "../../images/bg_2.svg";
import google from "../../images/google_logo.png";
import facebook from "../../images/Facebook_Logo.png";
import { Link } from "react-router-dom";
import { border, margin } from "@mui/system";
import validator from "validator";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../mui-signup/style.css";
import { useParams, useNavigate, useMatch } from "react-router-dom";
import { connect } from "react-redux";
import AlertMessage from "../MUI-2.0/Components/AlertMessage/AlertMessage";
import {
  authTokenAction,
  userIdAction,
  userNameAction,
  emailIdAction,
} from "../../redux/actions";
import Spinner from "../mui-spinner";
import SignUp from "../MUI-2.0/Components/Forms/SignUp/SignUp";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

const LogInSide = (props) => {
  const [emailValidation, setEmailValidation] = useState(false);
  //   const [passwordValidation, setPasswordValidation] = useState(false);
  //   const [confirmpasswordValidation, setConfirmPasswordValidation] =
  //     useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //   const [confirmPassword, setConfirmPassword] = useState();
  //   const [EmailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  //   const [verificationEmailSent, setEmailSent] = useState(false);
  const [loginResponse, setLoginResponse] = useState();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (redirectToHome) {
      navigate("/home");
      setRedirectToHome(false);
    }
  }, [redirectToHome]);

  const onSubmit = () => {
    // setConfirmPasswordValidation(
    //   validator.equals(password, confirmPassword) ? false : true
    // );
    setEmailValidation(validator.isEmail(email) ? false : true);
    // setPasswordValidation(validator.isStrongPassword(password) ? false : true);
    if (
      // validator.equals(password, confirmPassword) &&
      validator.isEmail(email)
      // validator.isStrongPassword(password)
    ) {
      loginApi(email, password);
      console.log("fetch API");
    }
  };

  const googleAuthentication = (token) => {
    setSpinner(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authToken: token,
      }),
    };
    fetch("https://lifograf.com/lg_api/gAuth", requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.error) {
          setSpinner(false);
          const responseMessage = responseJSON.message.split("-");
          console.log(responseMessage[0]);
        } else {
          setSpinner(false);
          setRedirectToHome(true);
          props.authTokenAction(responseJSON.usrToken);
          props.userIdAction(responseJSON.usrId);
          props.userNameAction(responseJSON.usrName);
          props.emailIdAction(responseJSON.usrEmail);
        }
      })
      .catch((error) => {
        console.log(error);
        setAlert(true);
        setAlertType(false);
        setAlertMessage("something went wrong please try again later");
      });
  };

  const loginApi = (email, password) => {
    setSpinner(true);
    // console.log(email, password);
    // const body= {
    //   emailid : email,
    //   password : password,
    //   cpassword : confirmPassword
    // }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailid: email,
        password: password,
      }),
    };
    fetch("https://lifograf.com/lg_api/login", requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.error) {
          setSpinner(false);
          const responseMessage = responseJSON.message.split("-");
          setLoginResponse(responseMessage[0]);
          setInvalidCredentials(true);
          console.log(responseMessage[0]);
        } else {
          setRedirectToHome(true);
          props.authTokenAction(responseJSON.usrToken);
          props.userIdAction(responseJSON.usrId);
          props.emailIdAction(responseJSON.usrEmail);
          setSpinner(false);
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
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={{ height: "100%", ml: { xs: "none", sm: 10, md: 10 } }}
      >
        {spinner && <Spinner />}
        <CssBaseline />
        <Grid item xs={12} sm={4} md={4} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h3">
              WELCOME BACK !
            </Typography>
            {/* <Grid item sx={{ margin: 2 }}> */}
            <Typography component="h3" variant="body1">
              Don't have an account? &nbsp;<Link to="/signup">Sign Up</Link>
            </Typography>
            {/* </Grid> */}
            {/* <Grid item sx={{ margin: 2 }}> */}
            <Typography component="h3" variant="h5">
              Login with
            </Typography>
            {/* </Grid> */}
            <Box
              sx={{
                display: "flex",
                margin: 2,
              }}
            >
              <Box
                item
                sx={{
                  // border: 3,
                  // borderRadius: 2,
                  // borderColor: "#789ADE",
                  display: "flex",
                  marginRight: 20,
                }}
              >
                {/* <img src={google} /> */}
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    googleAuthentication(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  useOneTap
                  type="icon"
                  shape="rectangular"
                  logo_alignment="center"
                  size="large"
                />
              </Box>
              {/* <Grid
                item
                sx={{
                  border: 3,
                  borderRadius: 2,
                  borderColor: "#789ADE",
                  display: "flex",
                }}
              > */}
              <img src={facebook} />
              {/* </Grid> */}
            </Box>
            <Box sx={{ width: 400 }}>
              <div className="block">
                <hr />
                <div className="text">OR</div>
                <hr />
              </div>
            </Box>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <SignUp />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailValidation}
                helperText={emailValidation ? "Enter a proper email" : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // error={passwordValidation}
                // helperText={passwordValidation ? "Enter a strong password" : ""}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                error={confirmpasswordValidation}
                helperText={
                  confirmpasswordValidation ? "Password does not match" : ""
                }
                // autoComplete="confirmPassword"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              /> */}
              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={() => {
                        setCheckBox(!checkBox);
                      }}
                    />
                  }
                  label="Remember me"
                />
                <Box item sx={{ marginLeft: 18, marginTop: 1 }}>
                  <Link to="#">Forgot password?</Link>
                </Box>
              </Box>
              <Button
                // type="submit"
                // disabled={checkBox ? false : true}
                fullWidth
                variant="contained"
                onClick={() => {
                  onSubmit();
                }}
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={false} sm={8} md={8} sx={{ mt: 10 }}>
          <Box
            component={Grid}
            item
            display={{ xs: "none", sm: "flex", sx: "flex" }}
          >
            <img src={bg_1} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={invalidCredentials}
            autoHideDuration={4000}
            onClose={() => {
              setInvalidCredentials(false);
            }}
          >
            <Alert
              onClose={() => {
                setInvalidCredentials(false);
              }}
              severity="error"
              sx={{ width: "100%" }}
            >
              {loginResponse}
            </Alert>
          </Snackbar>
        </Grid>
        {/* <AlertMessage
          open={alert}
          close={setAlert}
          message={alertMessage}
          type={alertType}
        ></AlertMessage> */}
      </Grid>
    </ThemeProvider>
  );
};

const mapStateToProp = (state) => {
  return {
    authToken: state.commonState.authToken,
  };
};

export default connect(mapStateToProp, {
  authTokenAction,
  userIdAction,
  userNameAction,
  emailIdAction,
})(LogInSide);
