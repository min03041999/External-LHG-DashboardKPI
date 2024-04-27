import React from "react";
import { Typography } from "@mui/material";

const TitleStyle = {
  color: "#049962",
  fontWeight: "600",
};

const Title = (props) => {
  const { name, customStyle } = props;
  const languages = localStorage.getItem("languages");
  return (
    <Typography
      className="title"
      sx={{
        ...TitleStyle,
        ...customStyle,
        fontSize: languages === "TW" ? "25px !important" : "",
      }}
    >
      {name}
    </Typography>
  );
};

export default Title;
