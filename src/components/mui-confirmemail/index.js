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
import "../mui-signup/style.css";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

const ConfirmEmailSide = () => {
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

  const [confirmEmail, setConfirmEmail] = useState(false);
  const [confirmEmailApiResponse, setConfirmEmailApiResponse] = useState(false);
  const [confirmEmailApiResponseError, setConfirmEmailApiResponseError] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);


  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    confirmEmailApi();
  }, []);

  useEffect(() => {
    if(redirectToLogin){
        navigate("/login");
    }
  }, [redirectToLogin]);



  const confirmEmailApi = () => {
    const urlParams = id.split("|");
    const email = urlParams[0];
    const token = urlParams[1];
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailid: email,
        verTok: token,
      }),
    };
    fetch("https://lifograf.com/lg_api/verifyEmail", requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        if (!responseJSON.error) {
          const responseMessage = responseJSON.message.split("-");
          setConfirmEmailApiResponse(responseMessage[0]);
        }
        else{
            const responseMessage = responseJSON.message.split("-");
            setConfirmEmailApiResponse(responseMessage[0]);
            setConfirmEmailApiResponseError(true)
          }
      })
      .catch((e) => {
        console.log("catch", e);
      });
  };

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

  const loginApi = (email, password) => {
    console.log(email, password);
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
          const responseMessage = responseJSON.message.split("-");
          setLoginResponse(responseMessage[0]);
          setInvalidCredentials(true);
          console.log(responseMessage[0]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ThemeProvider theme={theme}>
        <Grid container sx={{ height: "100vh", ml: { xs: "none", sm : 10, md : 10 } }}>
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
              WELCOME Back !
            </Typography>
            {/* <Grid item sx={{ margin: 2 }}> */}
              <Typography component="h3" variant="body1">
                Don't have an account? &nbsp;<Link to="/">Sign Up</Link>
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
                  border: 3,
                  borderRadius: 2,
                  borderColor: "#789ADE",
                  display: "flex",
                  marginRight: 20,
                }}
              >
                <img src={google} />
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
            <Box sx={{width : 400}}>
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
        <Grid item xs={false} sm={4} md={8} sx={{mt : 10}}>
        <Box
          component={Grid}
          item
          display={{ xs: "none", sm : "flex", sx : "flex" }}
        >
          <img src={bg_1} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={confirmEmailApiResponse}
            // autoHideDuration={4000}
            onClose={() => {
                setRedirectToLogin(true);
            }}
          >
            <Alert
              onClose={() => {
                setRedirectToLogin(true);
              }}
              severity={confirmEmailApiResponseError ? "warning" : "success"}
              sx={{ width: "100%" }}
            >
              {confirmEmailApiResponse}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ConfirmEmailSide;
