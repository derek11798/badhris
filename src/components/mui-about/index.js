import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPane from "../mui-tabpane";
import Profile from "../mui-profile";
import AboutForm from "../mui-about-form";
import PersonalForm from "../mui-personal-form";
import EducationForm from "../mui-education-form";
import HealthForm from "../mui-health-form";
import { connect } from "react-redux";
import PersonalityForm from "../mui-personality-form";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { PropaneSharp } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2F4079",
    },
    highlight: {
      main: "#8699DA",
    },
  },
  avathar: {
    height: "210px",
    width: "210px" /*,mt : "10px", mb : "50px", ml : "175px"*/,
  },
});

const About = (props) => {
  const pages = [
    "Basic",
    "Personal",
    "Education/Work",
    "Health",
    "Personality",
  ];
  const icons = [
    <DescriptionIcon />,
    <DateRangeIcon />,
    <AutoStoriesIcon />,
    <FavoriteOutlinedIcon />,
    <DescriptionIcon />,
  ];

  const [value, setValue] = useState(0);
  const [deseased, setDeseased] = useState(true);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        item
        sx={{ bgcolor: "#E8E2E2", ml: { xs: "none", sm: 1 }, display: "flex" }}
      >
        <Box item sx={{ bgcolor: "#FFFFFF", mb: 1 }}>
          <Box
            sx={{
              bgcolor: "background.paper",
              display: "flex",
            }}
          >
            <Tabs
              value={value}
              orientation="vertical"
              textColor="#000000"
              indicatorColor="secondary"
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                "& .MuiTabs-flexContainer": { alignItems: "flex-start" },
                display: "flex",
                flexDirection: "column",
                color: "#000000",
                width: "100%",
                // alignItems: "flex-start",
              }}
            >
              <Tab
                sx={{ ml: 3, mr: 0, minWidth: 100 }}
                iconPosition="start"
                icon={icons[0]}
                label={"Basic"}
                {...a11yProps(0)}
              ></Tab>
              <Tab
                sx={{ ml: 3, mr: 0, color: !props.lgId ? "#808080" : "#000" }}
                iconPosition="start"
                icon={icons[1]}
                label={"Personal"}
                {...a11yProps(1)}
                disabled={!props.lgId}
              ></Tab>
              <Tab
                sx={{ ml: 3, mr: 0, color: !props.lgId ? "#808080" : "#000" }}
                iconPosition="start"
                icon={icons[2]}
                label={"Education/Work"}
                {...a11yProps(2)}
                disabled={!props.lgId}
              ></Tab>
              <Tab
                sx={{ ml: 3, mr: 0, color: !props.lgId ? "#808080" : "#000" }}
                iconPosition="start"
                icon={icons[3]}
                label={"Health"}
                {...a11yProps(3)}
                disabled={!props.lgId}
              ></Tab>
              <Tab
                sx={{ ml: 3, mr: 0, color: !props.lgId ? "#808080" : "#000" }}
                iconPosition="start"
                icon={icons[4]}
                label={"Personality"}
                {...a11yProps(4)}
                disabled={!props.lgId}
              ></Tab>
            </Tabs>
          </Box>
        </Box>
        <Box
          item
          sx={{ ml: 1, bgcolor: "#FFFFFF", width: "100%", mr: 1, mb: 1 }}
        >
          <TabPane value={value} index={0}>
            <AboutForm
              deseased={setDeseased}
              editMode={props.editMode}
              editModeState={props.editModeState}
            />
          </TabPane>
          <TabPane value={value} index={1}>
            <PersonalForm deseased={deseased} editMode={props.editMode} />
          </TabPane>
          <TabPane value={value} index={2}>
            <EducationForm editMode={props.editMode} />
          </TabPane>
          <TabPane value={value} index={3}>
            <HealthForm editMode={props.editMode} />
          </TabPane>
          <TabPane value={value} index={4}>
            <PersonalityForm editMode={props.editMode} />
          </TabPane>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const mapStateToProp = (state) => {
  return {
    authToken: state.commonState.authToken,
    userId: state.commonState.userId,
    lgId: state.commonState.lgId,
    userName: state.commonState.userName,
    aboutLg: state.commonState.aboutLg,
    emailId: state.commonState.emailId,
    ownedLg: state.commonState.ownedLg,
  };
};
export default connect(mapStateToProp)(About);
