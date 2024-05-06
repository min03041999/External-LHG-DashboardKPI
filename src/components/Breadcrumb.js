import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { FACTORY } from "../utils/env";

import { Box, ListItemIcon, Typography, ListItemButton } from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import LanguageIcon from "@mui/icons-material/Language";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const ColumnStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const LanguagesListStyle = {
  position: "fixed",
  zIndex: "9999",
  top: "50px",
  right: "3%",
  border: "1px solid #fff",
  borderRadius: "8px",
  backgroundColor: "#fff",
  padding: "5px 15px 5px 25px",
  boxShadow:
    "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;",
  fontSize: "14px",
  color: "gray",
};

const Breadcrumb = (props) => {
  const { factory, children } = props;

  const [openLanguages, setOpenLanguages] = useState(false);
  const [t, i18n] = useTranslation("global");

  const languages = localStorage.getItem("languages");
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages === null ? "TW" : languages
  );

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("languages", event.target.value);
  };

  return (
    <div style={ColumnStyle}>
      <Typography variant="h3" component="h3" className="breadcrumb">
        <span style={{ color: "#049962" }}>
          {factory === "LHG" ? FACTORY : "LVL"}
        </span>{" "}
        - {children}
      </Typography>

      <div>
        <ListItemButton onClick={() => setOpenLanguages(!openLanguages)}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#0009",
              fontWeight: "600",
              marginRight: "10px",
            }}
          >
            {t("languages.language")}
          </Typography>
          {openLanguages ? (
            <ExpandLess style={{ color: "gray" }} />
          ) : (
            <ExpandMore style={{ color: "gray" }} />
          )}
        </ListItemButton>
        {openLanguages && (
          <Box component="div" sx={LanguagesListStyle}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={selectedLanguage}
              onChange={handleChange}
              style={{ fontSize: "small" }}
            >
              <FormControlLabel
                value="TW"
                control={<Radio size="small" />}
                label={
                  <span style={{ fontSize: "14px" }}>{t("languages.tw")}</span>
                }
              />
              <FormControlLabel
                value="EN"
                control={<Radio size="small" />}
                label={
                  <span style={{ fontSize: "14px" }}>{t("languages.en")}</span>
                }
              />
              <FormControlLabel
                value="VN"
                control={<Radio size="small" />}
                label={
                  <span style={{ fontSize: "14px" }}>{t("languages.vn")}</span>
                }
              />
            </RadioGroup>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
