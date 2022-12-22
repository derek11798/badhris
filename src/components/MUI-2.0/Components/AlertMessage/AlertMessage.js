import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { connect } from "react-redux";
import { alertAction } from "../../../../redux/actions/index";
import store from "../../../../redux/store/store";
import { useTranslation } from "react-i18next";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertMessage = (props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    store.dispatch(alertAction(""));
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
        autoHideDuration={props.message.error ? null : 3000}
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
          {t(`${props.message.message}`)}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertMessage;
