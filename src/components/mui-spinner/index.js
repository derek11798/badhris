import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Oval } from "react-loader-spinner";

import Box from "@mui/material/Box";
import "./styles.css";

export default function Spinner() {
  return (
    <div className="backdrop">
      <div className="spinner">
        {/* <Box sx={{ display: 'flex', justifyContent : "center", alignItems : "center" }}> */}
        <Oval
          height={80}
          width={80}
          color="#8699DA"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#8699DA"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        {/* </Box> */}
      </div>
    </div>
  );
}
