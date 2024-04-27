import React, { useState, useEffect } from "react";

import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";

import Breadcrumb from "../components/Breadcrumb";
import Navigation from "../components/Navigation";

import Slick from "../components/Slick";

import { FACTORY } from "../utils/env";
import { IS_TARGET_EFF_RFT } from "../utils/base";

import EFFByFloor from "../components/Production/EFFByFloor";
import RFTByFloor from "../components/Production/RFTByFloor";
import OutPutByFloor from "../components/Production/OutPutByFloor";
import HourlyOutputByFloor from "../components/Production/HourlyOutputByFloor";
import AttendanceByFloor from "../components/Production/AttendanceByFloor";

import EFFByTheHour from "../components/Production/EFFByTheHour";
import RFTByTheHour from "../components/Production/RFTByTheHour";
import OutPutTheHour from "../components/Production/OutPutTheHour";
import PPHByTheHour from "../components/Production/PPHByTheHour";
import Top3Defect from "../components/Production/Top3Defect";
import ModelRun from "../components/Production/ModelRun";

import AnalyzerAttendance from "../components/Production/AnalyzerAttendance";
import AnalyzerTopLine from "../components/Production/AnalyzerTopLine";
import AnalyzerTotalOutput from "../components/Production/AnalyzerTotalOutput";
import AnalyzerTarget from "../components/Production/AnalyzerTaget";

import { useTranslation } from "react-i18next";
import { productionApi } from "../api/Production/productionApi";

import CircularProgress from "@mui/material/CircularProgress";

const ProductionScreen = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [t] = useTranslation("global");

  const [isState, setIsState] = useState(false);
  const [navigate, setNavigate] = useState({
    factory: FACTORY,
    floor: "",
    line: "",
    section: "",
  });
  const [date, setDate] = useState(dayjs(new Date()));
  const [productionData, setProductionData] = useState([]);
  const [stopLineTop3, setStopLineTop3] = useState([]);
  const [getEFF, setGetEFF] = useState("0%");
  const [getRFT, setRFT] = useState("0%");
  const DATA_PRODUCTION = productionData?.floorData;
  const stopLineList = Array.isArray(productionData?.stopLineData)
    ? productionData?.stopLineData
    : [];
  const [totalOutput, setTotalOuput] = useState([]);
  useEffect(() => {
    let dates = dayjs(date).format("YYYY/MM/DD");
    setIsState(false);

    const getFactoryDataApi = async (dates, navigate) => {
      let res = await productionApi.getProductionFactoryApi(
        dates,
        navigate.factory
      );

      setProductionData(res.data.data);
      setIsState(true);
    };

    const getFloorDataApi = async (dates, navigate) => {
      let res = await productionApi.getFloorDataApi(dates, navigate.floor);
      setProductionData(res.data.data);
      setIsState(true);
    };

    const getStopLineTop3 = async (dates, navigate) => {
      let res = await productionApi.getStopLineTop3(dates, navigate.line);
      setStopLineTop3(res.data.data);
      setIsState(true);
    };

    if (navigate.floor === "") {
      getFactoryDataApi(dates, navigate);
    } else {
      getFloorDataApi(dates, navigate);

      if (navigate.line !== "") {
        getStopLineTop3(dates, navigate);
      }
    }
  }, [navigate.factory, navigate.floor, date]);

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
  // console.log(dayjs(date).format("YYYY/MM/DD"));

  // SET FOR SLIDE 1
  const SET_FULL_SCREEN_LAPTOP =
    screenHeight > 730
      ? { height: `${screenHeight / 3 - 16}px` }
      : { height: "300px" };
  const SET_FULL_SCREEN_LAPTOP_ = {
    ...SET_FULL_SCREEN_LAPTOP,
    height: parseFloat(SET_FULL_SCREEN_LAPTOP.height) / 2 - 8,
  };

  // SET CHART
  const SET_HEIGHT_CHART =
    screenHeight > 730 ? screenHeight / 3 - 51 : 300 - 51;

  return (
    <Box component={"div"} className="production-screen">
      <Box
        component={"div"}
        sx={
          screenHeight > 730 && screenHeight < 780
            ? { position: "relative", height: `${screenHeight / 3}px` }
            : { position: "relative", height: "100%" }
        }
      >
        <Breadcrumb>{t("production.name")}</Breadcrumb>
        <Navigation
          navigate={navigate}
          setNavigate={setNavigate}
          date={date}
          setDate={setDate}
          isState={isState}
        />
      </Box>
      {isState ? (
        <Box component={"div"} className="production-screen-body">
          {navigate.line === "" ? (
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 4, md: 8, lg: 12 }}
            >
              <Grid item xs={4}>
                <EFFByFloor
                  setGetEFF={setGetEFF}
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  setHeightChart={SET_HEIGHT_CHART}
                  header={
                    navigate?.floor === ""
                      ? t("production.eff-by-the-floor")
                      : t("production.eff-by-the-line")
                  }
                  type={"eff"}
                  typeChart={"ColumnMixed"}
                  checkFloorLine={navigate?.floor}
                  data={DATA_PRODUCTION}
                  titleTarget={t("production.eff-by-the-floor-target")}
                  titleActual={t("production.eff-by-the-floor-actual")}
                />
              </Grid>
              <Grid item xs={4}>
                <RFTByFloor
                  setRFT={setRFT}
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  setHeightChart={SET_HEIGHT_CHART}
                  header={
                    navigate?.floor === ""
                      ? t("production.rft-by-the-floor")
                      : t("production.rft-by-the-line")
                  }
                  checkFloorLine={navigate?.floor}
                  type={"rft"}
                  typeChart={"ColumnMixed"}
                  data={DATA_PRODUCTION}
                  titleTarget={t("production.rft-by-the-floor-target")}
                  titleActual={t("production.rft-by-the-floor-actual")}
                />
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={6}>
                    <AnalyzerTarget
                      customStyle={SET_FULL_SCREEN_LAPTOP_}
                      header={t("production.eff")}
                      target={`${t("production.eff-base-line")} ${
                        IS_TARGET_EFF_RFT.floor.eff
                      }%`}
                      data={`${getEFF}%`}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <AnalyzerTarget
                      customStyle={SET_FULL_SCREEN_LAPTOP_}
                      header={t("production.rft")}
                      target={`${t("production.rft-target")} ${
                        IS_TARGET_EFF_RFT.floor.rft
                      }%`}
                      data={`${getRFT}%`}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <AnalyzerTotalOutput
                      customStyle={SET_FULL_SCREEN_LAPTOP_}
                      header={t("production.total-output")}
                      titleTarget={t("production.total-output-target")}
                      titleActual={t("production.total-output-actual")}
                      data={DATA_PRODUCTION}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <AnalyzerTopLine
                      customStyle={SET_FULL_SCREEN_LAPTOP_}
                      header={t("production.stopline")}
                      data={stopLineList}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <OutPutByFloor
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  setHeightChart={SET_HEIGHT_CHART}
                  header={
                    navigate?.floor === ""
                      ? t("production.output-by-floor")
                      : t("production.output-by-line")
                  }
                  data={DATA_PRODUCTION}
                  // data={OUTPUT_BY_FLOOR}
                />
              </Grid>
              <Grid item xs={4}>
                <HourlyOutputByFloor
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  setHeightTable={SET_HEIGHT_CHART}
                  header={
                    navigate?.floor === ""
                      ? t("production.hourly-output-by-floor")
                      : t("production.hourly-output-by-line")
                  }
                  data={DATA_PRODUCTION}
                />
              </Grid>
              <Grid item xs={4} sx={SET_FULL_SCREEN_LAPTOP}>
                <AttendanceByFloor
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  setHeightChart={SET_HEIGHT_CHART}
                  header={
                    navigate?.floor === ""
                      ? t("production.attendance-by-floor")
                      : t("production.attendance-by-line")
                  }
                  data={DATA_PRODUCTION}
                />
              </Grid>
            </Grid>
          ) : (
            <Slick setDot={false} setArrow={true} swipe={true}>
              <div>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 4, md: 8, lg: 12 }}
                >
                  <Grid item xs={4}>
                    <EFFByTheHour
                      customStyle={SET_FULL_SCREEN_LAPTOP}
                      setHeightChart={SET_HEIGHT_CHART}
                      header={t("production.eff-by-the-hour")}
                      type={"eff"}
                      section={navigate.section}
                      data={DATA_PRODUCTION}
                      line={navigate.line}
                      setGetEFF={setGetEFF}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <RFTByTheHour
                      customStyle={SET_FULL_SCREEN_LAPTOP}
                      setHeightChart={SET_HEIGHT_CHART}
                      header={t("production.rft-by-the-hour")}
                      type={"rft"}
                      section={navigate.section}
                      // data={EFF_BY_THE_FLOOR}
                      data={DATA_PRODUCTION}
                      line={navigate.line}
                      setRFT={setRFT}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <ModelRun
                      customStyle={SET_FULL_SCREEN_LAPTOP}
                      header={t("production.model-run-by-line")}
                      // targetStitching={target.targetStitching}
                      // targetAssembly={target.targetAssembly}
                      // data={SHOE_DATA}
                      data={DATA_PRODUCTION}
                      line={navigate.line}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <OutPutTheHour
                      customStyle={SET_FULL_SCREEN_LAPTOP}
                      setHeightChart={SET_HEIGHT_CHART}
                      header={t("production.output-by-the-hour")}
                      // target={TARGET}
                      // plannedWorkingHours={8}
                      // data={OUTPUT_BY_THE_HOURS}
                      section={navigate.section}
                      data={DATA_PRODUCTION}
                      line={navigate.line}
                      floor={navigate.floor}
                      setTotalOuput={setTotalOuput}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <PPHByTheHour
                      customStyle={SET_FULL_SCREEN_LAPTOP}
                      setHeightChart={SET_HEIGHT_CHART}
                      header={t("production.pph-by-the-hour")}
                      // data={OUTPUT_BY_THE_HOURS}
                      // worker={WORKER}
                      section={navigate.section}
                      data={DATA_PRODUCTION}
                      line={navigate.line}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={6} md={6}>
                        <AnalyzerTarget
                          customStyle={SET_FULL_SCREEN_LAPTOP_}
                          header={t("production.eff")}
                          target={`${t("production.eff-base-line")} ${
                            IS_TARGET_EFF_RFT.floor.eff
                          }%`}
                          type={"eff"}
                          data={`${getEFF}%`}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={6}>
                        <AnalyzerTarget
                          customStyle={SET_FULL_SCREEN_LAPTOP_}
                          header={t("production.rft")}
                          target={`${t("production.rft-target")} ${
                            IS_TARGET_EFF_RFT.line.rft
                          }%`}
                          data={`${getRFT}%`}
                          type={"rft"}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={6}>
                        <AnalyzerTotalOutput
                          customStyle={SET_FULL_SCREEN_LAPTOP_}
                          header={t("production.total-output")}
                          titleTarget={t("production.total-output-target")}
                          titleActual={t("production.total-output-actual")}
                          section={navigate.section}
                          data={totalOutput}
                          line={navigate.line}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={6}>
                        <AnalyzerAttendance
                          customStyle={SET_FULL_SCREEN_LAPTOP_}
                          header={t("production.attendance")}
                          section={navigate.section}
                          data={DATA_PRODUCTION}
                          line={navigate.line}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 4, md: 8, lg: 12 }}
                >
                  <Grid item xs={12}>
                    <Top3Defect
                      header={t("production.stopline-top-3-defect")}
                      // data={TOP3_DEFECT}
                      setHeightChart={SET_HEIGHT_CHART}
                      data={stopLineTop3}
                      line={navigate.line}
                    />
                  </Grid>
                </Grid>
              </div>
            </Slick>
          )}
        </Box>
      ) : (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      )}
    </Box>
  );
};

export default ProductionScreen;
