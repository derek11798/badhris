import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/fonts/icomoon/selection.json";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "../src/redux/store/store";
import { Provider } from "react-redux";
import "react-image-crop/dist/ReactCrop.css";
import Root from "./components/MUI-2.0/Components//Screens/Root";
import "./i18n/i18n";
import { BrowserRouter as Router } from "react-router-dom";

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const MainApp = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="208703321397-8bqc7ltmj3ej3md87hnmkg723hkpgsge.apps.googleusercontent.com">
        <Router>
          <Root />
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  );
};

root.render(<MainApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
