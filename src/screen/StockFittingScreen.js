import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Box, Grid } from "@mui/material";
import { FACTORY } from "../utils/env";

import OutputByLine from "../components/StockFitting/OutputByLine";

import { transformedData_OutPut } from "../utils/transformed";
import RFTByLine from "../components/StockFitting/RFTByLine";
import StoplineTop3Defect from "../components/StockFitting/StoplineTop3Defect";
import HourlyOutputByLine from "../components/StockFitting/HourlyOutputByLine";
import TotalOutputByRY from "../components/StockFitting/TotalOutputByRY";

import { stockFittingApi } from "../api/StockFitting/stockFittingApi";
import { useTranslation } from "react-i18next";
import TabsCustom from "../components/TabsCustom";

import { downTimeApi } from "../api/Downtime/Downtime";
import TotalBreakdownByLineOrMachine from "../components/Downtime/TotalBreakdownByLineOrMachine";
import TotalMachineDowntimeByLine from "../components/Downtime/TotalMachineDowntimeByLine";
import RepairingStatus from "../components/Downtime/RepairingStatus";
import TotalDowntimeByReason from "../components/Downtime/TotalDowntimeByReason";
import MechanicRepairingTime from "../components/Downtime/MechanicRepairingTime";
import MechanicList from "../components/Downtime/MechanicList";

const StockFittingScreen = () => {
  //StockFitting
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

  //Downtime
  const [navigate, setNavigate] = useState({
    factory: FACTORY,
    floor: "Stock Fitting",
    line: "",
    section: "",
  });
  const [breakDownTime, setBreakDownTime] = useState([]);
  const [breakDownMinutes, setBreakDownMinutes] = useState([]);
  const [repairingStatus, setRepairingStatus] = useState([]);
  const [downtTimeReason, setDownTimeReason] = useState([]);
  const [mechanicRepairTime, setMechanicRepairTime] = useState([]);
  const [listMechanic, setListMechanic] = useState([]);

  useEffect(() => {
    const getBreakDownTimes = async (navigate) => {
      const res = await downTimeApi.getBreakdownTimes(navigate);
      setBreakDownTime(res.data.data);
    };

    const getBreakDownMinutes = async (navigate) => {
      const res = await downTimeApi.getBreakdownMinutes(navigate);
      setBreakDownMinutes(res.data.data);
    };

    const getDowntimeReason = async (navigate) => {
      const res = await downTimeApi.getDowntimeReason(navigate);
      setDownTimeReason(res.data.data);
    };

    const getRepairingStatus = async (navigate) => {
      const res = await downTimeApi.getRepairingStatus(navigate);
      setRepairingStatus(res.data.data);
    };

    const getMechanicRepairTime = async (navigate) => {
      const res = await downTimeApi.getMechanicRepairTime(navigate);
      setMechanicRepairTime(res.data.data);
    };

    const getListMechanic = async (navigate) => {
      const res = await downTimeApi.getListMechanic(navigate);
      setListMechanic(res.data.data);
    };

    setTimeout(() => {
      getBreakDownTimes(navigate);
    }, 1000);
    setTimeout(() => {
      getBreakDownMinutes(navigate);
    }, 2000);
    getRepairingStatus(navigate);
    setTimeout(() => {
      getDowntimeReason(navigate);
    }, 3000);
    setTimeout(() => {
      getMechanicRepairTime(navigate);
    }, 4000);
    getListMechanic(navigate);
  }, [navigate]);

  const SET_FULL_SCREEN_LAPTOP =
    screenHeight > 730
      ? { height: `${screenHeight / 2 - 65}px` }
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
        <Breadcrumb factory={"LHG"}>{t("stockfitting.name")}</Breadcrumb>
      </Box>
      <TabsCustom tabs={["Stockfitting", "Downtime"]}>
        {/* Stockfitting */}
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
        {/* Stockfitting */}

        {/* Downtime */}
        <Box
          component={"div"}
          className="downtime-screen-body"
          sx={{ flexGrow: 1 }}
        >
          <Grid container spacing={{ xs: 2, md: 2 }} marginTop={1}>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <TotalBreakdownByLineOrMachine
                customStyle={SET_FULL_SCREEN_LAPTOP}
                header={t("downtime.machine-downtime-by-floor")}
                setHeightChart={SET_HEIGHT_CHART}
                data={breakDownTime}
                titleTimes={t("downtime.breakdown-by-machine-times")}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <TotalMachineDowntimeByLine
                customStyle={SET_FULL_SCREEN_LAPTOP}
                header={t("downtime.breakdown-by-floor")}
                setHeightChart={SET_HEIGHT_CHART}
                data={breakDownMinutes}
                titleMinutes={t("downtime.machine-downtime-by-machine-minutes")}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <RepairingStatus
                customStyle={SET_FULL_SCREEN_LAPTOP}
                header={t("downtime.repairing-status")}
                data={repairingStatus}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <TotalDowntimeByReason
                customStyle={SET_FULL_SCREEN_LAPTOP}
                header={t("downtime.downtime-by-machine")}
                setHeightChart={SET_HEIGHT_CHART}
                titleMinutes={t("downtime.downtime-by-machine-minutes")}
                data={downtTimeReason}
              />
            </Grid>
            <Grid item lg={5} md={6} sm={6} xs={12}>
              <MechanicRepairingTime
                customStyle={SET_FULL_SCREEN_LAPTOP}
                header={t("downtime.repairing-time")}
                data={mechanicRepairTime}
              />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <MechanicList
                customStyle={SET_FULL_SCREEN_LAPTOP}
                header={t("downtime.mechanic-list")}
                data={listMechanic}
              />
            </Grid>
          </Grid>
        </Box>
        {/* Downtime */}
      </TabsCustom>
    </Box>
  );
};

export default StockFittingScreen;
