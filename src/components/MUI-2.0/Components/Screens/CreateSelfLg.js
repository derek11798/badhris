import * as React from "react";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import CreateLgAbout from "../UI/CreateLgAbout";
import CreateLgHealth from "../UI/CreateLgHealth";
import CreateLgEducation from "../UI/CreateLgEducation";
import CreateLgPersonal from "../UI/CreateLgPersonal";
import CreateLgPersonality from "../UI/CreateLgPersonality";
import LgAbout from "../Forms/LgAbout";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Functions/HelperFunction";
import RelationshipPopup from "../UI/RelationshipPopup";
import { Pagination } from "@mui/material";
import LgPersonal from "../Forms/LgPersonal";

function CreateSelfLg(props) {
  const navigate = useNavigate();
  const [render, setRender] = React.useState(false);
  const [relationshipPopup, setRelationshipPopup] = React.useState(false);
  const [relatedTo, setRelatedTo] = React.useState("");
  const [relationship, setRelationship] = React.useState("");
  const [pagination, setPagination] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [deceased, setDeceased] = React.useState(false);
  const [mode, setMode] = React.useState(props.mode);

  const SelfLg = () => {
    if (props.mode === "self") {
      if (!localStorage.getItem("emailId")) logout();
      else {
        setRender(true);
        setCurrentPage(1);
      }
    } else {
    }
  };
  const newLg = () => {
    if (props.mode === "new" && props.ownedLg.length > 0) {
      setRelationshipPopup(true);
      setCurrentPage(1);
    } else if (props.ownedLg.length === 0) {
      navigate("/home");
    }
  };

  React.useEffect(() => {
    if (props.mode === "self") {
      SelfLg();
    } else if (props.mode === "new") {
      newLg();
    } else {
    }
  }, []);

  if (relationshipPopup) {
    return (
      <RelationshipPopup
        open={setRelationshipPopup}
        relationship={setRelationship}
        relatedTo={setRelatedTo}
        render={setRender}
      />
    );
  } else if (render) {
    return (
      <center>
        <Box sx={{ p: { xs: 2, sm: 0 } }}>
          <Box
            sx={{
              width: { xs: "98%", sm: props.mode === "self" ? "70%" : "100%" },
              mt: { xs: 1, sm: 2 },
            }}
          >
            {currentPage === 1 ? (
              <LgAbout
                mode={mode}
                relatedTo={relatedTo}
                relationship={relationship}
                pagination={setPagination}
                currentPage={setCurrentPage}
                deceased={setDeceased}
                setMode={setMode}
              />
            ) : currentPage === 2 ? (
              <LgPersonal mode={mode} deceased={deceased} />
            ) : currentPage === 3 ? (
              <CreateLgEducation mode={props.mode} />
            ) : currentPage === 4 ? (
              <CreateLgHealth mode={props.mode} />
            ) : currentPage === 5 ? (
              <CreateLgPersonality mode={props.mode} />
            ) : null}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Pagination
            count={5}
            size={"small"}
            boundaryCount={2}
            disabled={!pagination}
            page={currentPage}
            onChange={(e, page) => {
              setCurrentPage(page);
            }}
          />
        </Box>
      </center>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    emailId: state.commonState.emailId,
    ownedLg: state.commonState.ownedLg,
  };
};
export default connect(mapStateToProp)(CreateSelfLg);
