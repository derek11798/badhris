import React from "react";
import { useEffect, useState } from "react";
import { getUserSummary } from "../../Functions/Api's/HomeApi/HomeApi";
import { Box, Button } from "@mui/material";
import { connect } from "react-redux";
import Avatar from "@mui/material/Avatar";
import "./styles.css";
import CustomToolTip from "../CustomToolTip/CustomToolTip";
import { useNavigate } from "react-router-dom";
import Accordions from "../Accordion/Accordion";
import { useTranslation } from "react-i18next";
const LgOwned = (props) => {
  console.log("LG owned");
  //-----------------------Declare constants Here-----------------------------//

  const [loading, setLoading] = useState();
  const [ownedLg, setOwnedLg] = useState();
  const navigate = useNavigate();
  const { t } = useTranslation();

  //-----------------------Declare useEffect Here-----------------------------//

  useEffect(() => {
    const updateOwnedLg = async () => {
      let response = await getUserSummary(setLoading);
      if (response.ownedLG.length < 1) navigate("/self/about");
    };
    updateOwnedLg();
  }, []);

  useEffect(() => {
    if (props.ownedLg) setOwnedLg(props.ownedLg);
    console.log("props.ownedLg :", props.ownedLg);
  }, [props.ownedLg]);

  return (
    <Box sx={{ height: { sm: "100" } }}>
      {ownedLg && (
        <Accordions
          heading={t("display.helperText.texts.ownedLg")}
          count={ownedLg.length}
        >
          {ownedLg && ownedLg.length > 0
            ? ownedLg.map((lg, index) => (
                <Box key={index} className="space-ownedLg">
                  <CustomToolTip title={`${lg.fname} ${lg.lname}`}>
                    <Button
                      variant="text"
                      sx={{ width: "100%", justifyContent: "flex-start" }}
                      startIcon={<Avatar sizes="small" src={lg.readURL} />}
                      onClick={() => navigate(`/viewlg/${lg.lg_url}`)}
                    >
                      {lg.nickname}
                    </Button>
                  </CustomToolTip>
                </Box>
              ))
            : null}
        </Accordions>
      )}
    </Box>
  );
};

const mapStateToProp = (state) => {
  return { ownedLg: state.commonState.ownedLg };
};
export default connect(mapStateToProp)(LgOwned);
