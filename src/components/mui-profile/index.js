import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPane from "../mui-tabpane";
import About from "../mui-about";
import AboutForm from "../mui-about-form";
import ResponsiveAppBar from "../mui-appbar";
import MobileAppBar from "../mui-mobile-appbar";
import MobileViewAboutForm from "../mui-mobile-about-form";
import imageCompression from "browser-image-compression";
import {
  authTokenAction,
  ownedLgAction,
  aboutLgAction,
  lgIdAction,
  lgPlanAction,
} from "../../redux/actions";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import CropEasy from "../cropPic";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
// import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import LifeEvents from "../mui-lifeEvents";
import FrozenMoments from "../mui-frozenMoments";
import Wisdom from "../mui-wisdom";
import Announcements from "../mui-announcements";
import AboutViewMode from "../mui-about-viewmode";
import AlertMessage from "../mui-alertmessage";
import Fab from "@mui/material/Fab";
import { useParams, useNavigate, useMatch } from "react-router-dom";
import { fontStyle } from "@mui/system";
import { set } from "date-fns";
import PicturePopUp from "../mui-propicpopup";
import Spinner from "../mui-spinner";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2F4079",
    },
    highlight: {
      main: "#8699DA",
    },
  },
  avathar: {
    height: "210px",
    width: "210px" /*,mt : "10px", mb : "50px", ml : "175px"*/,
  },
});

const Profile = (props) => {
  const pages = [
    "Life Events",
    "Frozen Moments",
    "Achievements",
    "Wisdom",
    "Love & Wishes",
    "Announcements",
  ];
  let compressedImage;

  const [value, setValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState();
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState(null);
  const [file, setFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [cropedImage, setCropedImage] = useState(false);
  const [readyToUpload, setReadyToUpload] = useState(false);
  const [picPopUp, setPicPopUp] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [cropedPhotoUrl, setCropedPhotoUrl] = useState();
  const [imageType, setImageType] = useState(null);
  const [compressedImagestate, setCompressedImage] = useState();

  let pathName;
  let lgUrl;

  useEffect(() => {
    console.log("print file", file);
  }, [file]);
  useEffect(() => {
    if (selectedImage) {
      console.log("imageType", imageType);
      setImageType(selectedImage.type);
      setPhotoURL(URL.createObjectURL(selectedImage));
      setOpenCrop(true);
      setSelectedImage(false);
    }
  }, [selectedImage, file, cropedImage, photoURL]);

  useEffect(() => {
    if (file && photoURL && readyToUpload) {
      uploadImage();
      setReadyToUpload(false);
      setPhotoURL(false);
    }
  }, [selectedImage, file, cropedImage, photoURL, imageType]);

  useEffect(() => {
    pathName = window.location.pathname;
    lgUrl = pathName.split("/");
    if (lgUrl[1] === "profile" && lgUrl[2]) {
      setEditMode(false);
      if (props.aboutLg == "") {
        setSpinner(true);
        console.log("from profile");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            UserId: `${props.userId}`,
            token: `${props.authToken}`,
          },
        };
        fetch(
          `https://lifograf.com/lg_api/lgAbout?url=${lgUrl[2]}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            props.aboutLgAction(
              Object.assign(
                responseJSON.output,
                responseJSON.user_connect_to_lg
              )
            );
            props.lgIdAction(responseJSON.output.lg_id);
            props.lgPlanAction(responseJSON.lg_plan);
            setSpinner(false);
          })
          .catch((error) => {
            console.log(error);
            setAlert(true);
            setAlertType(false);
            setAlertMessage("something went wrong please try again later");
          });
      }
    } else {
      setEditMode(true);
    }
  }, [window.location.pathname]);

  useEffect(() => {}, [props.userName]);

  const fileUpload = () => {
    if (selectedImage) {
      setPhotoURL(URL.createObjectURL(selectedImage));
      setOpenCrop(true);
    }
  };

  const profilepicturepopup = () => {
    if (props.lgId) {
      setPicPopUp(true);
    } else {
      setPicPopUp(false);
    }
  };

  const handleSelectedImage = (event) => {
    setSelectedImage(event);
    setImageType(event.type);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpenCrop(false);
    setSelectedImage(null);
    setPhotoURL(null);
    // setFile(null);
  };

  const uploadImage = (url) => {
    if (photoURL) {
      setCropedImage(photoURL);
    }
    setSpinner(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        UserId: `${props.userId}`,
        token: `${props.authToken}`,
      },
      body: JSON.stringify({
        file_type: `${imageType}`,
        lg_id: props.lgId,
      }),
    };
    fetch("https://lifograf.com/lg_api/profPic", requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        // let responseArr = responseJSON.postDetailArr[0];
        // response = responseArr[0];
        // const url = response.formAttributes.action;
        // console.log("respnse", response);
        // const formData = new FormData();
        // Object.keys(response.formInputs).forEach((key) => {
        //   formData.append(key, response.formInputs[key]);
        // });
        // console.log("file path", selectedImage);
        // formData.append("content-Type", imageType);
        // formData.append("file", file);
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ", " + pair[1]);
        // }
        // const requestOptions = {
        //   method: response.formAttributes.method,
        //   enctype: response.formAttributes.enctype,
        //   headers: {
        //     // "Content-Type": `${response.formAttributes.enctype}`,
        //   },
        //   body: formData,
        // };
        // console.log("url", url, "reqopt", requestOptions);
        // fetch(url, requestOptions).then((response) => {
        //   setSpinner(false);
        //   setOpenCrop(false);
        //   setSelectedImage(null);
        //   setPhotoURL(null);
        //   setFile(null);
        // });
        console.log(responseJSON);
        responseJSON.postDetailArr[0].forEach((item) => {
          let url = item.formAttributes.action;
          let objKey = item.objKey.slice("/");
          console.log("file size greater than 200kb");
          let imageFile = file;
          let options = {
            maxSizeMB: objKey[0] == "thmb" ? 0.05 : 0.1,
            maxWidthOrHeight: objKey[0] == "thmb" ? 320 : 720,
            useWebWorker: true,
          };
          imageCompression(imageFile, options).then(function (compressedFile) {
            compressedImage = compressedFile;
            setCompressedImage(compressedFile);
            console.log(
              `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
            ); // smaller than maxSizeMB

            const formData = new FormData();
            Object.keys(item.formInputs).forEach((key) => {
              formData.append(key, item.formInputs[key]);
            });
            formData.append("content-Type", imageType);
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
                setSpinner(false);
                setAlert(true);
                setAlertType(true);
                setAlertMessage("Life Event updated successfully");
                // getLifeEvents();
                // setSelectedLifeEventImage(false);
                handleClose();
              } else {
                setSpinner(false);
                setAlert(true);
                setAlertType(false);
                setAlertMessage("Image upload failed");
                handleClose();
                // setSelectedLifeEventImage(false);
              }
            });
          });
        });
      });
  };
  return (
    <div>
      {props.authToken && (
        <ThemeProvider theme={theme}>
          <Grid container sx={{ width: "100%" }}>
            {spinner && <Spinner />}
            <Grid item sm={12}>
              <Box
                item
                sx={{ display: { xs: "none", sm: "view", width: "100%" } }}
              >
                <ResponsiveAppBar />
              </Box>
              <Box
                item
                sx={{ display: { xs: "view", sm: "none", md: "none" } }}
              >
                <MobileAppBar />
              </Box>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} sx={{bgcolor : "#8699DA", display : "flex"}}> */}
            {/* <Box sx={{bgcolor : "#8699DA"}}> */}
            <Grid item xs={12} sm={3} md={3} sx={{ mt: 8, bgcolor: "#8699DA" }}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems="center"
                sx={{ margin: { xs: "20%  20%", sm: "2%  20%" } }}
              >
                <Box onClick={() => profilepicturepopup()}>
                  <Avatar
                    sx={{ mt: 2, height: 210, width: 210 }}
                    alt={file ? file : ""}
                    src={file ? cropedPhotoUrl : props.aboutLg.profPicThmb}
                  />
                </Box>
                {props.aboutLg && !props.ownedLg[0] ? (
                  <>
                    <input
                      accept="image/*"
                      type="file"
                      id="select-image"
                      style={{ display: "none" }}
                      onChange={(e) => handleSelectedImage(e.target.files[0])}
                    />
                    <label htmlFor="select-image">
                      <Fab
                        size="small"
                        component="span"
                        sx={{ mt: "-65px", ml: "140px" }}
                      >
                        <EditIcon />
                      </Fab>
                    </label>
                  </>
                ) : (props.lgId && props.aboutLg.user_owner_type == "Owner") ||
                  props.aboutLg.user_owner_type == "Collaborator" ||
                  props.aboutLg.user_owner_type == "Self" ? (
                  <>
                    <input
                      accept="image/*"
                      type="file"
                      id="select-image"
                      style={{ display: "none" }}
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                    <label htmlFor="select-image">
                      <Fab
                        size="small"
                        component="span"
                        sx={{ mt: "-65px", ml: "140px" }}
                      >
                        <EditIcon />
                      </Fab>
                    </label>
                  </>
                ) : (
                  ""
                )}
                {props.aboutLg && (
                  <Typography
                    align="center"
                    sx={{ color: "#FFFFFF", fontSize: "32px" }}
                  >
                    {props.aboutLg
                      ? props.aboutLg.first_name + " " + props.aboutLg.last_name
                      : ""}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={9}
              md={9}
              zeroMinWidth
              sx={{
                mt: 8,
                bgcolor: "#8699DA",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                display={"flex"}
                flexDirection="column"
                flexWrap="wrap"
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ m: 5, minHeight: "185px", width: "95%" }}
              >
                {props.aboutLg && (
                  <Typography
                    align="center"
                    style={{ wordWrap: "break-word" }}
                    sx={{
                      color: "#FFFFFF",
                      fontSize: "36px",
                      fontStyle: "italic",
                      width: "90%",
                    }}
                  >
                    "{props.aboutLg.short_desc}"
                  </Typography>
                )}
              </Box>
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              ></Box> */}
            </Grid>
            <Grid
              container
              sx={{
                bgcolor: "#E8E2E2",
                m: { xs: "none", sm: 1 },
                width: "100%",
              }}
            >
              <Grid item xs={12}>
                <Box
                  item
                  sx={{
                    /* bgcolor: "#E8E2E2", m: 1,*/ display: {
                      xs: "none",
                      sm: "flex",
                    },
                  }}
                >
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      width: "100%",
                    }}
                  >
                    <Tabs
                      value={value}
                      textColor="#000000"
                      indicatorColor="secondary"
                      centered
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      sx={{ display: "flex", color: "#000000", width: "100%" }}
                    >
                      <Tab
                        sx={{
                          ml: 3,
                          mr: 3,
                          color: "#000000",
                        }}
                        label={"About"}
                        {...a11yProps(0)}
                      ></Tab>
                      {pages.map((page, index) => (
                        <Tab
                          sx={{
                            ml: 3,
                            mr: 3,
                            color: props.lgId ? "#000000" : "#808080",
                          }}
                          label={page}
                          {...a11yProps(index + 1)}
                          disabled={props.lgId ? false : true}
                        ></Tab>
                      ))}
                    </Tabs>
                  </Box>
                </Box>
                <Box item sx={{ bgcolor: "#E8E2E2", display: { sm: "none" } }}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      width: "100%",
                    }}
                  >
                    <Tabs
                      value={value}
                      textColor="#000000"
                      variant="scrollable"
                      indicatorColor="secondary"
                      centered={true}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      sx={{
                        display: "flex",
                        color: "#000000",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {pages.map((page, index) => (
                        <Tab
                          sx={{ ml: 3, mr: 3 }}
                          label={page}
                          {...a11yProps(index)}
                        ></Tab>
                      ))}
                    </Tabs>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {editMode && editMode ? (
                  <Box>
                    <Box item sx={{ display: { xs: "none", sm: "flex" } }}>
                      <TabPane value={value} index={0}>
                        <About
                          editMode={setEditMode}
                          editModeState={editMode}
                        />
                      </TabPane>
                    </Box>
                    <Box item sx={{ display: { xs: "flex", sm: "none" } }}>
                      <TabPane value={value} index={0}>
                        <MobileViewAboutForm />
                      </TabPane>
                    </Box>
                  </Box>
                ) : (
                  <TabPane value={value} index={0}>
                    <AboutViewMode
                      aboutLg={props.aboutLg}
                      editMode={setEditMode}
                    />
                  </TabPane>
                )}

                <TabPane value={value} index={1}>
                  <LifeEvents />
                </TabPane>
                <TabPane value={value} index={2}>
                  <FrozenMoments />
                </TabPane>
                <TabPane value={value} index={3}>
                  <LifeEvents />
                </TabPane>
                <TabPane value={value} index={4}>
                  <Wisdom />
                </TabPane>
                <TabPane value={value} index={5}>
                  <LifeEvents />
                </TabPane>
                <TabPane value={value} index={6}>
                  <Announcements />
                </TabPane>
              </Grid>
            </Grid>
            <AlertMessage
              open={alert}
              close={setAlert}
              message={alertMessage}
              type={alertType}
            ></AlertMessage>

            {/* </Box> */}
            {/* </Grid> */}
          </Grid>
          <PicturePopUp
            open={picPopUp}
            close={setPicPopUp}
            src={props.aboutLg.profPicThmb}
          />
          <Dialog
            open={openCrop}
            onClose={() => handleClose()}
            // TransitionComponent={Transition}
          >
            <CropEasy
              {...{
                photoURL,
                setFile,
                setOpenCrop,
                setCropedPhotoUrl,
                setReadyToUpload,
              }}
            />
          </Dialog>
        </ThemeProvider>
      )}
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
    ownedLg: state.commonState.ownedLg,
  };
};
export default connect(mapStateToProp, {
  aboutLgAction,
  lgIdAction,
  lgPlanAction,
})(Profile);
