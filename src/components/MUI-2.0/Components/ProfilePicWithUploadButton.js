import { Avatar, Box, Dialog } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CropEasy from "../Components/cropPic/index";
import { postProfilePic } from "../Functions/Api's/ProfilePicApi/ProfilePicApi";
import { connect } from "react-redux";

const ProfilePicUploadButton = (props) => {
  //-----------------------Declare state Here-----------------------------//
  const [image, setImage] = useState(false);
  const [imageType, setImageType] = useState(false);
  const [croppedImage, setCroppedImage] = useState(false);

  //-----------------------Declare functions Here-----------------------------//
  const handleImageSelection = (event) => {
    setImage(URL.createObjectURL(event));
    setImageType(event.type);
  };
  const handleCancel = (event) => {
    setImage(false);
    // setImageType(false);
    props.imageFlag(false);
    props.croppedImage(false);
  };
  const handleUpload = (event) => {
    console.log("cropped image : ", event);
    console.log("cropped image type : ", event.type);
    setImage(false);
    setCroppedImage(event);
    props.imageFlag(true);
    props.croppedImage(event);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Avatar
        sx={{
          width: props.width,
          height: props.height,
          bgcolor: "secondary.main",
        }}
        src={
          props.mode === "edit"
            ? croppedImage !== false
              ? URL.createObjectURL(croppedImage)
              : props.aboutLg.readURL
            : croppedImage !== false
            ? URL.createObjectURL(croppedImage)
            : null
        }
      ></Avatar>
      <IconButton
        aria-label="upload picture"
        component="label"
        sx={{ position: "absolute", bottom: "-15px" }}
      >
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={(e) => handleImageSelection(e.target.files[0])}
        />
        <PhotoCamera />
      </IconButton>
      <Dialog open={image !== false} onClose={() => setImage(false)}>
        <CropEasy
          photoURL={image}
          setOpenCrop={handleCancel}
          setFile={handleUpload}
          // uploadImage={uploadImage}
        />
      </Dialog>
    </Box>
  );
};
const mapStateToProp = (state) => {
  return {
    aboutLg: state.commonState.aboutLg,
  };
};
export default connect(mapStateToProp)(ProfilePicUploadButton);
