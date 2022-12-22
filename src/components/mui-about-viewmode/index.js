import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AboutViewMode = (props) => {
  const [editMode, setEditMode] = useState();
  const fontStyle = { color: "#000000", fontSize: "20px", m: 2 };
  return (
    <Grid container sx={{ bgcolor: "#FFFFFF", m: 1 }}>
      <Grid item xs={12}>
        <Box sx={{ m: 2 }}>
          <Card>
            <Box sx={{ display: "flex", minHeight: "50%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "97%",
                  minHeight: "450px",
                }}
              >
                {props.aboutLg && (
                  <Box>
                    <Typography sx={fontStyle}>
                      {props.aboutLg.title}.{props.aboutLg.first_name}{" "}
                      {props.aboutLg.last_name} was popularly known as{" "}
                      {props.aboutLg.nickname}.
                      {props.aboutLg.birth_cntry
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " was born in " +
                          props.aboutLg.birth_cntry +
                          "."
                        : ""}
                      {props.aboutLg.dob
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " was born on " +
                          props.aboutLg.dob +
                          "."
                        : ""}
                      {props.aboutLg.race
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          (props.aboutLg.deceased === "Yes" ? " was" : " is") +
                          " a " +
                          props.aboutLg.race +
                          "."
                        : ""}
                      {props.aboutLg.caste && props.aboutLg.race
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " was born under the " +
                          props.aboutLg.star +
                          " star in the " +
                          props.aboutLg.caste +
                          " caste " +
                          (props.aboutLg.clan
                            ? ` in the ${props.aboutLg.clan} clan.`
                            : "")
                        : ""}
                      {props.aboutLg.native_language
                        ? (props.aboutLg.gender === "Male" ? " His" : " Her") +
                          " native language " +
                          (props.aboutLg.deceased === "Yes" ? " was" : " is") +
                          " " +
                          props.aboutLg.native_language +
                          "."
                        : ""}
                      {props.aboutLg.deceased === "No"
                        ? props.aboutLg.last_res
                          ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                            " currently resides at " +
                            props.aboutLg.last_res
                          : ""
                        : props.aboutLg.dod && props.aboutLg.dth_loc
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " passed away on " +
                          props.aboutLg.dod +
                          " in " +
                          props.aboutLg.dth_loc +
                          "."
                        : (props.aboutLg.dod
                            ? (props.aboutLg.gender === "Male"
                                ? " He"
                                : " She") +
                              " passed away on " +
                              props.aboutLg.dod
                            : "") + +props.aboutLg.last_res
                        ? (props.aboutLg.gender === "Male" ? " His" : " Her") +
                          " last residence was " +
                          props.aboutLg.last_res +
                          ". "
                        : "" + props.aboutLg.mortal_remains
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " was " +
                          props.aboutLg.mortal_remains
                        : "" + props.aboutLg.mortal_remains_location
                        ? " and " +
                          (props.aboutLg.gender === "Male" ? " His" : " Her") +
                          " remains are at " +
                          props.aboutLg.mortal_remains_location
                        : ""}
                    </Typography>
                    <Typography sx={fontStyle}>
                      {props.aboutLg.pers_add_details
                        ? props.aboutLg.pers_add_details
                        : ""}
                    </Typography>
                    <Typography sx={fontStyle}>
                      {props.aboutLg.edu_area && props.aboutLg.edu_details
                        ? props.aboutLg.nickname +
                          " completed " +
                          (props.aboutLg.gender === "Male" ? " His" : " Her") +
                          " " +
                          props.aboutLg.edu_area +
                          " . " +
                          props.aboutLg.edu_details +
                          "."
                        : ""}
                      {props.aboutLg.main_occupation
                        ? (props.aboutLg.gender === "Male" ? " His" : " Her") +
                          " primary occupation was " +
                          props.aboutLg.main_occupation +
                          "."
                        : ""}
                      {props.aboutLg.sec_occupation &&
                      props.aboutLg.occu_details
                        ? (props.aboutLg.gender === "Male" ? " His" : " Her") +
                          " secondary occupation was " +
                          props.aboutLg.sec_occupation +
                          " . " +
                          props.aboutLg.occu_details +
                          "."
                        : ""}
                    </Typography>
                    <Typography sx={fontStyle}>
                      {props.aboutLg.blood_group
                        ? props.aboutLg.nickname +
                          "'s  blood group was " +
                          props.aboutLg.blood_group +
                          "."
                        : ""}
                      {props.aboutLg.smoking
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " was a " +
                          props.aboutLg.smoking +
                          " smoking."
                        : ""}
                      {props.aboutLg.drinking
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " was a " +
                          props.aboutLg.drinking +
                          " drinking."
                        : ""}
                      {props.aboutLg.chronic_illness
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " suffered from " +
                          props.aboutLg.chronic_illness +
                          "."
                        : ""}
                      {props.aboutLg.physical_activity
                        ? (props.aboutLg.gender === "Male" ? " His" : " Her") +
                          " physical_activity was " +
                          props.aboutLg.physical_activity +
                          ". " +
                          props.aboutLg.health_details
                        : ""}
                    </Typography>
                    <Typography sx={fontStyle}>
                      {props.aboutLg.best_qualities
                        ? props.aboutLg.nickname +
                          " was " +
                          props.aboutLg.best_qualities +
                          "."
                        : ""}
                      {props.aboutLg.worst_qualities
                        ? " However" +
                          (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " was also sometimes " +
                          props.aboutLg.worst_qualities +
                          "."
                        : ""}
                      {props.aboutLg.hobbies
                        ? (props.aboutLg.gender === "Male" ? " His" : " Her") +
                          " hobbies included " +
                          props.aboutLg.hobbies +
                          "."
                        : ""}
                      {props.aboutLg.fav_food
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " loved to eat " +
                          props.aboutLg.fav_food +
                          "."
                        : ""}
                      {props.aboutLg.fav_sports
                        ? (props.aboutLg.gender === "Male" ? " He" : " She") +
                          " enjoyed playing " +
                          props.aboutLg.fav_sports +
                          "."
                        : ""}
                      {props.aboutLg.fav_books
                        ? (props.aboutLg.gender === "Male" ? " His" : " Her") +
                          " favorite books were " +
                          props.aboutLg.fav_books +
                          "."
                        : ""}
                      {props.aboutLg.fav_music
                        ? props.aboutLg.fav_music +
                          " were some of the genres that " +
                          (props.aboutLg.gender === "Male" ? " His" : " Her") +
                          "loved. " +
                          props.aboutLg.persntly_add_details +
                          "."
                        : ""}
                    </Typography>
                  </Box>
                )}
              </Box>
              {/* <Box sx={{ mr: 0, width: "3%" }}>
                <CardActions>
                  <IconButton onClick={()=>props.editMode(true)}>
                    <EditIcon />
                  </IconButton>
                </CardActions>
              </Box> */}
              <Box alignItems={"flex-start"}>
                <IconButton onClick={() => props.editMode(true)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
          </Card>
          {/* {props.lgId && ( */}

          {/* )} */}
        </Box>
      </Grid>
    </Grid>
  );
};
export default AboutViewMode;
