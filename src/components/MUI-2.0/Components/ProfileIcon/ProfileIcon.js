import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { connect } from "react-redux";
import Logout from "../Button/Logout/Logout";

function ProfileIcon(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profilePicSrc, setProfilePicSrc] = React.useState(null);

  const getProfileUrl = () => {
    let src = props.ownedLg.filter((lg) => lg.owner_type == "Self");
    console.log("profile pic src", src[0].readURL);
    return src[0].readURL;
  };

  React.useEffect(() => {
    if (props.ownedLg.length > 0) setProfilePicSrc(getProfileUrl());
  }, [props.ownedLg]);
  React.useEffect(() => {
    console.log("profile pic source url", profilePicSrc);
  }, [profilePicSrc]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <Avatar src={profilePicSrc ? profilePicSrc : ""} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Logout />
      </Popover>
    </div>
  );
}
const mapStateToProp = (state) => {
  return { ownedLg: state.commonState.ownedLg };
};
export default connect(mapStateToProp)(ProfileIcon);
