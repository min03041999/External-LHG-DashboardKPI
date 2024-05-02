import React, { useState, useEffect, useMemo } from "react";
import Card from "../Card";
import Title from "../Title";
import LineLegendIcon from "../../icons/LineLegendIcon";
import { Stack, Box } from "@mui/material";
import LineActualIcon from "../../icons/LineActualIcon";

import { IS_TARGET_EFF_RFT } from "../../utils/base";
import LineTarget from "../LineTarget";

import { useTranslation } from "react-i18next";

const EFFByTheHour = (props) => {
  const {
    customStyle,
    setHeightChart,
    header,
    type,
    section,
    data,
    line,
    setGetEFF,
  } = props;
  const [t] = useTranslation("global");
  const [effHours, setEffHours] = useState([]);
  useEffect(() => {
    const getDataLine = data?.find((item) => item.lineAlias === line);

    if (getDataLine) {
      const { eff_assembly_line, eff_stitching_line } = getDataLine;

      const actual =
        section === "assembly" ? eff_assembly_line : eff_stitching_line;

      setEffHours(actual);
    }
  }, [data, line, section]);

  useMemo(() => {
    const sum = effHours?.reduce((acc, value) => acc + (value?.actual || 0), 0);
    const count = effHours?.filter((value) => value?.actual !== 0).length;
    setGetEFF(sum ? Math.round(sum / (count || 1)) : 0);
  }, [effHours, setGetEFF]);

  const transformed = effHours?.map((item) => {
    return {
      time: item.time,
      actual: item.actual,
      target:
        type === "eff"
          ? IS_TARGET_EFF_RFT.line.eff
          : IS_TARGET_EFF_RFT.line.rft[section],
    };
  });

  const target =
    type === "eff"
      ? IS_TARGET_EFF_RFT.line[type]
      : IS_TARGET_EFF_RFT.line[type][section];

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
            {t("production.eff-by-the-hour-target")}
          </span>
          <LineActualIcon />
          <span style={{ fontSize: "10px", fontWeight: "600" }}>
            {t("production.eff-by-the-hour-actual")}
          </span>
        </Box>
      </Stack>

      <LineTarget
        setHeightChart={setHeightChart}
        data={transformed}
        ticks={target}
        domain={target}
      />
    </Card>
  );
};

export default EFFByTheHour;
