import React from "react";
import Card from "../Card";
import { Box, Grid, Typography } from "@mui/material";
import Title from "../Title";
import FinishGoodCard from "./FinishGoodCard";
import { useTranslation } from "react-i18next";
import FadeInNumber from "../../utils/animation";

const StatisticsDashboard = (props) => {
  const { customStyle, fgwhData } = props;
  const [t] = useTranslation("global");
  const setHeight = parseFloat(customStyle?.height) / 2 - 8;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}>
          <FinishGoodCard
            name={t("fg-w-h.total-shipped")}
            titleNumber={fgwhData.totalShipped}
            setHeight={setHeight}
          />

          <FinishGoodCard
            name={t("fg-w-h.waiting-for-shipment")}
            titleNumber={fgwhData.waitingShipment}
            setHeight={setHeight}
          />

          <FinishGoodCard
            name={t("fg-w-h.waiting-for-inspection")}
            titleNumber={fgwhData.waitingInspection}
            setHeight={setHeight}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}>
          <Grid item xs={4}>
            <Card customStyle={{ height: setHeight + "px" }}>
              <Box display="flex" flexDirection="column" height="100%">
                <Title
                  name={t("fg-w-h.mdp")}
                  customStyle={{
                    textAlign: "center",
                    fontSize: "25px !important",
                  }}
                />
                <Box
                  flex={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h3" component="h5" fontWeight={600}>
                    <FadeInNumber n={fgwhData.MDP[0].MDPPercent} />%
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={600}>
                  {t("fg-w-h.mdp-target")}{" "}
                  <FadeInNumber n={fgwhData.MDP[0].MDPTarget} />%
                </Typography>
              </Box>
            </Card>
          </Grid>
          <FinishGoodCard
            name={t("fg-w-h.waiting-for-testing")}
            titleNumber={fgwhData.waitingTesting}
            setHeight={setHeight}
          />

          <FinishGoodCard
            name={t("fg-w-h.not-fully-imported")}
            titleNumber={fgwhData.notFullyImported}
            setHeight={setHeight}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StatisticsDashboard;
