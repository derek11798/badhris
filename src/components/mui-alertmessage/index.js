import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertMessage = (props) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    props.open(false);
  };
  useEffect(() => {
    console.log("Alert message rendered props", props);
    if (props.message && (props.message.error || !props.message.error))
      setOpen(true);
  }, []);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          handleClose();
        }}
      >
        <Alert
          onClose={() => {
            handleClose();
          }}
          severity={props.message.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {props.message.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertMessage;
