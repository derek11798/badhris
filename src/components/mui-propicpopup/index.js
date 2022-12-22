import React, { useState, useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export default function PicturePopUp(props) {

  const handleClose = () => props.close(false);

  return (
      <Modal
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
           <img src={props.src}/>
          </Box>
        </Fade>
      </Modal>
  );
}
