import { Box } from "@mui/material";
import React from "react";
import LgOwned from "../LgOwned/LgOwned";
const RightNavigation = () => {
  return (
    <div>
      <Box sx={{ height: "50%" }}>
        <LgOwned />
      </Box>
      <Box sx={{ height: "50%" }}>
        <LgOwned />
      </Box>
    </div>
  );
};
export default RightNavigation;
