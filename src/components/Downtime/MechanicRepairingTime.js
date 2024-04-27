import React, { useEffect, useState } from "react";
import Card from "../Card";
import Title from "../Title";
import ColumnLegendIcon from "../../icons/ColumnLegendIcon";
import { Box } from "@mui/material";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
// import { MECHANIC_REPAIRING_TIME } from "../../data";

import { useTranslation } from "react-i18next";

const MechanicRepairingTime = (props) => {
  const { customStyle, header, data } = props;
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const transformedData = Array.isArray(data)
    ? data.map((item) => {
        const array_length = item.name.split(" ").length;
        const custom_name = item.name.split(" ")[array_length - 1];
        // console.log(custom_name);

        return {
          name: item.name,
          repairingtime: item.repairing,
          waitingtime: item.waiting,
        };
      })
    : [];

  const SET_HEIGHT_CHART =
    screenHeight > 730 ? screenHeight / 3 - 40 : 300 - 40;

  const [t] = useTranslation("global");
  return (
    <Card customStyle={customStyle}>
      <Title name={header} />
      <Box display={"flex"} gap={3}>
        <ColumnLegendIcon
          name={t("downtime.repairing-time-pair-time")}
          color={"#118dff"}
          customStyle={{
            borderRadius: "50%",
            width: "1rem",
            height: "1rem",
          }}
        />
        <ColumnLegendIcon
          name={t("downtime.repairing-time-wait-time")}
          color={"#f09538"}
          customStyle={{
            borderRadius: "50%",
            width: "1rem",
            height: "1rem",
          }}
        />
      </Box>
      <Box>
        <ResponsiveContainer width={"100%"} height={SET_HEIGHT_CHART}>
          <BarChart data={transformedData}>
            <XAxis
              dataKey="name"
              fontSize={11}
              fontWeight={600}
              axisLine={false}
              tickLine={false}
            />
            <Bar
              dataKey="repairingtime"
              fill="#118dff"
              label={{ fill: "white", fontWeight: "bold" }}
            />
            <Bar
              dataKey="waitingtime"
              fill="#f09538"
              label={{ fill: "white", fontWeight: "bold" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default MechanicRepairingTime;
