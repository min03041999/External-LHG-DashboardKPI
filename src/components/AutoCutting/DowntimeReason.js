import React from "react";
import Card from "../Card";
import Title from "../Title";
import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

const DowntimeReason = (props) => {
  const { customStyle, header, autoCuttingData = [], unit } = props;
  const [t] = useTranslation("global");

  const totalStartup = autoCuttingData?.reduce(
    (acc, item) => acc + item.StartUp,
    0
  );
  const totalShutDown = autoCuttingData?.reduce(
    (acc, item) => acc + item.ShutDownData,
    0
  );
  const totalIdle = autoCuttingData?.reduce(
    (acc, item) => acc + item.IdleTime,
    0
  );
  const totalChangeOver = autoCuttingData?.reduce(
    (acc, item) => acc + item.ChangeOver,
    0
  );

  const totalBreakDown = autoCuttingData?.reduce(
    (acc, item) => acc + item.Equip,
    0
  );

  const totalTime =
    totalStartup + totalShutDown + totalIdle + totalChangeOver + totalBreakDown;
  const percentStartUp = (totalStartup / totalTime) * 100;
  const percentShutDown = (totalShutDown / totalTime) * 100;
  const percentIdle = (totalIdle / totalTime) * 100;
  const percentChangeOver = (totalChangeOver / totalTime) * 100;
  const percentBreakDown = (totalBreakDown / totalTime) * 100;

  const downtimeReasonData = [
    {
      title: t("auto-cutting.downtime-reason-breakdown"),
      percentWidth: percentBreakDown,
      totalLabel: totalBreakDown,
    },
    {
      title: t("auto-cutting.downtime-reason-changeover"),
      percentWidth: percentChangeOver,
      totalLabel: totalChangeOver,
    },
    {
      title: t("auto-cutting.downtime-reason-idle-time"),
      percentWidth: percentIdle,
      totalLabel: totalIdle,
    },
    {
      title: t("auto-cutting.downtime-reason-shutdown"),
      percentWidth: percentShutDown,
      totalLabel: totalShutDown,
    },
    {
      title: t("auto-cutting.downtime-reason-start-up"),
      percentWidth: percentStartUp,
      totalLabel: totalStartup,
    },
  ];

  return (
    <Card customStyle={customStyle}>
      <Box height="100%" display="flex" flexDirection="column">
        <Box>
          <Title name={header} />
          <Typography
            textAlign={"end"}
            fontSize={13}
            fontWeight={600}
            sx={{ textDecoration: "underline" }}
            color="#049962"
          >
            {unit}
          </Typography>
        </Box>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          {downtimeReasonData?.map((data, index) => (
            <Box display="flex" alignItems={"center"} key={index}>
              <Box width={"30%"}>
                <Typography fontWeight="bold">{data.title}</Typography>
              </Box>
              <Box flex={1}>
                <Box
                  padding={1}
                  bgcolor={"#118dff"}
                  width={`${data.percentWidth}%`}
                  textAlign={"end"}
                  fontWeight={600}
                  color={"#fff"}
                >
                  {data.totalLabel}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
};

export default DowntimeReason;
