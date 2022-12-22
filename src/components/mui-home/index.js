import { bgcolor, Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../mui-appbar";
import Statistics from "../mui-statistics";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import {
  authTokenAction,
  ownedLgAction,
  aboutLgAction,
  lgIdAction,
} from "../../redux/actions";
import { useParams, useNavigate, useMatch } from "react-router-dom";
import NewStoryBtn from "../mui-createNewStoryBtn";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Routes,
} from "react-router-dom";
import Profile from "../mui-profile";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import MobileAppBar from "../mui-mobile-appbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles((theme) => ({
  root: {
    "&::-webkit-scrollbar": {
      width: 7,
    },
    // "&::-webkit-scrollbar-track": {
    //   boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    // },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#808080",
      outline: `1px solid slategrey`,
      borderRadius: 6,
    },
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const [profile, setprofile] = useState(false);
  const [ownerLg, setOwnedLg] = useState([]);

  useEffect(() => {
    if (!props.authToken) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getUserSummary();
    props.aboutLgAction("");
    props.lgIdAction("");
  }, []);

  useEffect(() => {
    setOwnedLg(props.ownedLg);
    console.log("useeffect", ownerLg);
  }, [props.ownedLg, ownerLg]);

  const getUserSummary = () => {
    const requestOptions = {
      headers: {
        UserId: `${props.userId}`,
        token: `${props.authToken}`,
      },
    };
    fetch("https://lifograf.com/lg_api/getUsrSummary", requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.error) {
          const responseMessage = responseJSON.message.split("-");
          console.log(responseMessage[0]);
        } else {
          console.log(responseJSON.ownedLG);
          // setOwnedLg(responseJSON.ownedLG)
          props.ownedLgAction(responseJSON.ownedLG);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const aboutLg = (url) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        UserId: `${props.userId}`,
        token: `${props.authToken}`,
      },
    };
    fetch(`https://lifograf.com/lg_api/lgAbout?url=${url}`, requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        props.aboutLgAction(responseJSON.output);
        props.lgIdAction(responseJSON.output.lg_id);
      });
    console.log("from home page");
    navigate(`/profile/${url}`);
  };

  const setprofile = () => {
    navigate("/profile");
  };

  return (
    <div>
      {props.authToken && (
        <Grid container>
          <Grid item sm={12}>
            <Box
              item
              sx={{ display: { xs: "none", sm: "view", width: "100%" } }}
            >
              <ResponsiveAppBar />
            </Box>
            <Box item sx={{ display: { xs: "view", sm: "none", md: "none" } }}>
              <MobileAppBar />
            </Box>
          </Grid>
          <Grid container sx={{ mt: 5 }}>
            <Grid item xs={12} sm={9} md={9} sx={{}}>
              <Box
                sx={{
                  mt: { xs: "20%", sm: "12%" },
                  ml: { xs: "3%", sm: "8%" },
                  mr: 5,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#444B59",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                    }}
                    variant="h4"
                  >
                    Owned by you
                  </Typography>
                </Box>
                <Box
                  component={"Grid"}
                  item
                  xs={12}
                  sm={9}
                  md={9}
                  display={"flex"}
                  sx={{ mt: 3 }}
                >
                  <Box
                    sx={{
                      p: 1,
                      height: "280px",
                      overflow: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                    className={classes.root}
                  >
                    <Box sx={{ mr: 4 }}>
                      <NewStoryBtn
                        width="105px"
                        height="105px"
                        clickFunction={setprofile}
                      />
                    </Box>

                    {props.ownedLg &&
                      props.ownedLg.map((list) => (
                        <Box
                          sx={{ mr: 4, mb: 2 }}
                          onClick={() => {
                            aboutLg(list.lg_url);
                          }}
                        >
                          <Avatar
                            alt={list.nickname}
                            src={list.readURL}
                            sx={{ width: "105px", height: "105px" }}
                          />
                          <Typography align="center">
                            {list.nickname}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{ mt: { xs: "2%", sm: "3%" }, ml: { xs: "3%", sm: "8%" } }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#444B59",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                    }}
                    variant="h4"
                  >
                    Shared with you
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                ml: { xs: 1, sm: 0 },
                mt: 3,
              }}
            >
              <Statistics />
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
const mapStateToProp = (state) => {
  return {
    authToken: state.commonState.authToken,
    userId: state.commonState.userId,
    ownedLg: state.commonState.ownedLg,
  };
};

export default connect(mapStateToProp, {
  authTokenAction,
  ownedLgAction,
  aboutLgAction,
  lgIdAction,
})(Home);
