import React from "react";
import Card from "../Card";
import Title from "../Title";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  LabelList,
} from "recharts";
import { Box, Typography } from "@mui/material";

const OverallOEE = (props) => {
  const { customStyle, header, setHeightChart, autoCuttingData = [] } = props;

  const percentAvailability = autoCuttingData?.reduce((acc, item) => {
    return acc + item.AvailabilityFactor;
  }, 0);

  const avgAvailability = percentAvailability / autoCuttingData?.length || 1;

  const percentPerformance = autoCuttingData?.reduce((acc, item) => {
    return acc + item.PerformanceFactor;
  }, 0);

  const avgPerformance = percentPerformance / autoCuttingData?.length || 1;

  const percentQuantity = autoCuttingData?.reduce((acc, item) => {
    return acc + item.QualityFactor;
  }, 0);

  const avgQuantity = percentQuantity / autoCuttingData?.length || 1;

  const chartData = [
    {
      value: (avgQuantity * 100).toFixed(1),
      fill: "#8884d8",
    },
    {
      value: (avgPerformance * 100).toFixed(1),
      fill: "#82ca9d",
    },
    {
      value: (avgAvailability * 100).toFixed(1),
      fill: "#82adf9",
    },
  ];

  const overall = (
    avgQuantity *
    avgPerformance *
    avgAvailability *
    100
  ).toFixed(2);

  return (
    <Card customStyle={customStyle}>
      <Title name={header} />
      <Box>
        <Typography variant="h3" textAlign={"center"} fontWeight={500}>
          {overall}%
        </Typography>
      </Box>
      <Box width={"100%"} height={"90%"}>
        <ResponsiveContainer width="100%" height={setHeightChart}>
          <RadialBarChart
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="110%"
            data={chartData}
          >
            <RadialBar dataKey="value">
              <LabelList
                fill="#000"
                fontSize={12}
                fontWeight={600}
                formatter={(label) => {
                  return label + "%";
                }}
              />
            </RadialBar>
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default OverallOEE;
