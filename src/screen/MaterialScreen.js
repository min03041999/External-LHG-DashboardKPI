import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Box, Grid } from "@mui/material";

import TopDefectSupplier from "../components/MaterialWH/TopDefectSupplier";
import TopDefectSubcon from "../components/MaterialWH/TopDefectSubcon";
import MatCheckStatus from "../components/MaterialWH/MatCheckStatus";
import MatWHEscalation from "../components/MaterialWH/MatWHEscalation";
import DailyInspectionReport from "../components/MaterialWH/DailyInspectionReport";
import DailyKanbanStatus from "../components/MaterialWH/DailyKanbanStatus";
import { materialApi } from "../api/Material/materialApi";

import { useTranslation } from "react-i18next";

const MaterialScreen = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [top3Supplier, setTop3Supplier] = useState([]);
  const [top3Subcon, setTop3Subcon] = useState([]);
  const [matCheckChart, setMatCheckChart] = useState([]);
  const [leatherChart, setLeatherChart] = useState([]);
  const [whEscalation, setWhEscalation] = useState([]);
  const [leatherSumary, setLeatherSumary] = useState([]);
  const [matQCCheck, setMatQCCheck] = useState([]);
  const [dailyRequest, setDailyRequest] = useState([]);
  const [dailyIngrogress, setDailyIngrogress] = useState([]);
  const [dailyDone, setDailyDone] = useState([]);

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
    const getTop3Supplier = async () => {
      let res = await materialApi.getTop3Supplier();
      setTop3Supplier(res.data.data);
    };
    const getTop3Subcon = async () => {
      let res = await materialApi.getTop3Subcon();
      setTop3Subcon(res.data.data);
    };
    const getMatCheckChart = async () => {
      let res = await materialApi.getMatCheckChart();
      setMatCheckChart(res.data.data);
    };
    const getLeatherChart = async () => {
      let res = await materialApi.getLeatherChart();
      setLeatherChart(res.data.data);
    };
    const getWhEscalation = async () => {
      let res = await materialApi.getWhEscalation();
      setWhEscalation(res.data.data);
    };
    const getDailyLeather = async () => {
      let res = await materialApi.getDailyLeather();
      setLeatherSumary(res.data.data);
    };
    const getDailyMatQCCheck = async () => {
      let res = await materialApi.getDailyMatQCCheck();
      setMatQCCheck(res.data.data);
    };
    const getDailyRequestKanBan = async () => {
      let res = await materialApi.getDailyRequestKanBan();
      setDailyRequest(res.data.data);
    };
    const getDailyIngrogressKanBan = async () => {
      let res = await materialApi.getDailyIngrogressKanBan();
      setDailyIngrogress(res.data.data);
    };
    const getDailyDoneKanBan = async () => {
      let res = await materialApi.getDailyDoneKanBan();
      setDailyDone(res.data.data);
    };
    getTop3Supplier();
    getTop3Subcon();
    setTimeout(() => {
      getMatCheckChart();
    }, 3000);
    setTimeout(() => {
      getLeatherChart();
    }, 5000);
    getWhEscalation();
    getDailyLeather();
    getDailyMatQCCheck();
    getDailyRequestKanBan();
    getDailyIngrogressKanBan();
    getDailyDoneKanBan();
  }, []);

  // console.log(top3Supplier);

  const SET_FULL_SCREEN_LAPTOP =
    screenHeight > 730
      ? { height: `${screenHeight / 3 - 40}px` }
      : { height: "300px" };

  return (
    <Box component={"div"} className="material-screen">
      <Box
        component={"div"}
        sx={
          screenHeight > 730 && screenHeight < 780
            ? { position: "relative", height: `${screenHeight / 10}px` }
            : { position: "relative", height: "100%" }
        }
      >
        <Breadcrumb>{t("material-wh.name")}</Breadcrumb>
      </Box>
      <Box
        component={"div"}
        className="material-screen-body"
        sx={{ flexGrow: 1 }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 6, sm: 6, md: 6, lg: 12 }}
        >
          <Grid item xs={6}>
            <TopDefectSupplier
              customStyle={SET_FULL_SCREEN_LAPTOP}
              data={top3Supplier}
            />
          </Grid>
          <Grid item xs={6}>
            <TopDefectSubcon
              customStyle={SET_FULL_SCREEN_LAPTOP}
              data={top3Subcon}
            />
          </Grid>
          <Grid item xs={6}>
            <MatCheckStatus
              customStyle={SET_FULL_SCREEN_LAPTOP}
              header={t("material-wh.ss24-material-check-status")}
              matCheckChart={matCheckChart}
              leatherChart={leatherChart}
            />
          </Grid>
          <Grid item xs={6}>
            <MatWHEscalation
              customStyle={SET_FULL_SCREEN_LAPTOP}
              header={t("material-wh.material-wh-escalation")}
              data={whEscalation}
            />
          </Grid>
          <Grid item xs={6}>
            <DailyInspectionReport
              customStyle={SET_FULL_SCREEN_LAPTOP}
              header={t("material-wh.daily-inspection-report")}
              leatherSumary={leatherSumary}
              matQCCheck={matQCCheck}
            />
          </Grid>
          <Grid item xs={6}>
            <DailyKanbanStatus
              customStyle={SET_FULL_SCREEN_LAPTOP}
              header={t("material-wh.daily-kaiban-status")}
              dailyRequest={dailyRequest}
              dailyIngrogress={dailyIngrogress}
              dailyDone={dailyDone}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MaterialScreen;
