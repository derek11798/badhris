import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import validator from "validator";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import bg_1 from "../../images/bg_2.svg";
import { connect } from "react-redux";
import PicturePopUp from "../mui-propicpopup";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MenuItem from "@mui/material/MenuItem";
import TransitionsModal from "../mui-modal";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { setDate } from "date-fns";
import UploadIcon from "@mui/icons-material/Upload";
import AlertMessage from "../mui-alertmessage";
import imageCompression from "browser-image-compression";
import { frozenMomentsAction } from "../../redux/actions";
import le from "../../images/le.png";
import Spinner from "../mui-spinner";
import Paper from "@mui/material/Paper";
import Suggestion from "../mui-suggestion";
import celebration1 from "../../images/LGAssets/celebration1.jpg";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Fab from "@mui/material/Fab";
import { tr } from "date-fns/locale";
import { borderRadius } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditAndDelete from "../mui-horizontalmoreedit&delete";
import MicIcon from "@mui/icons-material/Mic";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";

const FrozenMoments = (props) => {
  let FileType = [];
  // "Image",
  // "Video",
  // "Audio",
  // // "PDF",
  // // "Document",
  // props.lgPlan.mem_utube_link == "Y"
  //   ? "Youtube Link"
  //   : "Youtube Link (upgrade)",
  // props.lgPlan.memry_other_link == "Y"
  //   ? "Other Link"
  //   : "Other Link (upgrade)",
  // ];
  const Visiblity = [
    "Public",
    "2nd cousins",
    "1st cousins",
    "Direct Family",
    "Descendants",
  ];
  let compressedImage;
  let imageUrl;

  const [openModel, setOpen] = useState(false);
  const [eventType, setEventType] = useState();
  const [description, setDescription] = useState();
  const [visiblity, setVisiblity] = useState("Public");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState();
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedLifeEventImage, setSelectedFrozenMomentFile] = useState("");
  const [lifeEventPicture, setLifeEventPicture] = useState();
  const [frozenMoments, setFrozenMoments] = useState();
  const [fileType, setFileType] = useState("NOFILE");
  const [fileSize, setFileSize] = useState();
  const [compressedFile, setCompressedFile] = useState();
  const [editMode, setEditMode] = useState(false);
  const [eventId, setEventId] = useState();
  const [deleteImage, setDeleteImage] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [validation, setValidation] = useState(false);
  // const [imageUrl, setImageUrl] = useState();
  const [locallyUpdatedLifeEvents, setLocallyUpdatedLifeEvents] = useState();
  const [picPopUp, setPicPopUp] = useState(false);
  const [imagePopupSrc, setImagePopupSrc] = useState();
  const [uploadFileType, setUploadFileType] = useState();
  const [link, setLink] = useState("");
  const [linkValidation, setLinkValidation] = useState(true);
  const [fileTypeDropDown, setFileTypeDropDown] = useState("");
  const [confirmDialogueBox, setConfirmDialogueBox] = useState(false);
  const [originalObject, setOriginalObject] = useState();

  const handleOpen = () => {
    handleClose();
    setEditMode(false);
    setOpen(true);
  };
  const handleClose = () => {
    setEventType("");
    setDescription("");
    setVisiblity("Public");
    setTitle("");
    setDate("");
    setOpen(false);
    setEditMode(false);
    setDeleteImage(false);
    setFileType("NOFILE");
    setSelectedFrozenMomentFile("");
    setUploadFileType("");
    setLink("");
    setLinkValidation(true);
  };
  const handleDobChange = (newValue) => setDate(newValue);
  const handleFileSelect = (event) => {
    console.log("selected event : ", event);
    console.log("selected file : ", event.type);
    console.log("upload File Type : ", uploadFileType);
    console.log(
      "checking event type : ",
      props.lgPlan.memory_file_types.includes(event.type)
    );
    switch (uploadFileType) {
      case "Audio":
        if (props.lgPlan.memory_file_types.includes(event.type)) {
          if (
            Number(event.size) / 1024 / 1024 >
            Number(props.lgPlan.max_file_storage_kb) / 1024
          ) {
            setAlert(true);
            setAlertType(false);
            setAlertMessage(
              `Upload a file less than ${Math.ceil(
                Number(props.lgPlan.max_file_storage_kb) / 1024
              )} MB`
            );
            console.log("case audio all details updated");
          } else {
            setSelectedFrozenMomentFile(event);
            setFileType(event.type);
            setDeleteImage("UPDATE");
            console.log("case audio all details updated");
          }
        } else {
          setAlert(true);
          setAlertType(false);
          setAlertMessage("Upload A MP3 Format File");
        }
        break;
      case "Video":
        if (props.lgPlan.memory_file_types.includes(event.type)) {
          if (
            Number(event.size) / 1024 / 1024 >
            Number(props.lgPlan.max_file_storage_kb) / 1024
          ) {
            setAlert(true);
            setAlertType(false);
            setAlertMessage(
              `Upload a file less than ${Math.ceil(
                Number(props.lgPlan.max_file_storage_kb) / 1024
              )} MB`
            );
          } else {
            setSelectedFrozenMomentFile(event);
            setFileType(event.type);
            setDeleteImage("UPDATE");
            console.log("case Video all details updated");
          }
        } else {
          setAlert(true);
          setAlertType(false);
          setAlertMessage("Upload A MP4 Format File");
        }
        break;
      case "Image":
        if (props.lgPlan.memory_file_types.includes(event.type)) {
          setSelectedFrozenMomentFile(event);
          setFileType(event.type);
          setDeleteImage("UPDATE");
          console.log("case Image all details updated");
        } else {
          setAlert(true);
          setAlertType(false);
          setAlertMessage("Upload A Image File");
        }
        break;
      case "PDF":
        if (props.lgPlan.memory_file_types.includes(event.type)) {
          if (
            Number(event.size) / 1024 / 1024 >
            Number(props.lgPlan.max_file_storage_kb) / 1024
          ) {
            setAlert(true);
            setAlertType(false);
            setAlertMessage(
              `Upload a file less than ${Math.ceil(
                Number(props.lgPlan.max_file_storage_kb) / 1024
              )} MB`
            );
          } else {
            setSelectedFrozenMomentFile(event);
            setFileType(event.type);
            setDeleteImage("UPDATE");
            console.log("case PDF all details updated");
          }
        } else {
          setAlert(true);
          setAlertType(false);
          setAlertMessage("Upload PDF File");
        }
        break;
      case "Document":
        if (props.lgPlan.memory_file_types.includes(event.type)) {
          if (
            Number(event.size) / 1024 / 1024 >
            Number(props.lgPlan.max_file_storage_kb) / 1024
          ) {
            setAlert(true);
            setAlertType(false);
            setAlertMessage(
              `Upload a file less than ${Math.ceil(
                Number(props.lgPlan.max_file_storage_kb) / 1024
              )} MB`
            );
          } else {
            setSelectedFrozenMomentFile(event);
            setFileType(event.type);
            setDeleteImage("UPDATE");
            console.log("case Document all details updated");
          }
        } else {
          setAlert(true);
          setAlertType(false);
          setAlertMessage("Upload A MSWord Document File");
        }
        break;
    }
  };
  const handleEdit = (item) => {
    setOriginalObject(item);
    setOpen(false);
    setEditMode(item.mem_id);
    setUploadFileType(item.mem_link.includes("youtube") ? "" : "");
    // setEventType(item.event_type);
    setFileType(item.file_type);
    setDescription(item.mem_desc);
    setVisiblity(item.visibility);
    setTitle(item.mem_title);
    setDate(item.mem_dt);
    setEventId(item.mem_id);
    setLink(item.mem_link);
    setSelectedFrozenMomentFile("");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    // border: '1px solid #000',
    // boxShadow: 24,
    p: 4,
  };

  // useEffect(() => {
  //   if (frozenMoments) {
  //     // props.lifeEventAction("");
  //     console.log("life Events : ", frozenMoments);
  //     console.log("locally updated life Events : ", locallyUpdatedLifeEvents);

  //     let newArr = frozenMoments.concat(locallyUpdatedLifeEvents);
  //     console.log("newArr : ", newArr);

  //     props.lifeEventAction(newArr);
  //   }
  // }, [locallyUpdatedLifeEvents]);
  function matchYoutubeUrl(url) {
    console.log("youtube validation", url);

    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      console.log("youtube validation if condition", url);

      // setLinkValidation(true);
      // setLink(`https://www.youtube.com/embed/${url.match(p)[1]}`);

      return `https://www.youtube.com/embed/${url.match(p)[1]}`;
    } else {
      console.log("youtube validation else condition", url);

      return false;
    }
  }

  // useEffect(() => {
  //   matchYoutubeUrl(link);
  // }, [link]);

  useEffect(() => {
    if (title.length >= 45) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [title]);

  useEffect(() => {
    props.lgPlan.memory_file_types.split(",").forEach((item) => {
      if (
        item.split("/")[0] == "image" ||
        item.split("/")[0] == "video" ||
        item.split("/")[0] == "audio"
      ) {
        if (!FileType.includes(item.split("/")[0])) {
          FileType.push(item.split("/")[0]);
          console.log("Append item to list : ", item.split("/")[0]);
        }
      } else if (item.split("/")[0] == "application") {
        if (!FileType.includes(item.split("/")[1])) {
          FileType.push(item.split("/")[1]);
          console.log("Append item to list : ", item.split("/")[0]);
        }
      } else {
      }
    });
    if (props.lgPlan.mem_utube_link == "Y") FileType.push("youtube Link");
    else FileType.push("Youtube Link (upgrade)");
    if (props.lgPlan.memry_other_link == "Y") FileType.push("other Link");
    else FileType.push("Other Link (upgrade)");
    console.log("File Type List", FileType);
    setFileTypeDropDown(FileType);
  }, []);

  useEffect(() => {
    console.log("link after changing", link);
    if (link && uploadFileType == "Other Link") {
      setFileType("NOFILE");
      console.log("isEmpty : ", validator.isEmpty(link));
      console.log("isURL : ", validator.isURL(link));

      setLinkValidation(validator.isURL(link) && !validator.isEmpty(link));
    } else if (link) {
      setFileType("NOFILE");
      console.log("youtube validation link has changed");
      let matchLink = matchYoutubeUrl(link);
      if (matchLink) {
        setLink(matchLink);
        setLinkValidation(true);
      } else setLinkValidation(false);
    }
  }, [link, uploadFileType]);

  useEffect(() => {
    if (editMode) {
      console.log("setSelectedLifeEvent", Boolean(selectedLifeEventImage));
      if (uploadFileType == "Youtube Link" || uploadFileType == "Other Link") {
        if (
          originalObject.mem_desc != description ||
          originalObject.visibility != visiblity ||
          originalObject.mem_title != title ||
          originalObject.mem_dt != date ||
          originalObject.mem_link != link ||
          selectedLifeEventImage
        ) {
          console.log("control 1, link validation", linkValidation);
          if (linkValidation) {
            console.log("control 2");
            setDisableButton(false);
          } else {
            console.log("control 3");
            setDisableButton(true);
          }
        } else {
          console.log("control 4");
          setDisableButton(true);
        }
      } else {
        if (
          originalObject.mem_desc != description ||
          originalObject.visibility != visiblity ||
          originalObject.mem_title != title ||
          originalObject.mem_dt != date ||
          originalObject.mem_link != link ||
          selectedLifeEventImage
        ) {
          console.log("control 5");
          setDisableButton(false);
        } else {
          console.log("control 6");
          setDisableButton(true);
        }
      }
    } else {
      if (uploadFileType == "Youtube Link" || uploadFileType == "Other Link") {
        if (
          description &&
          visiblity &&
          title &&
          date &&
          link &&
          linkValidation
        ) {
          setDisableButton(false);
        } else {
          setDisableButton(true);
        }
      } else {
        if (
          selectedLifeEventImage &&
          description &&
          visiblity &&
          title &&
          date
        ) {
          setDisableButton(false);
        } else {
          setDisableButton(true);
        }
      }
    }
  }, [
    selectedLifeEventImage,
    description,
    visiblity,
    title,
    date,
    link,
    linkValidation,
    uploadFileType,
  ]);

  useEffect(() => {
    console.log("calling get life events");
    getLifeEvents();
  }, []);

  useEffect(() => {
    setFrozenMoments(props.frozenMoments);
  }, [props.frozenMoments]);

  const convertToMonth = (date) => {
    // console.log("date : ", date);
    let dateSplit = date.split("-");
    let month;
    // console.log("Month", dateSplit[1]);
    switch (dateSplit[1]) {
      case "01":
        month = "Jan";
        break;
      case "02":
        month = "Feb";
        break;
      case "03":
        month = "Mar";
        break;
      case "04":
        month = "Apr";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "Jun";
        break;
      case "07":
        month = "Jul";
        break;
      case "08":
        month = "Aug";
        break;
      case "09":
        month = "Sep";
        break;
      case "10":
        month = "Oct";
        break;
      case "11":
        month = "Nov";
        break;
      case "12":
        month = "Dec";
        break;
    }
    let lifeEventFormatedDate = month + " " + dateSplit[0];
    return lifeEventFormatedDate;
  };

  const deleteFrozenMoment = (entryId, fileType) => {
    setSpinner(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        UserId: `${props.userId}`,
        token: `${props.authToken}`,
      },
      body: JSON.stringify({
        lg_id: props.lgId,
        entry_id: entryId,
        file_type: fileType,
        entry_type: "Memory",
      }),
    };
    fetch("https://lifograf.com/lg_api/delEntry", requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        if (!responseJSON.error) {
          console.log(responseJSON);
          setAlert(true);
          setAlertType(true);
          setAlertMessage(responseJSON.message);
          let deletedfrozenMomentsArr = props.frozenMoments.filter(
            (item) => item.mem_id != entryId
          );
          props.frozenMomentsAction(deletedfrozenMomentsArr);
          setSpinner(false);
          // props.lifeEventAction(responseJSON.lifeEventList);
        } else {
          setSpinner(false);
          console.log(responseJSON);

          setAlert(true);
          setAlertType(false);
          setAlertMessage(responseJSON.message);
        }
        // props.aboutLgAction({...props.aboutLg,...form_details})
      })
      .catch((error) => {
        console.log(error);
        setAlert(true);
        setAlertType(false);
        setAlertMessage("something went wrong please try again later");
      });
  };

  const profilepicturepopup = (src) => {
    if (src != "NOFILE") {
      setImagePopupSrc(src);
      setPicPopUp(true);
    } else {
      setPicPopUp(false);
    }
  };

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const updateForm = () => {
    console.log("file type : ", fileType);
    console.log("date format : ", date);
    let form_details = "";
    let requestOptions;
    if (editMode) {
      form_details = {
        lg_id: props.lgId,
        mem_dt: date,
        // event_type: eventType,
        file_type:
          uploadFileType != "Youtube Link" && uploadFileType != "Other Link"
            ? fileType
            : "NOFILE",
        mem_title: title,
        mem_desc: description,
        visibility: visiblity,
        mem_id: eventId,
        file_upd_flag:
          originalObject.mem_link == "" && link != ""
            ? "DELETE"
            : uploadFileType != "Youtube Link" && uploadFileType != "Other Link"
            ? selectedLifeEventImage
              ? "UPDATE"
              : ""
            : "",
        mem_dt: convert(date),
        mem_link: fileType == "NOFILE" ? link : "",
      };
      requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          UserId: `${props.userId}`,
          token: `${props.authToken}`,
        },
        body: JSON.stringify({
          lg_id: props.lgId,
          mem_dt: date,
          // event_type: eventType,
          file_type:
            uploadFileType != "Youtube Link" && uploadFileType != "Other Link"
              ? fileType
              : "NOFILE",
          mem_title: title,
          mem_desc: description,
          visibility: visiblity,
          mem_id: eventId,
          file_upd_flag:
            originalObject.mem_link == "" && link != ""
              ? "DELETE"
              : uploadFileType != "Youtube Link" &&
                uploadFileType != "Other Link"
              ? selectedLifeEventImage
                ? "UPDATE"
                : ""
              : "",
          mem_dt: date,
          mem_link: fileType == "NOFILE" ? link : "",
        }),
      };
    } else {
      form_details = {
        lg_id: props.lgId,
        mem_dt: date,
        // event_type: eventType,
        file_type:
          uploadFileType != "Youtube Link" && uploadFileType != "Other Link"
            ? fileType
            : "NOFILE",
        mem_title: title,
        mem_desc: description,
        visibility: visiblity,
        file_upd_flag: "",
        mem_dt: convert(date),
        mem_link: link,
      };
      requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          UserId: `${props.userId}`,
          token: `${props.authToken}`,
        },
        body: JSON.stringify({
          lg_id: props.lgId,
          mem_dt: date,
          // event_type: eventType,
          file_type:
            uploadFileType != "Youtube Link" && uploadFileType != "Other Link"
              ? fileType
              : "NOFILE",
          mem_title: title,
          mem_desc: description,
          visibility: visiblity,
          file_upd_flag: "",
          mem_link: link,
        }),
      };
    }
    if (!editMode && props.frozenMoments.length > props.lgPlan.memories_cnt) {
      setAlert(true);
      setAlertType(false);
      setAlertMessage("Upgrade Your Plan To Add More Frozen Moments");
    } else {
      setSpinner(true);
      fetch("https://lifograf.com/lg_api/memory", requestOptions)
        .then((response) => {
          if ((response.status != 200) & (response.status != 422)) {
            throw new Error(response.status);
          } else {
            return response.json();
          }
        })
        .then((responseJSON) => {
          console.log("response JSON : ", responseJSON);
          if (!responseJSON.error) {
            console.log(responseJSON);
            if (responseJSON.postDetailArr) {
              if (uploadFileType == "Image") {
                compressImage(responseJSON, form_details);
              } else {
                responseJSON.postDetailArr.forEach((item) => {
                  let url = item.formAttributes.action;
                  let objKey = item.objKey.slice("/");
                  console.log("file size upload without image compression");

                  const formData = new FormData();
                  Object.keys(item.formInputs).forEach((key) => {
                    formData.append(key, item.formInputs[key]);
                  });
                  formData.append("content-Type", fileType);
                  formData.append("file", selectedLifeEventImage);
                  const requestOptions = {
                    method: item.formAttributes.method,
                    enctype: item.formAttributes.enctype,
                    headers: {
                      // "Content-Type": `${response.formAttributes.enctype}`,
                    },
                    body: formData,
                  };
                  console.log("url", url, "reqopt", requestOptions);
                  fetch(url, requestOptions).then((response) => {
                    if (response.status == 204) {
                      // setSpinner(false);
                      // setAlert(true);
                      setAlertType(true);
                      setAlertMessage(responseJSON.message);
                      // let responseEventId = {
                      //   event_id: `${responseJSON.event_id}`,
                      //   readURL: imageUrl,
                      // };
                      // let newLocalEventObjet = Object.assign(
                      //   form_details,
                      //   responseEventId
                      // );
                      // // eventid = Object.assign(responseEventId);
                      // console.log("event Id Appended", newLocalEventObjet);
                      // setLocallyUpdatedLifeEvents(newLocalEventObjet);
                      updateLifeEventsLocally(
                        responseJSON,
                        form_details,
                        compressedImage
                      );

                      // setSelectedFrozenMomentFile(false);
                      // handleClose();
                    } else {
                      // setSpinner(false);
                      // setAlert(true);
                      setAlertType(false);
                      setAlertMessage("Image upload failed");
                      // handleClose();
                      // setSelectedFrozenMomentFile(false);
                    }
                  });
                });
              }
            } else {
              // setSpinner(false);
              // setAlert(true);
              // let responseEventId = {
              //   event_id: `${responseJSON.event_id}`,
              //   // readURL: imageUrl,
              // };
              // let newLocalEventObjet = Object.assign(
              //   form_details,
              //   responseEventId
              // );
              // // eventid = Object.assign(responseEventId);
              // console.log("event Id Appended", newLocalEventObjet);
              // setLocallyUpdatedLifeEvents(newLocalEventObjet);
              // updateLifeEventsLocally(responseJSON, form_details);

              updateLifeEventsLocally(responseJSON, form_details, "NOFILE");
              setAlertType(responseJSON.error ? false : true);

              setAlertMessage(responseJSON.message);
              // getLifeEvents();
              // setOpen(false);
              // setSelectedFrozenMomentFile(false);
            }
          } else {
            // setSpinner(false);
            console.log(responseJSON);
            // setAlert(true);
            setAlertType(false);
            // getLifeEvents();
            setAlertMessage(responseJSON.message);
            // setOpen(false);
            // setSelectedFrozenMomentFile(false);
          }
          handleClose();
          setSpinner(false);
          setAlert(true);
          // props.aboutLgAction({...props.aboutLg,...form_details})
        })
        .catch((error) => {
          console.log(error);
          setAlert(true);
          setAlertType(false);
          setAlertMessage("something went wrong please try again later");
        });
    }
  };

  const getLifeEvents = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        UserId: `${props.userId}`,
        token: `${props.authToken}`,
      },
      // body: JSON.stringify({
      //   lg_id: props.lgId,
      // }),
    };
    fetch(
      `https://lifograf.com/lg_api/memory?lg_id=${props.lgId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        if (!responseJSON.error) {
          console.log(responseJSON);
          // setAlert(true)
          // setAlertType(true)
          // setAlertMessage(responseJSON.message)
          props.frozenMomentsAction(responseJSON.memoryList);
        } else {
          console.log(responseJSON);
          setAlert(true);
          setAlertType(false);
          setAlertMessage(responseJSON.message);
        }
        // props.aboutLgAction({...props.aboutLg,...form_details})
      })
      .catch((error) => {
        console.log(error);
        setAlert(true);
        setAlertType(false);
        setAlertMessage("something went wrong please try again later");
      });
  };

  const compressImage = (responseJSON, form_details) => {
    responseJSON.postDetailArr.forEach((item) => {
      let url = item.formAttributes.action;
      let objKey = item.objKey.slice("/");
      console.log("file size greater than 200kb");
      let imageFile = selectedLifeEventImage;
      let options = {
        maxSizeMB: objKey[0] == "thmb" ? 0.05 : 0.1,
        maxWidthOrHeight: objKey[0] == "thmb" ? 320 : 720,
        useWebWorker: true,
      };
      imageCompression(imageFile, options).then(function (compressedFile) {
        compressedImage = compressedFile;
        imageUrl = URL.createObjectURL(compressedFile);
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB

        const formData = new FormData();
        Object.keys(item.formInputs).forEach((key) => {
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
        fetch(url, requestOptions).then((response) => {
          if (response.status == 204) {
            // setSpinner(false);
            // setAlert(true);
            setAlertType(true);
            setAlertMessage(responseJSON.message);
            // let responseEventId = {
            //   event_id: `${responseJSON.event_id}`,
            //   readURL: imageUrl,
            // };
            // let newLocalEventObjet = Object.assign(
            //   form_details,
            //   responseEventId
            // );
            // // eventid = Object.assign(responseEventId);
            // console.log("event Id Appended", newLocalEventObjet);
            // setLocallyUpdatedLifeEvents(newLocalEventObjet);
            updateLifeEventsLocally(
              responseJSON,
              form_details,
              compressedImage
            );

            // setSelectedFrozenMomentFile(false);
            // handleClose();
          } else {
            // setSpinner(false);
            // setAlert(true);
            setAlertType(false);
            setAlertMessage("Image upload failed");
            // handleClose();
            // setSelectedFrozenMomentFile(false);
          }
        });
      });
    });
  };
  const alternateImg = (type) => {
    switch (type) {
      case "Celebration":
        return <img src={celebration1} />;
        break;
    }
    console.log("event type", type);
    // if (type == "Celebration") return "hi";
    // else return "noooooo";
  };

  const fileUploaded = () => {
    if (selectedLifeEventImage) {
      setLifeEventPicture(URL.createObjectURL(selectedLifeEventImage));
    }
  };

  // useEffect(() => {
  //   console.log("Upload File Type", uploadFileType);
  // }, [uploadFileType]);

  useEffect(() => {
    fileUploaded();
  }, [selectedLifeEventImage]);

  const updateLifeEventsLocally = (
    responseJSON,
    form_details,
    compressedImage
  ) => {
    let responseFrozenMomentId;
    console.log("updateLifeEventLocally");
    if (responseJSON.mem_id) {
      console.log("if event id is present");
      let responseFrozenMomentId = {
        mem_id: `${responseJSON.mem_id}`,
        readURL:
          compressedImage == "NOFILE"
            ? "NOFILE"
            : URL.createObjectURL(compressedImage),
      };
      let newLocalFrozenMomentObjet = Object.assign(
        form_details,
        responseFrozenMomentId
      );
      let newArr = frozenMoments.concat(newLocalFrozenMomentObjet);
      console.log("newArr : ", newArr);

      props.frozenMomentsAction(newArr);
      // return newLocalLifeEventObjet;
    } else {
      console.log("if event id not present");
      if (form_details.file_upd_flag == "UPDATE") {
        console.log("file update flag");
        let filteredFrozenMomentsArr = props.frozenMoments.filter(
          (item) => item.mem_id != eventId
        );
        console.log("filteredLifeEventArr : ", filteredFrozenMomentsArr);
        // if (form_details.file_upd_flag == "UPDATE") {
        responseFrozenMomentId = {
          readURL:
            compressedImage == "NOFILE"
              ? "NOFILE"
              : URL.createObjectURL(compressedImage),
        };
        //} //else {
        //   responseEventId = {
        //     readURL: "NOFILE",
        //   };
        // }
        let newLocalFrozenMomentObjet = Object.assign(
          form_details,
          responseFrozenMomentId
        );
        let newArr = filteredFrozenMomentsArr.concat(newLocalFrozenMomentObjet);
        console.log("newArr : ", newArr);

        props.frozenMomentsAction(newArr);
      } else {
        console.log("no change in file update flag");
        console.log("life event arr", props.frozenMoments);
        let updateFM = props.frozenMoments.filter(
          (item) => item.mem_id == form_details.mem_id
        );
        console.log("updateFM.readURL : ", updateFM);
        console.log("updateFM.readURL : ", updateFM[0].readURL);

        let newLocalFrozenMomentObjet = Object.assign(form_details);
        newLocalFrozenMomentObjet.readURL = updateFM[0].readURL;
        let filteredFrozenMomentsArr = props.frozenMoments.filter(
          (item) => item.mem_id != form_details.mem_id
        );
        let newArr = filteredFrozenMomentsArr.concat(newLocalFrozenMomentObjet);
        console.log("newArr : ", newArr);

        props.frozenMomentsAction(newArr);
      }
      // if (form_details.file_upd_flag == "DELETE") {
      //   let filteredLifeEventArr = props.frozenMoments.filter(
      //     (item) => item.event_id != eventId
      //   );
      //   console.log("filteredLifeEventArr : ", filteredLifeEventArr);
      //   let responseEventId = {
      //     readURL: "NOFILE",
      //   };
      //   let newLocalLifeEventObjet = Object.assign(
      //     form_details,
      //     responseEventId
      //   );
      //   let newArr = filteredLifeEventArr.concat(newLocalLifeEventObjet);
      //   console.log("newArr : ", newArr);

      //   props.lifeEventAction(newArr);
      // }
    }
  };

  return (
    <div>
      {spinner && <Spinner />}
      <Grid container sx={{ bgcolor: "#FFFFFF", m: 1 }}>
        <Grid item xs={0} sm={3.5}></Grid>

        <Grid item xs={12} sm={5}>
          {!openModel && (
            <Fade in={!openModel} timeout={500}>
              <Box sx={{ m: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  startIcon={<AddCircleOutlinedIcon />}
                  sx={{ borderRadius: 8 }}
                >
                  Add Frozen Moments
                </Button>
              </Box>
            </Fade>
          )}
          {openModel && (
            <Fade in={openModel} timeout={500}>
              <Box sx={{ mx: 2, my: 5 }}>
                <Paper elevation={6} sx={{ borderRadius: 5 }}>
                  <Box sx={{ p: 3 }}>
                    <Typography align="center" color={"#000000"} variant={"h5"}>
                      {"Add Frozen Moments"}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Grid container>
                      <Grid item xs={12} sm={6} sx={{ p: 3 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="Date"
                            inputFormat="dd/MM/yyyy"
                            value={date ? date : null}
                            onChange={handleDobChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                sx={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ p: 3 }}>
                        <TextField
                          id="standard-select-currency"
                          label="Title"
                          inputProps={{ maxLength: 45 }}
                          value={title}
                          required
                          error={validation}
                          helperText={
                            validation ? "Only 45 characters are allowed" : ""
                          }
                          onChange={(e) => setTitle(e.target.value)}
                          variant="standard"
                          sx={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ p: 3 }}>
                        <TextareaAutosize
                          id="standard-select-currency"
                          placeholder="Description *"
                          multiline
                          minRows={2}
                          maxRows={4}
                          inputProps={{ maxLength: 500 }}
                          defaultValue={description}
                          required
                          onChange={(e) => setDescription(e.target.value)}
                          variant="standard"
                          style={{ width: "100%" }}
                          sx={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ p: 3 }}>
                        <Suggestion
                          label="Visiblity"
                          value={Visiblity}
                          returnValue={setVisiblity}
                          defaultValue={visiblity}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ p: 3 }}>
                        {fileTypeDropDown && (
                          <TextField
                            id="standard-select-currency"
                            select
                            label="Upload File Type"
                            value={uploadFileType}
                            onChange={(e) => setUploadFileType(e.target.value)}
                            variant="standard"
                            sx={{ width: "100%" }}
                          >
                            {fileTypeDropDown.sort().map((option) => (
                              <MenuItem
                                disabled={option.includes("(upgrade)")}
                                key={option}
                                value={
                                  option.charAt(0).toUpperCase() +
                                  option.slice(1)
                                }
                              >
                                {option.charAt(0).toUpperCase() +
                                  option.slice(1)}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      </Grid>
                      <Grid item xs={12} sx={{ p: 3 }}>
                        <Box sx={{ width: "100%" }}>
                          {uploadFileType &&
                            uploadFileType != "Youtube Link" &&
                            uploadFileType != "Other Link" && (
                              <>
                                {/* <Box
                                sx={{
                                  fontWeight: "bold",
                                  color: selectedLifeEventImage
                                    ? "green"
                                    : "blue",
                                }}
                              >
                                {uploadFileType && selectedLifeEventImage == ""
                                  ? `UPLOAD ${uploadFileType.toUpperCase()} *`
                                  : fileType != "NOFILE" &&
                                    selectedLifeEventImage == ""
                                  ? "Previous File Exists"
                                  : "New File selected !!"}
                              </Box> */}

                                <Box sx={{ width: "100%" }}>
                                  <input
                                    accept={
                                      uploadFileType == "Video"
                                        ? "video/mp4"
                                        : uploadFileType == "Image"
                                        ? "image/*"
                                        : uploadFileType == "Audio"
                                        ? "audio/mpeg"
                                        : uploadFileType == "PDF"
                                        ? "application/pdf"
                                        : uploadFileType == "Document"
                                        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        : ""
                                    }
                                    type="file"
                                    id="select-life-event-image"
                                    style={{ display: "none" }}
                                    onChange={(e) =>
                                      handleFileSelect(e.target.files[0])
                                    }
                                  />
                                  <label
                                    htmlFor="select-life-event-image"
                                    style={{ width: "100%" }}
                                  >
                                    <Button
                                      sx={{ width: "100%", borderRadius: 8 }}
                                      component="span"
                                      variant="contained"
                                      disabled={deleteImage == "DELETE"}
                                      onClick={() => setDeleteImage("UPDATE")}
                                      startIcon={
                                        uploadFileType == "Video" ? (
                                          <YouTubeIcon sx={{ mr: 1 }} />
                                        ) : uploadFileType == "Image" ? (
                                          <ImageOutlinedIcon sx={{ mr: 1 }} />
                                        ) : uploadFileType == "Audio" ? (
                                          <MicIcon sx={{ mr: 1 }} />
                                        ) : (
                                          ""
                                        )
                                      }
                                      color={
                                        uploadFileType == "Video"
                                          ? "error"
                                          : uploadFileType == "Image"
                                          ? "success"
                                          : uploadFileType == "Audio"
                                          ? "info"
                                          : ""
                                      }
                                    >
                                      {`UPLOAD ${uploadFileType}`}
                                    </Button>
                                  </label>
                                </Box>
                              </>
                            )}
                          {(uploadFileType == "Youtube Link" ||
                            uploadFileType == "Other Link") && (
                            <>
                              <TextField
                                id="standard-select-currency"
                                label={uploadFileType}
                                value={link}
                                required
                                error={!linkValidation}
                                helperText={
                                  !linkValidation ? "enter a proper URL" : ""
                                }
                                onChange={(e) => setLink(e.target.value)}
                                variant="standard"
                                sx={{ width: "100%" }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment
                                      position="start"
                                      sx={{
                                        color:
                                          uploadFileType == "Youtube Link"
                                            ? "red"
                                            : "blue",
                                      }}
                                    >
                                      {uploadFileType == "Youtube Link" ? (
                                        <YouTubeIcon />
                                      ) : (
                                        <InsertLinkOutlinedIcon />
                                      )}
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sx={{ p: 3, display: "grid" }}>
                        <Button
                          disabled={disableButton}
                          sx={{
                            alignItem: "center",
                            color: "#FFFFFF",
                            mb: 2,
                            borderRadius: 8,
                          }}
                          variant="contained"
                          onClick={() => {
                            updateForm();
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          // disabled={disableButton}
                          sx={{
                            alignItem: "center",
                            color: "primary",
                            bgColor: "#808080",
                            borderRadius: 8,
                          }}
                          variant="outlined"
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Fade>
          )}
        </Grid>
        <Grid item xs={0} sm={3.5}></Grid>

        <Grid item xs={0} sm={3.5}></Grid>
        <Grid item xs={12} sm={5}>
          {frozenMoments &&
            frozenMoments.map((item) => (
              <div>
                {editMode != item.mem_id ? (
                  <Fade in={true} timeout={500}>
                    <Box sx={{ mx: 2, my: 5 }}>
                      <Paper elevation={6} sx={{ borderRadius: 5 }}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            display={"flex"}
                            sx={{ p: 2, width: "95%" }}
                            alignItems={"center"}
                          >
                            <Typography color={"#000000"} variant={"h5"}>
                              {item.mem_title + " - "}
                            </Typography>
                            <Typography color={"#000000"} variant={"subtitle1"}>
                              {"  " + item.mem_dt}
                            </Typography>
                          </Box>
                          <Box sx={{ p: 2 }}>
                            {/* <IconButton>
                        <MoreHorizIcon />
                      </IconButton> */}
                            <EditAndDelete
                              item={item}
                              edit={handleEdit}
                              delete={deleteFrozenMoment}
                            />
                          </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                          <Typography
                            color={"#000000"}
                            variant={"h5"}
                            sx={{ fontSize: "16px" }}
                          >
                            {item.mem_desc}
                          </Typography>
                        </Box>
                        <Box sx={{ width: "100%" }}>
                          {item.mem_link == null || item.mem_link == "" ? (
                            item.file_type.split("/")[0] == "image" ? (
                              <img
                                src={item.readURL}
                                style={{
                                  // padding: "0.3px",
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "contain",
                                  borderBottomLeftRadius: "20px",
                                  borderBottomRightRadius: "20px",
                                }}
                              />
                            ) : item.file_type.split("/")[0] == "video" ? (
                              <video
                                width="100%"
                                height="480"
                                controls
                                style={{
                                  borderBottomLeftRadius: "20px",
                                  borderBottomRightRadius: "20px",
                                }}
                              >
                                <source src={item.readURL} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            ) : item.file_type.split("/")[0] == "audio" ? (
                              <audio
                                controls
                                style={{
                                  width: "100%",
                                  borderBottomLeftRadius: "20px",
                                  borderBottomRightRadius: "20px",
                                }}
                              >
                                <source src={item.readURL} type="audio/mpeg" />
                                Your browser does not support the video tag.
                              </audio>
                            ) : (
                              ""
                            )
                          ) : matchYoutubeUrl(item.mem_link) ? (
                            <iframe
                              style={{
                                borderBottomLeftRadius: "20px",
                                borderBottomRightRadius: "20px",
                              }}
                              width="100%"
                              height="480"
                              src={item.mem_link}
                              // frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Embedded youtube"
                            />
                          ) : (
                            <Box sx={{ p: 2 }}>
                              <Button
                                color="error"
                                sx={{ borderRadius: 8, width: "100%" }}
                                variant="outlined"
                                startIcon={<OpenInNewIcon />}
                                onClick={() =>
                                  window.open(item.mem_link, "_blank")
                                }
                              >
                                Open Link{" "}
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Paper>
                    </Box>
                  </Fade>
                ) : (
                  <Fade in={editMode} timeout={500}>
                    <Box sx={{ mx: 2, my: 5 }}>
                      <Paper elevation={6} sx={{ borderRadius: 5 }}>
                        <Box sx={{ p: 3 }}>
                          <Typography
                            align="center"
                            color={"#000000"}
                            variant={"h5"}
                          >
                            {"Edit Frozen Moments"}
                          </Typography>
                        </Box>
                        <Divider />
                        <Box>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ p: 3 }}>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DesktopDatePicker
                                  label="Event"
                                  inputFormat="dd/MM/yyyy"
                                  value={date ? date : null}
                                  onChange={handleDobChange}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="standard"
                                      sx={{ width: "100%" }}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ p: 3 }}>
                              <TextField
                                id="standard-select-currency"
                                label="Title"
                                inputProps={{ maxLength: 45 }}
                                value={title}
                                required
                                error={validation}
                                helperText={
                                  validation
                                    ? "Only 45 characters are allowed"
                                    : ""
                                }
                                onChange={(e) => setTitle(e.target.value)}
                                variant="standard"
                                sx={{ width: "100%" }}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ p: 3 }}>
                              <TextareaAutosize
                                id="standard-select-currency"
                                placeholder="Description *"
                                multiline
                                minRows={2}
                                maxRows={4}
                                inputProps={{ maxLength: 500 }}
                                defaultValue={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                variant="standard"
                                style={{ width: "100%" }}
                                sx={{ width: "100%" }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ p: 3 }}>
                              <Suggestion
                                label="Visiblity"
                                value={Visiblity}
                                returnValue={setVisiblity}
                                defaultValue={visiblity}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ p: 3 }}>
                              {fileTypeDropDown && (
                                <TextField
                                  id="standard-select-currency"
                                  select
                                  label="Upload File Type"
                                  value={uploadFileType}
                                  onChange={(e) =>
                                    setUploadFileType(e.target.value)
                                  }
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                >
                                  {fileTypeDropDown.sort().map((option) => (
                                    <MenuItem
                                      disabled={option.includes("(upgrade)")}
                                      key={option}
                                      value={
                                        option.charAt(0).toUpperCase() +
                                        option.slice(1)
                                      }
                                    >
                                      {option.charAt(0).toUpperCase() +
                                        option.slice(1)}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              )}
                            </Grid>
                            <Grid item xs={12} sx={{ p: 3 }}>
                              <Box sx={{ width: "100%" }}>
                                {uploadFileType &&
                                  uploadFileType != "Youtube Link" &&
                                  uploadFileType != "Other Link" && (
                                    <>
                                      {/* <Box
                                sx={{
                                  fontWeight: "bold",
                                  color: selectedLifeEventImage
                                    ? "green"
                                    : "blue",
                                }}
                              >
                                {uploadFileType && selectedLifeEventImage == ""
                                  ? `UPLOAD ${uploadFileType.toUpperCase()} *`
                                  : fileType != "NOFILE" &&
                                    selectedLifeEventImage == ""
                                  ? "Previous File Exists"
                                  : "New File selected !!"}
                              </Box> */}

                                      <Box sx={{ width: "100%" }}>
                                        <input
                                          accept={
                                            uploadFileType == "Video"
                                              ? "video/mp4"
                                              : uploadFileType == "Image"
                                              ? "image/*"
                                              : uploadFileType == "Audio"
                                              ? "audio/mpeg"
                                              : uploadFileType == "PDF"
                                              ? "application/pdf"
                                              : uploadFileType == "Document"
                                              ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                              : ""
                                          }
                                          type="file"
                                          id="select-life-event-image"
                                          style={{ display: "none" }}
                                          onChange={(e) =>
                                            handleFileSelect(e.target.files[0])
                                          }
                                        />
                                        <label
                                          htmlFor="select-life-event-image"
                                          style={{ width: "100%" }}
                                        >
                                          <Button
                                            sx={{
                                              width: "100%",
                                              borderRadius: 8,
                                            }}
                                            component="span"
                                            variant="contained"
                                            disabled={deleteImage == "DELETE"}
                                            onClick={() =>
                                              setDeleteImage("UPDATE")
                                            }
                                            startIcon={
                                              uploadFileType == "Video" ? (
                                                <YouTubeIcon sx={{ mr: 1 }} />
                                              ) : uploadFileType == "Image" ? (
                                                <ImageOutlinedIcon
                                                  sx={{ mr: 1 }}
                                                />
                                              ) : uploadFileType == "Audio" ? (
                                                <MicIcon sx={{ mr: 1 }} />
                                              ) : (
                                                ""
                                              )
                                            }
                                            color={
                                              uploadFileType == "Video"
                                                ? "error"
                                                : uploadFileType == "Image"
                                                ? "success"
                                                : uploadFileType == "Audio"
                                                ? "info"
                                                : ""
                                            }
                                          >
                                            {`UPLOAD ${uploadFileType}`}
                                          </Button>
                                        </label>
                                      </Box>
                                    </>
                                  )}
                                {(uploadFileType == "Youtube Link" ||
                                  uploadFileType == "Other Link") && (
                                  <>
                                    <TextField
                                      id="standard-select-currency"
                                      label={uploadFileType}
                                      value={link}
                                      required
                                      error={!linkValidation}
                                      helperText={
                                        !linkValidation
                                          ? "enter a proper URL"
                                          : ""
                                      }
                                      onChange={(e) => setLink(e.target.value)}
                                      variant="standard"
                                      sx={{ width: "100%" }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment
                                            position="start"
                                            sx={{
                                              color:
                                                uploadFileType == "Youtube Link"
                                                  ? "red"
                                                  : "blue",
                                            }}
                                          >
                                            {uploadFileType ==
                                            "Youtube Link" ? (
                                              <YouTubeIcon />
                                            ) : (
                                              <InsertLinkOutlinedIcon />
                                            )}
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ p: 3, display: "grid" }}>
                              <Button
                                disabled={disableButton}
                                sx={{
                                  alignItem: "center",
                                  color: "#FFFFFF",
                                  mb: 2,
                                  borderRadius: 8,
                                }}
                                variant="contained"
                                onClick={() => {
                                  updateForm();
                                }}
                              >
                                Save
                              </Button>
                              <Button
                                // disabled={disableButton}
                                sx={{
                                  alignItem: "center",
                                  color: "primary",
                                  bgColor: "#808080",
                                  borderRadius: 8,
                                }}
                                variant="outlined"
                                onClick={() => {
                                  handleClose();
                                }}
                              >
                                Cancel
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Box>
                  </Fade>
                )}
              </div>
            ))}
        </Grid>
        <Grid item xs={0} sm={3.5}></Grid>
      </Grid>

      <AlertMessage
        open={alert}
        close={setAlert}
        message={alertMessage}
        type={alertType}
      ></AlertMessage>

      <PicturePopUp open={picPopUp} close={setPicPopUp} src={imagePopupSrc} />
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    authToken: state.commonState.authToken,
    userId: state.commonState.userId,
    lgId: state.commonState.lgId,
    userName: state.commonState.userName,
    aboutLg: state.commonState.aboutLg,
    emailId: state.commonState.emailId,
    ownedLg: state.commonState.ownedLg,
    lifeEvent: state.commonState.lifeEvent,
    lgPlan: state.commonState.lgPlan,
    frozenMoments: state.commonState.frozenMoments,
  };
};

export default connect(mapStateToProp, { frozenMomentsAction })(FrozenMoments);
