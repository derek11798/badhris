import { Api } from "../../../Constants/constant";
import { getApi } from "../../HelperFunction";
import store from "../../../../../redux/store/store";
import { ownedLgAction, spinnerAction } from "../../../../../redux/actions";

export const getUserSummary = async (loading) => {
  let responseJSON = await getApi(Api.getUserSummary, "", loading);
  store.dispatch(ownedLgAction(responseJSON.ownedLG));
  console.log("get user summary api response", responseJSON);
  return responseJSON;
};
