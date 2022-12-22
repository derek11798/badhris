import * as actions from "./constants";
let count = 0;

export const authTokenAction = (data) => {
  return {
    type: actions.authToken,
    value: data,
  };
};

export const userIdAction = (data) => {
  return {
    type: actions.userId,
    value: data,
  };
};

export const lgIdAction = (data) => {
  return {
    type: actions.lgId,
    value: data,
  };
};

export const userNameAction = (data) => {
  return {
    type: actions.userName,
    value: data,
  };
};

export const ownedLgAction = (data) => {
  return {
    type: actions.ownedLg,
    value: data,
  };
};

export const aboutLgAction = (data) => {
  return {
    type: actions.aboutLg,
    value: data,
  };
};

export const emailIdAction = (data) => {
  return {
    type: actions.emailId,
    value: data,
  };
};

export const lifeEventAction = (data) => {
  return {
    type: actions.lifeEvent,
    value: data,
  };
};

export const lgPlanAction = (data) => {
  return {
    type: actions.lgPlan,
    value: data,
  };
};

export const frozenMomentsAction = (data) => {
  return {
    type: actions.frozenMoments,
    value: data,
  };
};

export const alertAction = (data) => {
  return {
    type: actions.alert,
    value: data,
  };
};
export const spinnerAction = (data) => {
  count = count + data;
  return {
    type: actions.spinner,
    value: count,
  };
};
