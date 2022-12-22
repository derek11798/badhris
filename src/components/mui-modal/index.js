import React, { useState, useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  // boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props) {

  const handleClose = () => props.close(false);

  return (
    <Box maxWidth={"450px"}>
      <Modal
        // aria-labelledby="transition-modal-title"
        // aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Card sx={style}>
            <Typography variant="h6" component="h2">
              Text in a modal hello
            </Typography>
            <hr />
            <Box sx={{
              "& .MuiTextField-root": { m: 1, width: "35ch" },
              m: 1,
              display: "flex",
              flexWrap: "wrap"
            }}>
              <Box sx={{ m: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date Of Birth"
              inputFormat="dd/MM/yyyy"
              value={"dob"}
              disabled={false}
              // onChange={handleDobChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
              </Box>
              <Box sx={{ m: 3 }}>
              <TextField id="standard-select-currency" label="Chronic Illness" disabled={false} value={"chronicIllness"} variant="standard" />
              </Box>
              <Box sx={{ m: 3 }}>
              <TextField id="standard-select-currency" label="Chronic Illness" disabled={false} value={"chronicIllness"} variant="standard" />
              </Box>
              <Box sx={{ m: 3 }}>
              <TextField id="standard-select-currency" label="Chronic Illness" disabled={false} value={"chronicIllness"} variant="standard" />
              </Box>
              <Box sx={{ m: 3 }}>
              <TextField id="standard-select-currency" label="Chronic Illness" disabled={false} value={"chronicIllness"} variant="standard" />
              </Box>
              

            </Box>

          </Card>
        </Fade>
      </Modal>
    </Box>
  );
}
