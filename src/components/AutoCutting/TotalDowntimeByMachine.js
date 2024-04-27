import React from "react";
import Card from "../Card";
import Title from "../Title";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from "recharts";
import { Box, Typography } from "@mui/material";

const TotalDowntimeByMachine = (props) => {
  const {
    customStyle,
    header,
    setHeightChart,
    autoCuttingData = [],
    unit,
  } = props;

  return (
    <Card customStyle={customStyle}>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
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
        <ResponsiveContainer width="100%" height={setHeightChart}>
          <BarChart data={autoCuttingData} margin={{ top: 20, bottom: 35 }}>
            <XAxis
              dataKey="Layer"
              angle={290}
              textAnchor="end"
              fontSize={11}
              fontWeight={600}
            />
            <Bar dataKey="TotalDowntime" fill="#8884d8">
              <LabelList
                dataKey="TotalDowntime"
                position="top"
                fontSize={11}
                fontWeight={600}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default TotalDowntimeByMachine;
