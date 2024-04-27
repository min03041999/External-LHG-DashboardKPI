import React, { useState, useEffect } from "react";
import Card from "../Card";
import Title from "../Title";
import LineLegendIcon from "../../icons/LineLegendIcon";
import TwoToneLegendIcon from "../../icons/TwoToneLegendIcon";
import { Stack, Box, CircularProgress } from "@mui/material";

import ColumnChartMixed from "../ColumnChartMixed";

import { COLUMN_CHART_MIXED_COLOR } from "../../utils/config.js";
import { IS_TARGET_EFF_RFT } from "../../utils/base.js";

import { handleFakeRft } from "../../utils/helper.js";

const RFTByFloor = (props) => {
  const {
    setRFT,
    customStyle,
    setHeightChart,
    header,
    type,
    data,
    titleActual,
    titleTarget,
    checkFloorLine,
  } = props; // Data data_1: line, data_2: value (rft, eff), data_3: target
  const { is_target, is_not_target } = COLUMN_CHART_MIXED_COLOR[type];
  const ticks = [0, IS_TARGET_EFF_RFT.floor[type]];
  const [dataRFT, setDataRFT] = useState([]);

  useEffect(() => {
    const transformedData_RFT = data?.map((item) => {
      return {
        data_1: item.lineAlias,
        data_2: handleFakeRft(item.quality),
        data_3:
          checkFloorLine !== ""
            ? IS_TARGET_EFF_RFT.floor[type]
            : IS_TARGET_EFF_RFT.floor[type],
      };
    });

    const sortedArray = transformedData_RFT?.sort((a, b) => {
      const lineA = parseInt(a.data_1.split("-")[1]);
      const lineB = parseInt(b.data_1.split("-")[1]);
      return lineA - lineB;
    });

    setDataRFT(sortedArray);

    const sum = transformedData_RFT?.reduce(
      (acc, value) => acc + (value?.data_2 || 0),
      0
    );
    const avg = sum / (transformedData_RFT?.length || 1);
    setRFT(Math.round(avg));
  }, [data]);

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
          <LineLegendIcon stroke={"#0d47a1"} />
          <span style={{ fontSize: "10px", fontWeight: "600" }}>
            {titleTarget}
          </span>
          <TwoToneLegendIcon
            firstColor={is_target}
            secondColor={is_not_target}
          />
          <span style={{ fontSize: "10px", fontWeight: "600" }}>
            {titleActual}
          </span>
        </Box>
      </Stack>

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
        <ColumnChartMixed
          setHeightChart={setHeightChart}
          data={dataRFT}
          ticks={ticks}
          is_target={is_target}
          is_not_target={is_not_target}
        />
      )}
    </Card>
  );
};

export default RFTByFloor;
