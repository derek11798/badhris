import { Api, errors } from "../../../Constants/constant";
import { apiFallback, postApi } from "../../HelperFunction";
import imageCompression from "browser-image-compression";
import store from "../../../../../redux/store/store";
import { alertAction, spinnerAction } from "../../../../../redux/actions";
export const postProfilePic = async (file, fileType, lgId) => {
  store.dispatch(spinnerAction(+1));
  let formData = {
    file_type: fileType,
    lg_id: lgId,
  };
  let responseJSON = await postApi(Api.profilePic, formData);
  if (!responseJSON.error) {
    responseJSON.postDetailArr[0].forEach(async (item) => {
      let url = item.formAttributes.action;
      let objKey = item.objKey.slice("/");
      console.log("file size greater than 200kb");
      let options = {
        maxSizeMB: objKey[0] === "thmb" ? 0.05 : 0.1,
        maxWidthOrHeight: objKey[0] === "thmb" ? 320 : 720,
        useWebWorker: true,
      };
      let compressedFile = await imageCompression(file, options);
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB

      const formData = new FormData();
      Object.keys(item.formInputs).forEach(async (key) => {
        formData.append(key, item.formInputs[key]);
      });
      formData.append("content-Type", fileType);
      formData.append("file", compressedFile);
      const requestOptions = {
        method: item.formAttributes.method,
        enctype: item.formAttributes.enctype,
        headers: {
          // "Content-Type": `${response.formAttributes.enctype}`,
        },
        body: formData,
      };
      console.log("url", url, "reqopt", requestOptions);
      try {
        let response = await fetch(url, requestOptions);
        store.dispatch(spinnerAction(-1));
        return true;
      } catch (e) {
        apiFallback(e, errors.somethingWentWrong);
        store.dispatch(alertAction);
        store.dispatch(spinnerAction(-1));
        return false;
      }
    });
  } else {
    store.dispatch(spinnerAction(-1));
  }
};
