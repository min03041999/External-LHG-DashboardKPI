import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Box, Button, Grid } from "@mui/material";
import OverallOEE from "../components/AutoCutting/OverallOEE";
import OverallOEECard from "../components/AutoCutting/OverallOEECard";
import TotalDowntimeByMachine from "../components/AutoCutting/TotalDowntimeByMachine";
import DowntimeReason from "../components/AutoCutting/DowntimeReason";
import OEEByMachine from "../components/AutoCutting/OEEByMachine";
import TotalOutputByRy from "../components/AutoCutting/TotalOutputByRy";
import { autoCuttingApi } from "../api/AutoCutting/autoCuttingApi";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

const AutoCuttingScreen = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [autoCuttingData, setAutoCuttingData] = useState([]);
  const [materialOnGoing, setMaterialOnGoing] = useState([]);
  const [materialDone, setMaterialDone] = useState([]);
  const [t] = useTranslation("global");

  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getAutoCutting = async () => {
      let res = await autoCuttingApi.getAutoCutting();
      setAutoCuttingData(res.data.data);
    };
    const getMaterialOnGoing = async () => {
      let res = await autoCuttingApi.getMaterialOnGoing();
      setMaterialOnGoing(res.data.data);
    };
    const getMaterialDone = async () => {
      let res = await autoCuttingApi.getMaterialDone();
      setMaterialDone(res.data.data);
    };
    getAutoCutting();
    getMaterialOnGoing();
    getMaterialDone();
  }, []);

  const SET_FULL_SCREEN_LAPTOP =
    screenHeight > 730
      ? { height: `${screenHeight / 2 - 40}px` }
      : { height: "300px" };

  const SET_HEIGHT_CHART = screenHeight > 730 ? screenHeight / 3 - 16 : "85%";
  return (
    <Box component={"div"} className="autocutting-screen">
      <Box component={"div"}>
        <Breadcrumb>
          {t("auto-cutting.name")}
          <Button
            component={Link}
            variant="contained"
            sx={{
              bgcolor: "#82ca9d",
              marginRight: 2,
              marginLeft: 2,
              ":hover": {
                bgcolor: "#82ca9d",
                color: "#fff",
                opacity: 0.8,
              },
            }}
          >
            {t("auto-cutting.auto-cutting")}
          </Button>
          <Button
            component={Link}
            variant="contained"
            sx={{
              bgcolor: "#82ca9d",
              ":hover": {
                bgcolor: "#82ca9d",
                color: "#fff",
                opacity: 0.8,
              },
            }}
            to={"/downtime"}
          >
            {t("auto-cutting.down-time")}
          </Button>
        </Breadcrumb>
      </Box>

      <Box
        component={"div"}
        className="autocutting-screen-body"
        sx={{ flexGrow: 1 }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          // columns={{ xs: 2, sm: 2, md: 2, lg: 12 }}
        >
          <Grid item xs={12}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 2, sm: 2, md: 2, lg: 12 }}
            >
              <Grid item xs={2}>
                <OverallOEE
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  header={t("auto-cutting.overall-oee")}
                  setHeightChart={SET_HEIGHT_CHART}
                  autoCuttingData={autoCuttingData}
                />
              </Grid>
              <Grid item xs={3}>
                <OverallOEECard
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  autoCuttingData={autoCuttingData}
                />
              </Grid>
              <Grid item xs={4}>
                <TotalDowntimeByMachine
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  header={t("auto-cutting.total-downtime-by-machine")}
                  unit={t(
                    "auto-cutting.total-downtime-by-machine-unit-minutes"
                  )}
                  setHeightChart={SET_HEIGHT_CHART}
                  autoCuttingData={autoCuttingData}
                />
              </Grid>
              <Grid item xs={3}>
                <DowntimeReason
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  header={t("auto-cutting.downtime-reason")}
                  unit={t("auto-cutting.downtime-reason-unit-minutes")}
                  autoCuttingData={autoCuttingData}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 6, sm: 6, md: 6, lg: 12 }}
            >
              <Grid item xs={6}>
                <OEEByMachine
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  header={t("auto-cutting.oee-by-machine")}
                  autoCuttingData={autoCuttingData}
                />
              </Grid>
              <Grid item xs={6}>
                <TotalOutputByRy
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  header={t("auto-cutting.total-output-by-ry")}
                  materialOnGoing={materialOnGoing}
                  materialDone={materialDone}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AutoCuttingScreen;
