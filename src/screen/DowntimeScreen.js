import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Navigation from "../components/Navigation";
import { FACTORY } from "../utils/env";
// import TotalChartByDowntime from "../components/Downtime/ChartByDowntime";
import TotalDowntimeByReason from "../components/Downtime/TotalDowntimeByReason";
import MechanicRepairingTime from "../components/Downtime/MechanicRepairingTime";
import MechanicList from "../components/Downtime/MechanicList";
import RepairingStatus from "../components/Downtime/RepairingStatus";
import TotalBreakdownByLineOrMachine from "../components/Downtime/TotalBreakdownByLineOrMachine";
import TotalMachineDowntimeByLine from "../components/Downtime/TotalMachineDowntimeByLine";

import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { downTimeApi } from "../api/Downtime/Downtime";

const DowntimeScreen = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [navigate, setNavigate] = useState({
    factory: FACTORY,
    floor: "",
    line: "",
    section: "",
  });

  const [isState, setIsState] = useState(false);
  const [breakDownTime, setBreakDownTime] = useState([]);
  const [breakDownMinutes, setBreakDownMinutes] = useState([]);
  const [repairingStatus, setRepairingStatus] = useState([]);
  const [downtTimeReason, setDownTimeReason] = useState([]);
  const [mechanicRepairTime, setMechanicRepairTime] = useState([]);
  const [listMechanic, setListMechanic] = useState([]);

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
    setIsState(false);
    const getBreakDownTimes = async (navigate) => {
      const res = await downTimeApi.getBreakdownTimes(navigate);
      setBreakDownTime(res.data.data);
      setIsState(true);
    };

    const getBreakDownMinutes = async (navigate) => {
      const res = await downTimeApi.getBreakdownMinutes(navigate);
      setBreakDownMinutes(res.data.data);
      setIsState(true);
    };

    const getDowntimeReason = async (navigate) => {
      const res = await downTimeApi.getDowntimeReason(navigate);
      setDownTimeReason(res.data.data);
      setIsState(true);
    };

    const getRepairingStatus = async (navigate) => {
      const res = await downTimeApi.getRepairingStatus(navigate);
      setRepairingStatus(res.data.data);
      setIsState(true);
    };

    const getMechanicRepairTime = async (navigate) => {
      const res = await downTimeApi.getMechanicRepairTime(navigate);
      setMechanicRepairTime(res.data.data);
      setIsState(true);
    };

    const getListMechanic = async (navigate) => {
      const res = await downTimeApi.getListMechanic(navigate);
      setListMechanic(res.data.data);
      setIsState(true);
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
      ? { height: `${screenHeight / 3}px` }
      : { height: "300px" };
  const SET_HEIGHT_CHART =
    screenHeight > 730 ? screenHeight / 3 - 90 : 300 - 90;

  const [t] = useTranslation("global");

  // console.log(breakDownTime);

  return (
    <Box component={"div"} className="downtime-screen">
      <Box
        component={"div"}
        sx={
          screenHeight > 730 && screenHeight < 780
            ? { position: "relative", height: `${screenHeight / 3}px` }
            : { position: "relative", height: "100%" }
        }
      >
        <Breadcrumb>{t("downtime.name")}</Breadcrumb>
        <Navigation
          navigate={navigate}
          setNavigate={setNavigate}
          isState={isState}
        />
      </Box>
      {isState ? (
        <Box
          component={"div"}
          className="downtime-screen-body"
          sx={{ flexGrow: 1 }}
        >
          <Grid
            container
            spacing={2}
            marginTop={1}
            // columns={{ xs: 2, sm: 6, md: 4, lg: 12 }}
          >
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <TotalBreakdownByLineOrMachine
                customStyle={SET_FULL_SCREEN_LAPTOP}
                header={t("downtime.breakdown-by-machine")}
                setHeightChart={SET_HEIGHT_CHART}
                data={breakDownTime}
                titleTimes={t("downtime.breakdown-by-machine-times")}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <TotalMachineDowntimeByLine
                customStyle={SET_FULL_SCREEN_LAPTOP}
                header={t("downtime.machine-downtime-by-line")}
                setHeightChart={SET_HEIGHT_CHART}
                data={breakDownMinutes}
                titleMinutes={t("downtime.machine-downtime-by-line-minutes")}
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
      ) : (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      )}
    </Box>
  );
};

export default DowntimeScreen;
