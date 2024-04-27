import React, { useMemo } from "react";
import Card from "../Card";
import Title from "../Title";
import { Stack, Box, CircularProgress } from "@mui/material";

import ColumnLegendIcon from "../../icons/ColumnLegendIcon";

import ColumnGroup from "../../components/ColumnGroup";

import { useTranslation } from "react-i18next";

const AttendanceByFloor = (props) => {
  const { customStyle, setHeightChart, header, data } = props; // data_1: line, data_2: value (VD: stitching), data_3: value (VD: assembly)
  const [t] = useTranslation("global");

  const chartData = useMemo(() => {
    const newData = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        newData.push({
          line: data[i]?.lineAlias,
          stitching: data[i].worker?.stitching || 0,
          assembly: data[i].worker?.assembly || 0,
        });
      }
    }
    return newData;
  }, [data]);

  const arraySort = chartData?.sort((a, b) => {
    const lineA = parseInt(a.line.split("-")[1]);
    const lineB = parseInt(b.line.split("-")[1]);
    return lineA - lineB;
  });

  return (
    <Card customStyle={customStyle}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Title name={header} />
        <Box
          component={"div"}
          sx={{ display: "flex", gap: "5px", alignItems: "center" }}
        >
          <ColumnLegendIcon
            name={t("production.attendance-by-floor-stitching")}
            color={"#82adf9"}
          />
          <ColumnLegendIcon
            name={t("production.attendance-by-floor-assembly")}
            color={"#8884d8"}
          />
        </Box>
      </Stack>

      {/* <ColumnGroup setHeightChart={setHeightChart} data={arraySort} /> */}
      {!data ? (
        <Box
          sx={{
            height: setHeightChart,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ColumnGroup setHeightChart={setHeightChart} data={arraySort} />
      )}
    </Card>
  );
};

export default AttendanceByFloor;
