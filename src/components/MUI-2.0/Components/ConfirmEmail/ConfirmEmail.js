import { Box, Fade } from "@mui/material";
import React from "react";
import warningImg from "../../Asserts/Img/warning_resized.png";
const ConfirmEmail = (props) => {
  return (
    <Box sx={{ border: "2px solid green", borderRadius: 8, maxWidth: "360px" }}>
      <Fade in={true} timeout={1000}>
        <center>
          <div>
            <h1>Verify Email</h1>
            <hr></hr>
            <div style={{ padding: "10px", marginTop: "15px" }}>
              {/* <img src={warningImg} /> */}
              <div style={{ marginTop: "15px" }}>
                <h4>
                  {props.verifyEmail.message} please verify your Email id by
                  clicking on the link
                  <a
                    href={`https://${props.verifyEmail.message.split("@")[1]}`}
                  >
                    {props.verifyEmail.message.split("to")[1]}
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </center>
      </Fade>
    </Box>
  );
};
export default ConfirmEmail;
