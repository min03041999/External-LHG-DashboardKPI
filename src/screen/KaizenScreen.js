import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";

import { Box } from "@mui/material";
import KaizenImprovementByModel from "../components/Kaizen/KaizenImprovementByModel";

import { useTranslation } from "react-i18next";

const KaizenScreen = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [t] = useTranslation("global");

  //Set Height
  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const SET_FULL_SCREEN_LAPTOP =
    screenHeight > 730
      ? { height: `${screenHeight - 60}px` }
      : { height: "100%" };

  return (
    <React.Fragment>
      <Breadcrumb>{t("kaizen.name")}</Breadcrumb>

      <Box component={"div"}>
        <KaizenImprovementByModel
          header={t("kaizen.kaizen-improvement")}
          customStyle={SET_FULL_SCREEN_LAPTOP}
        />
      </Box>
    </React.Fragment>
  );
};

export default KaizenScreen;
