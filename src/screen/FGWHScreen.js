import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Box, Grid } from "@mui/material";
import StatisticsDashboard from "../components/FinishGoodWH/StatisticsDashboard";
import RepackingReason from "../components/FinishGoodWH/RepackingReason";
import ShippingSchedule from "../components/FinishGoodWH/ShippingSchedule";
import FinishedGoodWHEscalation from "../components/FinishGoodWH/FinishedGoodWHEscalation";

import { useTranslation } from "react-i18next";
import {
  getTotalNotFullyImported,
  getTotalShipped,
  getTotalWaitingInspection,
  getTotalWaitingShipment,
  getTotalWaitingTesting,
  getMDP,
  getRepackingReason,
} from "../redux/feature/finishgood";
import { useDispatch, useSelector } from "react-redux";

const initialData = {
  totalShipped: 0,
  waitingShipment: 0,
  waitingInspection: 0,
  waitingTesting: 0,
  notFullyImported: 0,
  MDP: [
    {
      MDPTarget: 0,
      MDPPercent: 0,
    },
  ],
  shippings: [],
  repackingReason: {
    po: {
      total: 0,
    },
    defects: [],
  },
};

const FGWHScreen = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [t] = useTranslation("global");
  const finishgoodData = useSelector((state) => state.finishgood);
  const dispatch = useDispatch();

  const storedFgwhData = localStorage.getItem("fgwhData");
  const fgwhData = storedFgwhData ? JSON.parse(storedFgwhData) : initialData;

  useEffect(() => {
    localStorage.setItem("fgwhData", JSON.stringify(finishgoodData));
  }, [finishgoodData]);

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
    const getFinishGoodWH = async () => {
      await dispatch(getTotalShipped());
      await dispatch(getTotalWaitingShipment());
      await dispatch(getTotalWaitingInspection());
      await dispatch(getTotalNotFullyImported());
      await dispatch(getTotalWaitingTesting());
      await dispatch(getMDP());
      await dispatch(getRepackingReason());
    };
    getFinishGoodWH();
  }, []);

  const SET_FULL_SCREEN_LAPTOP =
    screenHeight > 730
      ? { height: `${screenHeight / 2 - 40}px` }
      : { height: "300px" };

  return (
    <Box component={"div"} className="fgwh-screen">
      <Box component={"div"}>
        <Breadcrumb factory={"LHG"}>{t("fg-w-h.name")}</Breadcrumb>
      </Box>

      <Box component={"div"} className="fgwh-screen-body" sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 2, sm: 4, md: 4, lg: 12 }}
            >
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <StatisticsDashboard
                      customStyle={SET_FULL_SCREEN_LAPTOP}
                      fgwhData={fgwhData}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <RepackingReason
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  header={t("fg-w-h.repacking-reason")}
                  fgwhData={fgwhData}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 6, sm: 6, md: 12, lg: 12 }}
            >
              <Grid item xs={6}>
                <ShippingSchedule
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  header={t("fg-w-h.shipping-schedule")}
                />
              </Grid>
              <Grid item xs={6}>
                <FinishedGoodWHEscalation
                  customStyle={SET_FULL_SCREEN_LAPTOP}
                  header={t("fg-w-h.finished-goods")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FGWHScreen;
