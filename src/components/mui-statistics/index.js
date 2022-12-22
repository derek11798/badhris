import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./styles.css";
import { width } from "@mui/system";

const Statistics = () => {
  return (
    <Box
      sx={{
        // mt: "5%",
        // mr: {sm : "5%", xs : "1%"},
        // mb: "10%",
        // ml: {sm : "5%", xs : "1%"},
        m : {xs : "3%", sm : "5%"},
        bgcolor: "#F4F4F4",
        borderRadius: 7,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          m: 3,
          // "& > :not(style)": {
          //   m: 3,
          //   // width: 128,
          //   // height: 256,
          // },
        }}
      >
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle
            className="statisticts-container"
            id="dropdown-basic"
          >
            show
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            // m: 3,
            width: 490,
            height: 300,
            bgcolor: "#B6C2EA",
          },
          margin: 3,
        }}
      >
        <Card
          sx={{
            Width: 275,
            Height: 128,
            display: "flex",
            borderRadius: 4,
            margin: 3,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          ml : 3,
        }}
      >
        <span className="statisticts-text">statistics</span>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            // m: 3,
            width: 490,
            height: 300,
            bgcolor: "#B6C2EA",
          },
          ml: 3, mt : -1
        }}
      >
        <Card
          sx={{
            Width: 275,
            Height: 128,
            display: "flex",
            borderRadius: 4,
            margin: 3,
          }}
        />
      </Box>
    </Box>
  );
};
export default Statistics;
