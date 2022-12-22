import { Api, errors } from "../../Constants/constant";
import helperText from "../../Constants/helperText.json";
import {
  authTokenAction,
  userIdAction,
  userNameAction,
  emailIdAction,
  alertAction,
  spinnerAction,
} from "../../../../redux/actions";
import store from "../../../../redux/store/store";
import { apiFallback } from "../HelperFunction";

export const signUpForm_Api = async (FormData, loading) => {
  loading(true);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(FormData),
  };

  try {
    let response = await fetch(Api.signUp, requestOptions);
    if (response.ok) {
      loading(false);
      return response;
    }
    loading(false);
    return response;
  } catch (e) {
    loading(false);
    console.error(e);
    return e; // { error: true, message: helperText.errors.apiFailed };
  }
};

export const loginForm_Api = async (FormData, loading) => {
  loading(true);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(FormData),
  };

  try {
    let response = await fetch(Api.login, requestOptions);
    if (response.ok) {
      if (response.status == 200) {
        try {
          let responseJSON = await response.json();
          loading(false);
          localStorage.setItem("accessToken", responseJSON.usrToken);
          localStorage.setItem("usrId", responseJSON.usrId);
          localStorage.setItem("emailId", responseJSON.usrEmail);
          store.dispatch(userIdAction(responseJSON.usrId));
          store.dispatch(userNameAction(responseJSON.usrName));
          store.dispatch(emailIdAction(responseJSON.usrEmail));
          return true;
        } catch (e) {
          apiFallback(loading, e, errors.somethingWentWrong);
        }
      } else {
        apiFallback(loading, null, errors.somethingWentWrong);
      }
    } else {
      if (response.status == 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("usrId");
        window.location.replace(Api.localhost);
        loading(false);
      } else if (response.status == 422) {
        try {
          let responseJSON = await response.json();
          store.dispatch(alertAction(responseJSON));
          loading(false);
        } catch (e) {
          apiFallback(loading, e, errors.somethingWentWrong);
        }
      } else {
        apiFallback(loading, null, errors.somethingWentWrong);
      }
    }
  } catch (e) {
    apiFallback(loading, e, errors.somethingWentWrong);
  }
};

export const googleAuthentication = async (token, spinner, alert) => {
  store.dispatch(spinnerAction(+1));
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      authToken: token,
    }),
  };
  try {
    let response = await fetch(Api.googleAuth, requestOptions);
    // console.log("gauth", response);
    if (response.ok) {
      try {
        let responseJSON = await response.json();
        if (!responseJSON.error) {
          localStorage.setItem("accessToken", responseJSON.usrToken);
          localStorage.setItem("usrId", responseJSON.usrId);
          store.dispatch(userIdAction(responseJSON.usrId));
          store.dispatch(userNameAction(responseJSON.usrName));
          store.dispatch(emailIdAction(responseJSON.usrEmail));
          console.log("user name", responseJSON.usrName);
          store.dispatch(spinnerAction(-1));
          return true;
        }
      } catch (e) {
        console.error(e);
        store.dispatch(
          alertAction({
            error: true,
            message: errors.somethingWentWrong,
          })
        );
        store.dispatch(spinnerAction(-1));
      }
    } else {
      if (response.status == 422) {
        try {
          let responseJSON = await response.json();
          store.dispatch(alertAction(responseJSON));
          store.dispatch(spinnerAction(-1));
        } catch (e) {
          console.error(e);
          store.dispatch(
            alertAction({
              error: true,
              message: errors.somethingWentWrong,
            })
          );
          store.dispatch(spinnerAction(-1));
        }
      }
    }
  } catch (e) {
    console.error(e);
    store.dispatch(
      alertAction({
        error: true,
        message: errors.somethingWentWrong,
      })
    );
    store.dispatch(spinnerAction(-1));
  }
};

export const verifyEmail_Api = async (urlParams) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailid: urlParams.split("|")[0],
      verTok: urlParams.split("|")[1],
    }),
  };
  try {
    let response = await fetch(Api.verifyEmail, requestOptions);
    if (response.ok) {
      try {
        let responseJSON = await response.json();
        store.dispatch(alertAction(responseJSON));
        return true;
      } catch (e) {
        console.error(e);
        store.dispatch(
          alertAction({
            error: true,
            message: errors.somethingWentWrong,
          })
        );
      }
    } else {
      if (response.status == 422) {
        try {
          let responseJSON = await response.json();
          store.dispatch(alertAction(responseJSON));
          return true;
        } catch (e) {
          console.error(e);
          store.dispatch(
            alertAction({
              error: true,
              message: errors.somethingWentWrong,
            })
          );
        }
      } else {
        store.dispatch(
          alertAction({
            error: true,
            message: errors.somethingWentWrong,
          })
        );
      }
    }
    console.log("verify email api response", response);
  } catch (e) {
    console.error(e);
    store.dispatch(
      alertAction({
        error: true,
        message: errors.somethingWentWrong,
      })
    );
  }
};
