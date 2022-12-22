import { Api } from "../../../Constants/constant";
import { getApi, postApi } from "../../HelperFunction";
import store from "../../../../../redux/store/store";
import {
  ownedLgAction,
  alertAction,
  lgIdAction,
  aboutLgAction,
} from "../../../../../redux/actions";
import { postProfilePic } from "../ProfilePicApi/ProfilePicApi";
import { aboutLg } from "../../../../../redux/actions/constants";

export const postLgAbout = async (
  formData,
  loading,
  imageFlag,
  croppedImage
) => {
  let responseJSON = await postApi(Api.lgAbout, formData, loading);
  if (!responseJSON.error) {
    store.dispatch(
      alertAction({ error: responseJSON.error, message: responseJSON.message })
    );
    store.dispatch(lgIdAction(responseJSON.lg_id));
    if (!imageFlag)
      store.dispatch(
        aboutLgAction(
          Object.assign(formData, {
            readURL: null,
          })
        )
      );
    if (imageFlag) {
      console.log("image parameter is true");
      let response = postProfilePic(
        croppedImage,
        croppedImage.type,
        responseJSON.lg_id
      );
      if (response) {
        store.dispatch(
          aboutLgAction(
            Object.assign(formData, {
              readURL: URL.createObjectURL(croppedImage),
            })
          )
        );
      }
    }
    //   store.dispatch(ownedLgAction(responseJSON.ownedLG));
    console.log("Lg About api response", responseJSON);
    return true;
  }
};
