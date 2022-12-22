import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
import { useParams, useNavigate, useMatch } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { red } from "@mui/material/colors";
import "./style.css";
import { connect } from "react-redux";
import AlertMessage from "../MUI-2.0/Components/AlertMessage/AlertMessage";
import {
  authTokenAction,
  userIdAction,
  userNameAction,
  emailIdAction,
} from "../../redux/actions";
import Spinner from "../mui-spinner";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

const SignInSide = (props) => {
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [confirmpasswordValidation, setConfirmPasswordValidation] =
    useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userName, setUserName] = useState();
  const [EmailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [verificationEmailSent, setEmailSent] = useState(false);
  const [EmailAlert, setEmailAlert] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (redirectToHome) {
      navigate("/home");
      setRedirectToHome(false);
    }
  }, [redirectToHome]);

  const onSubmit = () => {
    setEmailAlreadyExist(false);
    setConfirmPasswordValidation(
      validator.equals(password, confirmPassword) ? false : true
    );
    setEmailValidation(validator.isEmail(email) ? false : true);
    setPasswordValidation(validator.isStrongPassword(password) ? false : true);
    console.log(typeof password);
    if (
      validator.equals(password, confirmPassword) &&
      validator.isEmail(email) &&
      validator.isStrongPassword(password)
    ) {
      signUpApi(email, password, confirmPassword);
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
          setRedirectToHome(true);
          props.authTokenAction(responseJSON.usrToken);
          props.userIdAction(responseJSON.usrId);
          props.userNameAction(responseJSON.usrName);
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

  function signUpApi(email, password, confirmPassword) {
    console.log(email, password, confirmPassword);
    setSpinner(true);
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
        cpassword: confirmPassword,
        uname: userName,
      }),
    };
    fetch("https://lifograf.com/lg_api/signup", requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.error) {
          setSpinner(false);
          const responseMessage = responseJSON.message.split("-");
          setEmailAlreadyExist(responseMessage[0]);
          setAlert(true);
          setAlertType(false);
          setAlertMessage(responseJSON.message);
          console.log(responseMessage[0]);
        } else {
          setSpinner(false);
          const responseMessage = responseJSON.message;
          setEmailSent(responseMessage);
          setEmailAlert(true);
          // setRedirectToHome(true);
          props.authTokenAction(responseJSON.usrToken);
          props.userIdAction(responseJSON.usrId);
          setAlert(true);
          setAlertType(true);
          setAlertMessage(responseJSON.message);
          console.log(responseMessage);
        }
      })
      .catch((error) => {
        console.log(error);
        setAlert(true);
        setAlertType(false);
        setAlertMessage("something went wrong please try again later");
      });
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      googleAuthentication(tokenResponse.access_token);
    },
    // flow: 'auth-code',
  });

  return (
    <GoogleOAuthProvider clientId="208703321397-8bqc7ltmj3ej3md87hnmkg723hkpgsge.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <Grid
          container
          sx={{ height: "100vh", ml: { xs: "none", sm: 10, md: 10 } }}
        >
          {spinner && <Spinner />}
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            component={Paper}
            elevation={0}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h3">
                WELCOME !
              </Typography>
              {/* <Grid item sx={{ margin: 2 }}> */}
              <Typography component="h3" variant="body1">
                Already have an account? &nbsp;<Link to="/">Login</Link>
              </Typography>
              {/* </Grid> */}
              {/* <Grid item sx={{ margin: 2 }}> */}
              <Typography component="h3" variant="h5">
                Sign up with
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
                  {/* <img src={google} onClick={()=>login()} /> */}
                  {/* <GoogleLogin
                  clientId="208703321397-8bqc7ltmj3ej3md87hnmkg723hkpgsge.apps.googleusercontent.com"
                  render={renderProps => (
                    <img src={google} onClick={renderProps.onClick}/>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                /> */}
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      googleAuthentication(credentialResponse.credential);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    useOneTap
                    type="standard"
                    shape="pill"
                    logo_alignment="center"
                    size="large"
                  />
                </Box>
                <Box
                  item
                  sx={{
                    border: 3,
                    borderRadius: 2,
                    borderColor: "#789ADE",
                    display: "flex",
                  }}
                >
                  <img src={facebook} />
                  {/* <GoogleLogin
                  clientId="208703321397-8bqc7ltmj3ej3md87hnmkg723hkpgsge.apps.googleusercontent.com"
                  render={renderProps => (
                    <img src={facebook} onClick={renderProps.onClick}/>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                /> */}
                </Box>
              </Box>
              <Box sx={{ width: 400 }}>
                <div className="block">
                  <hr />
                  <div className="text">OR</div>
                  <hr />
                </div>
              </Box>

              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  autoFocus
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  error={confirmpasswordValidation}
                  helperText={
                    confirmpasswordValidation ? "Password does not match" : ""
                  }
                  // autoComplete="confirmPassword"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailValidation || EmailAlreadyExist}
                  helperText={
                    emailValidation
                      ? "Enter a proper email"
                      : "" || EmailAlreadyExist
                      ? `${EmailAlreadyExist}`
                      : ""
                  }
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
                  error={passwordValidation}
                  helperText={
                    passwordValidation
                      ? "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in" +
                        "(!@#$%^&*)"
                      : ""
                  }
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <TextField
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
                />
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
                  label="I agree to the terms of service"
                />
                <Button
                  // type="submit"
                  disabled={checkBox ? false : true}
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    onSubmit();
                  }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign UP
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={0} sm={6} md={8} sx={{ mt: 10 }}>
            <Box
              component={Grid}
              item
              display={{ xs: "none", sm: "flex", sx: "flex" }}
            >
              <img src={bg_1} />
            </Box>
            {/* <AlertMessage
              open={alert}
              close={setAlert}
              message={alertMessage}
              type={alertType}
            ></AlertMessage> */}
          </Grid>
          {/* <Grid item xs={12} sm={8} md={4}>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={EmailAlert}
              autoHideDuration={4000}
              onClose={() => {
                setEmailAlert(false);
              }}
            >
              <Alert
                onClose={() => {
                  setEmailAlert(false);
                }}
                severity="info"
                sx={{ width: "100%" }}
              >
                {verificationEmailSent}
              </Alert>
            </Snackbar>
          </Grid> */}
        </Grid>
      </ThemeProvider>
    </GoogleOAuthProvider>
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
})(SignInSide);
