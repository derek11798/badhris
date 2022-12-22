import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { relation } from "../../Constants/constant";
import { primaryBorder } from "../../Constants/styles/styles";

const RelationshipPopup = (props) => {
  const navigate = useNavigate();
  const [relatedTo, setRelatedTo] = useState("");
  const [relationship, setRelationship] = useState("");
  const handleNext = () => {
    props.relationship(relationship);
    props.relatedTo(relatedTo);
    props.open(false);
    props.render(true);
  };
  const handleCancel = () => {
    props.relationship("");
    props.relatedTo("");
    props.open(false);
    navigate("/home");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 0 } }}>
      <Box
        sx={{
          width: { xs: "98%", sm: props.mode === "self" ? "70%" : "100%" },
          mt: { xs: 1, sm: 2 },
        }}
      >
        <center>
          <Paper elevation={3} sx={primaryBorder}>
            <Box sx={{ my: 3 }}>
              <Typography variant="h5">{"This Lifograf Is about"}</Typography>
              <Box sx={{ mt: 3 }}>
                <TextField
                  select
                  label="Related To"
                  value={relatedTo.fname}
                  required
                  onChange={(e) => setRelatedTo(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? setRelatedTo(e.target.value) : null
                  }
                  variant="outlined"
                  sx={{ width: { xs: "90%", sm: "50%" } }}
                >
                  {props.ownedLg.map((option, index) => (
                    <MenuItem key={index} value={option.lg_id}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <Avatar src={option.readURL} />
                        <Typography sx={{ ml: 2 }}>
                          {option.fname + " " + option.lname}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Typography sx={{ mt: 2 }} variant="h5">
                {"Who is related to me as"}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <TextField
                  select
                  label="Related To"
                  value={relationship}
                  required
                  onChange={(e) => setRelationship(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? setRelationship(e.target.value) : null
                  }
                  variant="outlined"
                  sx={{ width: { xs: "90%", sm: "50%" } }}
                >
                  {relation.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box>
                <Button
                  disabled={
                    relatedTo === "" ? true : relationship === "" ? true : false
                  }
                  sx={{ mt: 3, width: "50%", borderRadius: 8 }}
                  variant="contained"
                  onClick={() => handleNext()}
                >
                  Next
                </Button>
              </Box>
              <Box>
                <Button
                  sx={{ mt: 3, width: "50%", borderRadius: 8 }}
                  variant="outlined"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        </center>
      </Box>
    </Box>
  );
};
const mapStateToProp = (state) => {
  return {
    ownedLg: state.commonState.ownedLg,
  };
};
export default connect(mapStateToProp)(RelationshipPopup);
