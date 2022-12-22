import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
const CustomToolTip = (props) => {
  return (
    <Tooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      arrow
      title={props.title}
    >
      {props.children}
    </Tooltip>
  );
};
export default CustomToolTip;
