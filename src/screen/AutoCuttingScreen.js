import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Box, Button, Grid, Typography } from "@mui/material";
import OverallOEE from "../components/AutoCutting/OverallOEE";
import OverallOEECard from "../components/AutoCutting/OverallOEECard";
import TotalDowntimeByMachine from "../components/AutoCutting/TotalDowntimeByMachine";
import DowntimeReason from "../components/AutoCutting/DowntimeReason";
import OEEByMachine from "../components/AutoCutting/OEEByMachine";
import TotalOutputByRy from "../components/AutoCutting/TotalOutputByRy";
import { autoCuttingApi } from "../api/AutoCutting/autoCuttingApi";
import { Link } from "react-router-dom";
import TabsCustom from "../components/TabsCustom";

import { downTimeApi } from "../api/Downtime/Downtime";
import TotalBreakdownByLineOrMachine from "../components/Downtime/TotalBreakdownByLineOrMachine";
import TotalMachineDowntimeByLine from "../components/Downtime/TotalMachineDowntimeByLine";
import RepairingStatus from "../components/Downtime/RepairingStatus";
import TotalDowntimeByReason from "../components/Downtime/TotalDowntimeByReason";
import MechanicRepairingTime from "../components/Downtime/MechanicRepairingTime";
import MechanicList from "../components/Downtime/MechanicList";

import { useTranslation } from "react-i18next";
import UploadExcel from "../components/AutoCutting/UploadExcel";
import { FACTORY } from "../utils/env";

import Cookies from "js-cookie";

const AutoCuttingScreen = () => {
  const userId = Cookies.get("UserID");

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [open, setOpen] = useState(false);
  const [autoCuttingData, setAutoCuttingData] = useState([]);
  const [materialOnGoing, setMaterialOnGoing] = useState([]);
  const [materialDone, setMaterialDone] = useState([]);
  const [t] = useTranslation("global");

  const [breakDownTime, setBreakDownTime] = useState([]);
  const [breakDownMinutes, setBreakDownMinutes] = useState([]);
  const [repairingStatus, setRepairingStatus] = useState([]);
  const [downtTimeReason, setDownTimeReason] = useState([]);
  const [mechanicRepairTime, setMechanicRepairTime] = useState([]);
  const [listMechanic, setListMechanic] = useState([]);

  const [navigate, setNavigate] = useState({
    factory: FACTORY,
    floor: "Auto Cutting",
    line: "",
    section: "",
  });

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
      ? { height: `${screenHeight / 2 - 65}px` }
      : { height: "300px" };

  const SET_HEIGHT_CHART = screenHeight > 730 ? screenHeight / 3 - 16 : "85%";

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component={"div"} className="autocutting-screen">
      <Box component={"div"}>
        <Breadcrumb factory={"LHG"}>
          {t("auto-cutting.name")}
          {/* <Button
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
          </Button> */}
          {userId == "51401" || userId == "45354" || userId == "46500" ? (
            <Button
              // component={Link}
              variant="contained"
              sx={{
                bgcolor: "#049962",
                marginRight: 2,
                marginLeft: 2,
                ":hover": {
                  bgcolor: "#049962",
                  color: "#fff",
                  opacity: 0.8,
                },
              }}
              onClick={handleClick}
            >
              Import Excel
            </Button>
          ) : (
            <></>
          )}
        </Breadcrumb>
      </Box>

      <TabsCustom tabs={["AutoCutting", "Downtime"]}>
        {/* AutoCutting */}
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
        {/* AutoCutting */}
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

      <UploadExcel open={open} handleClose={handleClose} />
    </Box>
  );
};

export default AutoCuttingScreen;
