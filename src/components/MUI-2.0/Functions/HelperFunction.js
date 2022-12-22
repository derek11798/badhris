import store from "../../../redux/store/store";
import {
  alertAction,
  userIdAction,
  spinnerAction,
} from "../../../redux/actions";
import { errors, Api } from "../Constants/constant";
import { combineReducers } from "redux";
// import commonState from "../../../redux/reducer/commonState";

export const postApi = async (url, formData, loading = () => {}) => {
  store.dispatch(spinnerAction(+1));
  loading(true);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      UserId: localStorage.getItem("usrId"),
      token: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(formData),
  };
  try {
    let response = await fetch(url, requestOptions);
    if (response.ok) {
      try {
        let responseJSON = await response.json();
        store.dispatch(spinnerAction(-1));
        loading(false);
        return responseJSON;
      } catch (e) {
        apiFallback(loading, e, errors.somethingWentWrong);
        store.dispatch(spinnerAction(-1));
      }
    } else if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("usrId");
      store.dispatch(userIdAction(""));
      window.location.replace(Api.localhost);
      loading(false);
      store.dispatch(spinnerAction(-1));
    } else if (response.status === 422) {
      try {
        let responseJSON = await response.json();
        store.dispatch(alertAction(responseJSON));
        loading(false);
        store.dispatch(spinnerAction(-1));
      } catch (e) {
        apiFallback(loading, e, errors.somethingWentWrong);
        store.dispatch(spinnerAction(-1));
      }
    } else {
      apiFallback(loading, null, errors.somethingWentWrong);
      store.dispatch(spinnerAction(-1));
    }
  } catch (e) {
    apiFallback(loading, e, errors.somethingWentWrong);
  }
};
export const getApi = async (url, params, loading) => {
  store.dispatch(spinnerAction(+1));
  const requestOptions = {
    method: "GET",
    headers: {
      UserId: localStorage.getItem("usrId"),
      token: localStorage.getItem("accessToken"),
    },
  };
  try {
    let response = await fetch(`${url}${params}`, requestOptions);
    if (response.ok) {
      try {
        let responseJSON = await response.json();
        store.dispatch(spinnerAction(-1));
        return responseJSON;
      } catch (e) {
        apiFallback(loading, e, errors.somethingWentWrong);
        store.dispatch(spinnerAction(-1));
      }
    } else if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("usrId");
      store.dispatch(userIdAction(""));
      window.location.replace(Api.localhost);
      loading(false);
      store.dispatch(spinnerAction(-1));
    } else if (response.status === 422) {
      try {
        let responseJSON = await response.json();
        store.dispatch(alertAction(responseJSON));
        loading(false);
        store.dispatch(spinnerAction(-1));
      } catch (e) {
        apiFallback(loading, e, errors.somethingWentWrong);
        store.dispatch(spinnerAction(-1));
      }
    } else {
      apiFallback(loading, null, errors.somethingWentWrong);
      store.dispatch(spinnerAction(-1));
    }
  } catch (e) {
    apiFallback(loading, e, errors.somethingWentWrong);
    store.dispatch(spinnerAction(-1));
  }
};

export const putApi = async (url, formData, loading) => {
  loading(true);
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      UserId: localStorage.getItem("usrId"),
      token: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(formData),
  };
  try {
    let response = await fetch(url, requestOptions);
    if (response.ok) {
      try {
        let responseJSON = await response.json();
        return responseJSON;
      } catch (e) {
        apiFallback(loading, e, errors.somethingWentWrong);
      }
    } else if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("usrId");
      store.dispatch(userIdAction(""));
      window.location.replace(Api.localhost);
      loading(false);
    } else if (response.status === 422) {
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
  } catch (e) {
    apiFallback(loading, e, errors.somethingWentWrong);
  }
};

export const apiFallback = (e, message, loading = () => {}) => {
  console.error(e);
  store.dispatch(alertAction({ error: true, message: message }));
  loading(false);
};

// export const localStorageChange = (state) => {
//   console.log("local storage change event listner called");
//   state = state || null;
//   if (localStorage.getItem("accessToken") && localStorage.getItem("usrId")) {
//     if (state) state(true);
//     return true;
//   } else {
//     if (state) state(false);
//     return false;
//   }
// };
export const logout = () => {
  console.log("logout function");
  localStorage.clear();
  store.dispatch(userIdAction(""));
};
