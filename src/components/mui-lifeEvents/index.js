import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import bg_1 from "../../images/bg_2.svg";
import { connect } from "react-redux";
import PicturePopUp from "../mui-propicpopup";
import MenuItem from "@mui/material/MenuItem";
import TransitionsModal from "../mui-modal";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { setDate } from "date-fns";
import UploadIcon from "@mui/icons-material/Upload";
import AlertMessage from "../mui-alertmessage";
import imageCompression from "browser-image-compression";
import { lifeEventAction } from "../../redux/actions";
import le from "../../images/le.png";
import Spinner from "../mui-spinner";
import Paper from "@mui/material/Paper";
import Suggestion from "../mui-suggestion";
import celebration1 from "../../images/LGAssets/celebration1.jpg";

const LifeEvents = (props) => {
  const EventType = ["Celebration", "Grief", "Turning Point"];
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
  const [selectedLifeEventImage, setSelectedLifeEventImage] = useState("");
  const [lifeEventPicture, setLifeEventPicture] = useState();
  const [lifeEvent, setLifeEvent] = useState();
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

  const handleOpen = () => {
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
    setSelectedLifeEventImage("");
  };
  const handleDobChange = (newValue) => setDate(newValue);
  const handleImageSelect = (event) => {
    setSelectedLifeEventImage(event);
    setFileType(event.type);
    setDeleteImage("UPDATE");
  };
  const handleEdit = (item) => {
    setEventType(item.event_type);
    setFileType(item.file_type);
    setDescription(item.event_desc);
    setVisiblity(item.visibility);
    setTitle(item.event_title);
    setDate(item.event_dt);
    setOpen(true);
    setEditMode(true);
    setEventId(item.event_id);
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
  //   if (lifeEvent) {
  //     // props.lifeEventAction("");
  //     console.log("life Events : ", lifeEvent);
  //     console.log("locally updated life Events : ", locallyUpdatedLifeEvents);

  //     let newArr = lifeEvent.concat(locallyUpdatedLifeEvents);
  //     console.log("newArr : ", newArr);

  //     props.lifeEventAction(newArr);
  //   }
  // }, [locallyUpdatedLifeEvents]);

  useEffect(() => {
    if (title.length >= 45) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [title]);

  useEffect(() => {
    console.log("file type ", fileType);
  }, [fileType]);

  useEffect(() => {
    if (eventType && description && visiblity && title && date) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [eventType, description, visiblity, title, date]);

  useEffect(() => {
    console.log("calling get life events");
    getLifeEvents();
  }, []);

  useEffect(() => {
    setLifeEvent(props.lifeEvent);
  }, [props.lifeEvent]);

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

  const deleteLifeEvent = (entryId, fileType) => {
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
        entry_type: "Event",
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
          let deletedLifeEventsArr = props.lifeEvent.filter(
            (item) => item.event_id != entryId
          );
          props.lifeEventAction(deletedLifeEventsArr);
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
    setSpinner(true);
    if (editMode) {
      form_details = {
        lg_id: props.lgId,
        event_dt: date,
        event_type: eventType,
        file_type: deleteImage == "DELETE" ? "NOFILE" : fileType,
        event_title: title,
        event_desc: description,
        visibility: visiblity,
        event_id: eventId,
        file_upd_flag: deleteImage,
        event_dt: convert(date),
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
          event_dt: date,
          event_type: eventType,
          file_type: deleteImage == "DELETE" ? "NOFILE" : fileType,
          event_title: title,
          event_desc: description,
          visibility: visiblity,
          event_id: eventId,
          file_upd_flag: deleteImage,
          event_dt: date,
        }),
      };
    } else {
      form_details = {
        lg_id: props.lgId,
        event_dt: date,
        event_type: eventType,
        file_type: fileType ? fileType : "NOFILE",
        event_title: title,
        event_desc: description,
        visibility: visiblity,
        file_upd_flag: "",
        event_dt: convert(date),
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
          event_dt: date,
          event_type: eventType,
          file_type: fileType ? fileType : "NOFILE",
          event_title: title,
          event_desc: description,
          visibility: visiblity,
          file_upd_flag: "",
        }),
      };
    }
    fetch("https://lifograf.com/lg_api/lifeEvent", requestOptions)
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
              imageCompression(imageFile, options).then(function (
                compressedFile
              ) {
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

                    // setSelectedLifeEventImage(false);
                    // handleClose();
                  } else {
                    // setSpinner(false);
                    // setAlert(true);
                    setAlertType(false);
                    setAlertMessage("Image upload failed");
                    // handleClose();
                    // setSelectedLifeEventImage(false);
                  }
                });
              });
            });
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
            // setSelectedLifeEventImage(false);
          }
        } else {
          // setSpinner(false);
          console.log(responseJSON);
          // setAlert(true);
          setAlertType(false);
          // getLifeEvents();
          setAlertMessage(responseJSON.message);
          // setOpen(false);
          // setSelectedLifeEventImage(false);
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
      `https://lifograf.com/lg_api/lifeEvent?lg_id=${props.lgId}`,
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
          props.lifeEventAction(responseJSON.lifeEventList);
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

  const compressImage = (event, compressiontype) => {
    console.log("selected life event image", Number(event.size));
    setFileSize(event.size);
    if (
      Number(event.size) / 1024 / 1024 >
      Number(props.lgPlan.max_le_file_storage_kb) / 1024
    ) {
      console.log("file size greater than 200kb");
      let imageFile = event;
      let options = {
        maxSizeMB: compressiontype == "thmb" ? 0.05 : 0.1,
        maxWidthOrHeight: compressiontype == "thmb" ? 320 : 720,
        useWebWorker: true,
      };
      imageCompression(imageFile, options).then(function (compressedFile) {
        compressedImage = compressedFile;
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB
      });
    } else {
      setCompressedFile(event);
    }
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

  useEffect(() => {
    fileUploaded();
  }, [selectedLifeEventImage]);

  const updateLifeEventsLocally = (
    responseJSON,
    form_details,
    compressedImage
  ) => {
    let responseEventId;
    console.log("updateLifeEventLocally");
    if (responseJSON.event_id) {
      console.log("if event id is present");
      let responseEventId = {
        event_id: `${responseJSON.event_id}`,
        readURL:
          compressedImage == "NOFILE"
            ? "NOFILE"
            : URL.createObjectURL(compressedImage),
      };
      let newLocalLifeEventObjet = Object.assign(form_details, responseEventId);
      let newArr = lifeEvent.concat(newLocalLifeEventObjet);
      console.log("newArr : ", newArr);

      props.lifeEventAction(newArr);
      // return newLocalLifeEventObjet;
    } else {
      console.log("if event id not present");
      if (
        form_details.file_upd_flag == "UPDATE" ||
        form_details.file_upd_flag == "DELETE"
      ) {
        console.log("file update flag");
        let filteredLifeEventArr = props.lifeEvent.filter(
          (item) => item.event_id != eventId
        );
        console.log("filteredLifeEventArr : ", filteredLifeEventArr);
        if (form_details.file_upd_flag == "UPDATE") {
          responseEventId = {
            readURL:
              compressedImage == "NOFILE"
                ? "NOFILE"
                : URL.createObjectURL(compressedImage),
          };
        } else {
          responseEventId = {
            readURL: "NOFILE",
          };
        }
        let newLocalLifeEventObjet = Object.assign(
          form_details,
          responseEventId
        );
        let newArr = filteredLifeEventArr.concat(newLocalLifeEventObjet);
        console.log("newArr : ", newArr);

        props.lifeEventAction(newArr);
      } else {
        console.log("no change in file update flag");
        console.log("life event arr", props.lifeEvent);
        let updateLE = props.lifeEvent.filter(
          (item) => item.event_id == form_details.event_id
        );
        console.log("updateLe.readURL : ", updateLE);
        console.log("updateLe.readURL : ", updateLE[0].readURL);

        let newLocalLifeEventObjet = Object.assign(form_details);
        newLocalLifeEventObjet.readURL = updateLE[0].readURL;
        let filteredLifeEventArr = props.lifeEvent.filter(
          (item) => item.event_id != form_details.event_id
        );
        let newArr = filteredLifeEventArr.concat(newLocalLifeEventObjet);
        console.log("newArr : ", newArr);

        props.lifeEventAction(newArr);
      }
      // if (form_details.file_upd_flag == "DELETE") {
      //   let filteredLifeEventArr = props.lifeEvent.filter(
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
      <Box
        item
        sx={{ mt: 2 }}
        justifyContent="center"
        alignItems={"center"}
        display={"flex"}
        flexDirection="column"
      >
        <Box sx={{ minWidth: "900px", width: "960px" }}>
          <Box sx={{}}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlinedIcon />}
              onClick={handleOpen}
            >
              Add Life Event
            </Button>
          </Box>
          <Box sx={{}}>
            {lifeEvent &&
              lifeEvent.map((item) => (
                <Paper elevation={3} sx={{ height: "180px", my: 2 }}>
                  <Grid container>
                    <Grid item xs={2.5}>
                      {/* <CardContent sx={{}}> */}
                      <Typography
                        sx={{ m: 1 }}
                        color={"#000"}
                        fontWeight="bold"
                        align="center"
                      >
                        {convertToMonth(item.event_dt)}
                      </Typography>
                      {/* </CardContent> */}
                      <Box onClick={() => profilepicturepopup(item.readURL)}>
                        <CardMedia
                          component="img"
                          // height="180"
                          // maxWidth="200"
                          image={
                            item.readURL == "NOFILE"
                              ? celebration1
                              : item.readURL
                          } //"/static/images/cards/contemplative-reptile.jpg"
                          alt={celebration1}
                          sx={{
                            borderRadius: 3,
                            m: 1,
                            maxWidth: "175px",
                            minWidth: "175px",
                            width: "175px",
                            maxHeight: "100px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={8.5} sx={{}}>
                      {/* <CardContent> */}
                      <Typography
                        color={"#000000"}
                        fontSize="24px"
                        fontWeight={"bold"}
                        sx={{}}
                      >
                        {item.event_title}
                      </Typography>
                      <hr
                        style={{
                          color: "#8699DA",
                          height: 3,
                          width: 100,
                        }}
                      />
                      {/* </CardContent> */}

                      {/* <CardContent> */}
                      <Typography
                        sx={{ mt: 2 }}
                        color={"#000000"}
                        fontSize="16px"
                        style={{ wordWrap: "break-word" }}
                      >
                        {item.event_desc}
                      </Typography>
                      {/* </CardContent> */}
                    </Grid>
                    <Grid item xs={1} justifyContent={"flex-end"} sx={{}}>
                      {/* <CardActions sx={{ p: 0, m: 0 }}> */}
                      <IconButton onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ ml: 0 }}
                        onClick={() => {
                          deleteLifeEvent(item.event_id, item.file_type);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      {/* </CardActions> */}
                    </Grid>
                  </Grid>
                </Paper>
              ))}
          </Box>
        </Box>
      </Box>
      <AlertMessage
        open={alert}
        close={setAlert}
        message={alertMessage}
        type={alertType}
      ></AlertMessage>

      <Box sx={{ md: { maxWidth: "450px" }, xs: { minWidth: "100%" } }}>
        <Modal
          open={openModel}
          onClose={() => handleClose()}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModel}>
            <Card sx={style}>
              <Typography variant="h6" component="h2">
                Add Life Event
              </Typography>
              <hr />
              <Box
                sx={{
                  // "& .MuiTextField-root": { m: 1, width: "35ch" },
                  // "& .MuiBox-root": { m: 3, width: "35ch" },
                  m: 1,
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <Grid item sm={4} sx={{ p: 3 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date Of Event"
                      inputFormat="dd/MM/yyyy"
                      value={date ? date : null}
                      onChange={handleDobChange}
                      renderInput={(params) => (
                        <TextField {...params} variant="standard" />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={4} sx={{ p: 3 }}>
                  {/* <TextField
                    id="standard-select-currency"
                    select
                    label="Event Type"
                    value={eventType}
                    required
                    onChange={(e) => setEventType(e.target.value)}
                    variant="standard"
                    sx={{ width: "100%" }}
                  >
                    {EventType.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField> */}
                  <Suggestion
                    label="Event Type"
                    value={EventType}
                    returnValue={setEventType}
                    defaultValue={eventType}
                  />
                </Grid>

                <Grid item sm={4} sx={{ p: 3 }}>
                  <TextField
                    id="standard-select-currency"
                    label="Event Title"
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
                <Grid item sm={12} sx={{ p: 3 }}>
                  <TextareaAutosize
                    id="standard-select-currency"
                    placeholder="Event Description"
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
                <Grid item sm={4} sx={{ p: 3 }}>
                  {/* <TextField
                    id="standard-select-currency"
                    select
                    label="Visiblity"
                    value={visiblity}
                    onChange={(e) => setVisiblity(e.target.value)}
                    variant="standard"
                    sx={{ width: "100%" }}
                  >
                    {Visiblity.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField> */}
                  <Suggestion
                    label="Visiblity"
                    value={Visiblity}
                    returnValue={setVisiblity}
                    defaultValue={visiblity}
                  />
                </Grid>
                <Grid item sm={6} sx={{ p: 3 }}>
                  {/* <input
                    accept="image/*"
                    type="file"
                    id="select-life-event-image"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageSelect(e.target.files[0])}
                  />
                  <label htmlFor="select-life-event-image">
                    {(fileType == "NOFILE" || fileType == "") && (
                      <Button
                        component="span"
                        sx={{
                          mt: 3,
                          width: "100%",
                          // display: editMode ? "none" : "",
                        }}
                        endIcon={<UploadIcon />}
                      >
                        Upload Image
                      </Button>
                    )}
                  </label> */}
                  {/* {fileType != "NOFILE" && fileType != "" && ( */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* <span
                        style={{
                         
                        }}
                      > */}
                    <Box
                      sx={{
                        fontWeight: "bold",
                        textDecoration:
                          deleteImage == "DELETE" ? "line-through" : "",
                        color: selectedLifeEventImage ? "green" : "blue",
                      }}
                    >
                      {fileType == "NOFILE" && selectedLifeEventImage == ""
                        ? "UPLOAD FILE"
                        : fileType != "NOFILE" && selectedLifeEventImage == ""
                        ? "Previous Image Exists"
                        : "New Image selected !!"}
                    </Box>
                    {/* </span> */}
                    <Box display={"flex"}>
                      <input
                        accept="image/*"
                        type="file"
                        id="select-life-event-image"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageSelect(e.target.files[0])}
                      />
                      <label htmlFor="select-life-event-image">
                        <Button
                          sx={{}}
                          component="span"
                          disabled={deleteImage == "DELETE"}
                          onClick={() => setDeleteImage("UPDATE")}
                        >
                          <UploadIcon />
                        </Button>
                      </label>
                      {fileType != "NOFILE" && (
                        <Button
                          sx={{}}
                          disabled={selectedLifeEventImage}
                          onClick={() => setDeleteImage("DELETE")}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </Box>
                  </Box>
                  {/* // )} */}
                </Grid>
              </Box>
              <Box
                textAlign="center"
                display="flex"
                justifyContent={"space-evenly"}
              >
                <Button
                  // disabled={disableButton}
                  sx={{
                    alignItem: "center",
                    color: "primary",
                    bgColor: "#808080",
                  }}
                  variant="outlined"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={disableButton}
                  sx={{ alignItem: "center", color: "#FFFFFF" }}
                  variant="contained"
                  onClick={() => {
                    updateForm();
                  }}
                >
                  Save
                </Button>
              </Box>
            </Card>
          </Fade>
        </Modal>
      </Box>
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
  };
};

export default connect(mapStateToProp, { lifeEventAction })(LifeEvents);
