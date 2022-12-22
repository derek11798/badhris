import React from "react";
import { Route, Routes } from "react-router-dom";
import AlertMessage from "../AlertMessage/AlertMessage";
import { connect } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmailVerification from "../EmailVerification/EmailVerification";
import Protected from "../Protected/Protected";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import Home from "../UI/Home/Home";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import LgAbout from "../Forms/LgAbout";
import LgPersonal from "../Forms/LgPersonal";
import LgEducation from "../Forms/LgEducation";
import LgHealth from "../Forms/LgHealth";
import LgPersonality from "../Forms/LgPersonality";
import Spinner from "../Spinner";
import CreateLgAbout from "../UI/CreateLgAbout";
import CreateLgPersonal from "../UI/CreateLgPersonal";
import CreateLgHealth from "../UI/CreateLgHealth";
import CreateLgEducation from "../UI/CreateLgEducation";
import CreateLgPersonality from "../UI/CreateLgPersonality";
import CreateSelfLg from "./CreateSelfLg";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#8353E27D",
    },
    secondary: {
      main: "#00BDD6FF",
    },
  },
});

const Root = (props) => {
  //-----------------------Declare useState Here-----------------------------//

  const [alertMessage, setAlertMessage] = React.useState();
  const [spinner, setSpinner] = React.useState(false);

  //-----------------------Declare useEffect Here-----------------------------//
  React.useEffect(() => {
    console.log("alert message in root", props.alert);
    if (props.alert !== "") {
      setAlertMessage(props.alert);
    } else setAlertMessage(false);
  }, [props.alert]);
  React.useEffect(() => {
    console.log("alert message in root", props.alert);
    if (props.spinner > 0) {
      setSpinner(true);
    } else setSpinner(false);
  }, [props.spinner]);

  return (
    <ThemeProvider theme={theme}>
      {alertMessage && <AlertMessage message={alertMessage} />}
      {spinner && <Spinner open={spinner} />}
      <Routes>
        <Route
          exact
          path="/signup"
          element={
            <Protected auth={false}>
              <SignupScreen />
            </Protected>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <Protected auth={false}>
              <LoginScreen />
            </Protected>
          }
        />
        <Route
          exact
          path="/*"
          element={
            <Protected auth={true}>
              <ProtectedRoutes />
            </Protected>
          }
        >
          <Route exact path="home" element={<Home />} />
        </Route>
        <Route
          path="/confirmemail/:urlParams"
          element={<EmailVerification />}
        />
      </Routes>
    </ThemeProvider>
  );
};
const mapStateToProp = (state) => {
  return {
    alert: state.commonState.alert,
    spinner: state.commonState.spinner,
  };
};
export default connect(mapStateToProp)(Root);
