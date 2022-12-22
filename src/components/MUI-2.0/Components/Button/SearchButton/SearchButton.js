import { Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const SearchButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Button color="secondary">
      <SearchIcon />
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        {t("display.helperText.button.search")}
      </Box>
    </Button>
  );
};
export default SearchButton;
