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

const Wisdom = () => {
  return (
    <Grid container sx={{ bgcolor: "#FFFFFF", m: 1 }}>
      <Grid item xs={12}>
        <Box sx={{ m: 2 }}>
          <Button variant="contained" startIcon={<AddCircleOutlinedIcon />}>
            Add Wisdom
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ m: 2 }}>
          <Card>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "25%" }}
              >
                <CardContent>
                  <Typography>Dec 1997</Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "70%" }}
              >
                <CardContent>
                  <Typography>Title something</Typography>
                </CardContent>

                <CardContent>
                  <Typography>Title something</Typography>
                </CardContent>
              </Box>
              <Box sx={{ mr: 2, width: "5%" }}>
                <CardActions>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Box>
            </Box>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Wisdom;
