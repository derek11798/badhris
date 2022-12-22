import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialogBox from "../mui-confirmationdialoguebox";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;

export default function EditAndDelete(props) {
  const [confirmDialogueBox, setConfirmDialogueBox] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    setAnchorEl(null);
    props.edit(props.item);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    setConfirmDialogueBox(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setConfirmDialogueBox(false);
  };

  const handleYes = () => {
    setConfirmDialogueBox(false);
    props.delete(props.item.mem_id, props.item.file_type);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ display: { sm: "none" } }} />
        <MoreHorizIcon sx={{ display: { xs: "none", sm: "block" } }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            // width: "20ch",
          },
        }}
      >
        <MenuItem key={""} onClick={() => handleEdit()}>
          <EditIcon sx={{ mr: 1 }} /> {"Edit"}
        </MenuItem>
        <MenuItem key={""} onClick={() => handleDelete()}>
          <DeleteIcon sx={{ mr: 1 }} /> {"Delete"}
        </MenuItem>
      </Menu>
      <div>
        <Dialog
          open={confirmDialogueBox}
          onClose={() => setConfirmDialogueBox(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"Are you sure you want to delete this item ?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ borderRadius: 8 }}
              variant="contained"
              onClick={handleYes}
              autoFocus
            >
              Yes
            </Button>
            <Button
              sx={{ borderRadius: 8 }}
              variant="outlined"
              onClick={handleClose}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
