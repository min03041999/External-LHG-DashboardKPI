import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Box, Button, Grid } from "@mui/material";

import OutputByLine from "../components/StockFitting/OutputByLine";

import { transformedData_OutPut } from "../utils/transformed";
import RFTByLine from "../components/StockFitting/RFTByLine";
import StoplineTop3Defect from "../components/StockFitting/StoplineTop3Defect";
import HourlyOutputByLine from "../components/StockFitting/HourlyOutputByLine";
import TotalOutputByRY from "../components/StockFitting/TotalOutputByRY";
import { stockFittingApi } from "../api/StockFitting/stockFittingApi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const StockFittingScreen = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [outputByLineData, setOutputByLineData] = useState([]);
  const [rftByLineData, setRftByLineData] = useState([]);
  const [hourlyOutputByLineData, setHourlyOutputByLineData] = useState([]);
  const [totalOutputByRyData, setTotalOutputByRyData] = useState([]);
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
    const getOutputByLine = async () => {
      let res = await stockFittingApi.getOutputByLine();
      setOutputByLineData(res.data.data);
    };
    const getRftByLine = async () => {
      let res = await stockFittingApi.getRftByLine();
      setRftByLineData(res.data.data);
    };
    const getHourlyOutputByLine = async () => {
      let res = await stockFittingApi.getHourlyOutputByLine();
      setHourlyOutputByLineData(res.data.data);
    };
    const getTotalOutputByRy = async () => {
      let res = await stockFittingApi.getTotalOutputByRy();
      setTotalOutputByRyData(res.data.data);
    };
    getOutputByLine();
    getRftByLine();
    getHourlyOutputByLine();
    getTotalOutputByRy();
  }, []);

  const SET_FULL_SCREEN_LAPTOP =
    screenHeight > 730
      ? { height: `${screenHeight / 2 - 40}px` }
      : { height: "300px" };
  const SET_HEIGHT_CHART =
    screenHeight > 730 ? screenHeight / 2 - 100 : 300 - 40;

  const OUTPUT_BY_LINE = [...outputByLineData];
  const tranformed_output = transformedData_OutPut(OUTPUT_BY_LINE);

  const RFT_BY_LINE = [...rftByLineData];

  const [t] = useTranslation("global");

  return (
    <Box component={"div"} className="stockfitting-screen">
      <Box component={"div"}>
        <Breadcrumb>
          {t("stockfitting.name")}{" "}
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
            {t("stockfitting.name")}
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
            {t("stockfitting.downtime")}
          </Button>
        </Breadcrumb>
      </Box>

      <Box
        component={"div"}
        className="stockfitting-screen-body"
        sx={{ flexGrow: 1 }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        >
          <Grid item xs={12}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 4, md: 4, lg: 12 }}
            >
              <Grid item xs={4}>
                <OutputByLine
                  header={t("stockfitting.output-by-line")}
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  setHeightChart={SET_HEIGHT_CHART}
                  data={tranformed_output}
                />
              </Grid>
              <Grid item xs={4}>
                <RFTByLine
                  header={t("stockfitting.rft-by-line")}
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  setHeightChart={SET_HEIGHT_CHART}
                  data={RFT_BY_LINE}
                />
              </Grid>
              <Grid item xs={4}>
                <StoplineTop3Defect
                  header={t("stockfitting.stopline-top-3-defect")}
                  customStyle={SET_FULL_SCREEN_LAPTOP}
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
                <HourlyOutputByLine
                  header={t("stockfitting.hourly-output-by-line")}
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  hourlyOutputByLineData={hourlyOutputByLineData}
                />
              </Grid>
              <Grid item xs={6}>
                <TotalOutputByRY
                  header={t("stockfitting.total-output-by-ry")}
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  totalOutputByRyData={totalOutputByRyData}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StockFittingScreen;
