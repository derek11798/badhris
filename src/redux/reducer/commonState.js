import * as Actions from "../actions/constants";

const initialState = {
  authToken: "",
  userId: "",
  lgId: "",
  emailId: "",
  userName: "",
  ownedLg: "",
  aboutLg: "",
  lifeEvent: "",
  lgPlan: "",
  frozenMoments: "",
  alert: "",
  spinner: 0,
};

const commonState = (state = initialState, action) => {
  switch (action.type) {
    case Actions.authToken:
      return {
        ...state,
        authToken: action.value,
      };

    case Actions.userId:
      return {
        ...state,
        userId: action.value,
      };

    case Actions.lgId:
      return {
        ...state,
        lgId: action.value,
      };

    case Actions.userName:
      return {
        ...state,
        userName: action.value,
      };

    case Actions.ownedLg:
      return {
        ...state,
        ownedLg: action.value,
      };

    case Actions.aboutLg:
      return {
        ...state,
        aboutLg: action.value,
      };

    case Actions.emailId:
      return {
        ...state,
        emailId: action.value,
      };

    case Actions.lifeEvent:
      return {
        ...state,
        lifeEvent: action.value,
      };

    case Actions.lgPlan:
      return {
        ...state,
        lgPlan: action.value,
      };

    case Actions.frozenMoments:
      return {
        ...state,
        frozenMoments: action.value,
      };

    case Actions.alert:
      return {
        ...state,
        alert: action.value,
      };
    case Actions.spinner:
      return {
        ...state,
        spinner: action.value,
      };
    default:
      return state;
  }
};

export default commonState;
