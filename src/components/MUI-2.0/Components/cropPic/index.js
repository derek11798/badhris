import { Cancel } from "@mui/icons-material";
import CropIcon from "@mui/icons-material/Crop";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
// import { useAuth } from '../../context/AuthContext';
import getCroppedImg from "./utils/cropImage";
import { connect } from "react-redux";

const CropEasy = ({ photoURL, setOpenCrop, setFile, uploadImage }) => {
  //   const { setAlert, setLoading } = useAuth();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // const uploadImage = (url)=>{
  //   console.log(props.userId)
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       UserId: `${props.userId}`,
  //       token: `${props.authToken}`,
  //     },
  //     body: {
  //       profilePic: url,
  //       lg_id : `${props.lgId}`
  //     },
  //   };
  //   fetch("https://lifograf.com/lg_api/profPic", requestOptions)
  //     .then((response) => response.json())
  //     .then((responseJSON) => {
  //       console.log("response from image upload",responseJSON);
  //       // props.lgIdAction(responseJSON.lg_id);
  //     });
  // }

  const cropImage = async () => {
    // setLoading(true);
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setFile(file);
      // setOpenCrop(false);
      // uploadImage(file);
    } catch (error) {
      //   setAlert({
      //     isAlert: true,
      //     severity: 'error',
      //     message: error.message,
      //     timeout: 5000,
      //     location: 'modal',
      //   });
      console.error(error);
    }

    // setLoading(false);
  };
  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: "#333",
          position: "relative",
          height: 400,
          width: "auto",
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        <Box sx={{ width: "100%", mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + "°"}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => setOpenCrop(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Crop
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    authToken: state.commonState.authToken,
    userId: state.commonState.userId,
    lgId: state.commonState.lgId,
  };
};
export default connect(mapStateToProp)(CropEasy);

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
