import { Api } from "../../../Constants/constant";
import { putApi } from "../../HelperFunction";
import store from "../../../../../redux/store/store";
import {
  ownedLgAction,
  alertAction,
  lgIdAction,
} from "../../../../../redux/actions";

export const updateLgApi = async (url, formData, loading) => {
  let responseJSON = await putApi(url, formData, loading);
  store.dispatch(
    alertAction({ error: responseJSON.error, message: responseJSON.message })
  );
  loading(false);
  //   store.dispatch(lgIdAction(responseJSON.lg_id));
  //   store.dispatch(ownedLgAction(responseJSON.ownedLG));
  console.log("Lg Personal api response", responseJSON);
  return true;
};
