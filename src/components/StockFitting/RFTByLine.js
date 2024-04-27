import React from "react";
import Card from "../Card";
import Title from "../Title";
import LineLegendIcon from "../../icons/LineLegendIcon";
import TwoToneLegendIcon from "../../icons/TwoToneLegendIcon";

import { Stack, Box } from "@mui/material";

import { COLUMN_CHART_MIXED_COLOR } from "../../utils/config.js";
import { IS_TARGET_STOCK_FITTING } from "../../utils/base.js";

import ColumnChartMixed from "../ColumnChartMixed";

import { useTranslation } from "react-i18next";

const RFTByLine = (props) => {
  const { customStyle, setHeightChart, header, data } = props;
  const [t] = useTranslation("global");
  const { is_target, is_not_target } = COLUMN_CHART_MIXED_COLOR.rft;

  const ticks = [0, IS_TARGET_STOCK_FITTING.line.rft];

  const transformedData_RFT = data?.map((item) => {
    return {
      data_1: item.name_machine,
      data_2: item.rft,
      data_3: IS_TARGET_STOCK_FITTING.line.rft,
    };
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
          <LineLegendIcon stroke={"#0d47a1"} />
          <span style={{ fontSize: "10px", fontWeight: "600" }}>
            {t("stockfitting.rft-by-line-target")}
          </span>
          <TwoToneLegendIcon
            firstColor={is_target}
            secondColor={is_not_target}
          />
          <span style={{ fontSize: "10px", fontWeight: "600" }}>
            {t("stockfitting.rft-by-line-actual")}
          </span>
        </Box>
      </Stack>

      <ColumnChartMixed
        setHeightChart={setHeightChart}
        data={transformedData_RFT}
        ticks={ticks}
        is_target={is_target}
        is_not_target={is_not_target}
      />
    </Card>
  );
};

export default RFTByLine;
