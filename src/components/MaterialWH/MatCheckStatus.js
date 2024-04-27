import React from "react";
import Card from "../Card";
import { Box, Grid } from "@mui/material";
import Title from "../Title";
import PieLegendIcon from "../../icons/PieLegendIcon";
import MatCheckChart from "./MatCheckChart";
import LeatherChart from "./LeatherChart";
import { useTranslation } from "react-i18next";

const MatCheckStatus = (props) => {
  const [t] = useTranslation("global");
  const { customStyle, header, matCheckChart, leatherChart } = props;

  const setHeightChart = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10) - 41),
  };

  const PieLegend = [
    {
      NameEng: t("material-wh.ss24-material-check-status-inspection"),
      NameVit: "",
      // NameVit: "Kiem duyet",
      color: "#fc6e51",
    },
    {
      NameEng: t("material-wh.ss24-material-check-status-pass"),
      NameVit: "",
      // NameVit: "Hoan thanh",
      color: "#a0d468",
    },
    {
      NameEng: t("material-wh.ss24-material-check-status-fail"),
      NameVit: "",
      // NameVit: "Loi",
      color: "#fb4343",
    },
    {
      NameEng: t("material-wh.ss24-material-check-status-waiting"),
      NameVit: "",
      // NameVit: "Cho thi nghiem",
      color: "#ffce54",
    },
  ];

  return (
    <Card customStyle={customStyle}>
      <Box display={"flex"} flexDirection={"column"} height={"100%"}>
        <Title name={header} />
        <Grid container columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {PieLegend?.map((item, i) => (
              <PieLegendIcon
                key={i}
                color={item.color}
                nameVN={item.NameVit}
                nameEN={item.NameEng}
              />
            ))}
          </Grid>
          <Grid
            item
            xs={5}
            sm={5}
            md={5}
            sx={{ width: "100%", height: "100%" }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Box textAlign={"center"} fontWeight={"bold"}>
                  {t("material-wh.ss24-material-check-status-general-tracking")}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <MatCheckChart
                  setHeightChart={setHeightChart.height}
                  matCheckChart={matCheckChart}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={5}
            sm={5}
            md={5}
            sx={{ width: "100%", height: "100%" }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Box textAlign={"center"} fontWeight={"bold"}>
                  {t("material-wh.ss24-material-check-status-leather-summary")}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <LeatherChart
                  setHeightChart={setHeightChart.height}
                  leatherChart={leatherChart}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default MatCheckStatus;
