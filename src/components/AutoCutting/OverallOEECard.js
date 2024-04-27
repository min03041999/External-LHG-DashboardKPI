import React from "react";
import Card from "../Card";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Title from "../Title";

import { useTranslation } from "react-i18next";
import FadeInNumber from "../../utils/animation";

const OverallOEECard = (props) => {
  const { customStyle, autoCuttingData = [] } = props;
  const setHeight = parseFloat(parseInt(customStyle?.height) / 3 - 10.5);
  const [t] = useTranslation("global");
  const languages = localStorage.getItem("languages");

  const totalUptime = autoCuttingData?.reduce(
    (acc, item) => acc + item.Operating,
    0
  );
  const totalAvailableTime = autoCuttingData?.reduce(
    (acc, item) => acc + item.AvailableTime,
    0
  );
  const totalActualOutput = autoCuttingData?.reduce(
    (acc, item) => acc + item.ActualOutput,
    0
  );
  const totalTheoreticalOutput = autoCuttingData?.reduce(
    (acc, item) => acc + item.TheoreticalOutput,
    0
  );
  const totalPairs = autoCuttingData?.reduce(
    (acc, item) => acc + item.ActualOutput,
    0
  );
  const totalDefect = autoCuttingData?.reduce(
    (acc, item) => acc + item.DefectiveProduct,
    0
  );
  const goodPairs = totalPairs - totalDefect;

  const dataOverall = [
    {
      header: t("auto-cutting.availability"),
      label: t("auto-cutting.availability-uptime"),
      lables: t("auto-cutting.availability-available-time"),
      labelNumber: totalUptime,
      labelNumbers: totalAvailableTime,
      backgroundColor: "#82adf9",
    },
    {
      header: t("auto-cutting.performance"),
      label: t("auto-cutting.performance-total-actual-output"),
      lables: t("auto-cutting.performance-total-theoretical-output"),
      labelNumber: totalActualOutput,
      labelNumbers: totalTheoreticalOutput,
      backgroundColor: "#82ca9d",
    },
    {
      header: t("auto-cutting.quantity"),
      label: t("auto-cutting.quantity-good-pairs"),
      lables: t("auto-cutting.quantity-total-pairs"),
      labelNumber: goodPairs,
      labelNumbers: totalPairs,
      backgroundColor: "#8884d8",
    },
  ];

  return (
    <Grid container spacing={2}>
      {dataOverall?.map((data, index) => (
        <Grid item xs={12} key={index}>
          <Card
            customStyle={{
              height: setHeight,
              backgroundColor: data.backgroundColor,
            }}
          >
            <Box display={"flex"} flexDirection={"column"} height={"100%"}>
              <Title
                name={data.header}
                customStyle={{ textAlign: "center", color: "#fff" }}
              />
              <Box flex={1} display={"flex"} alignItems={"center"}>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography
                      fontSize={13}
                      fontWeight={600}
                      textAlign={"center"}
                    >
                      <span
                        style={{
                          fontSize: languages === "TW" ? "3rem" : "1rem",
                        }}
                      >
                        <FadeInNumber n={data.labelNumber} />
                      </span>
                      <br />
                      <Typography fontWeight={600}>{data.label}</Typography>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Divider
                      orientation="vertical"
                      sx={{
                        height: "85%",
                        borderLeftWidth: 1,
                        bgcolor: "black",
                      }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography
                      fontSize={13}
                      fontWeight={600}
                      textAlign={"center"}
                    >
                      <span
                        style={{
                          fontSize: languages === "TW" ? "3rem" : "1rem",
                        }}
                      >
                        <FadeInNumber n={data.labelNumbers} />
                      </span>
                      <br />
                      <Typography fontWeight={600}>{data.lables}</Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OverallOEECard;
