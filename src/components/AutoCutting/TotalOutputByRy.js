import React from "react";
import Card from "../Card";
import Title from "../Title";
import DataTable from "../DataTable";
// import { HEADER_TOTAL_OUTPUT_BY_RY } from "../../data";
import { Box, CircularProgress } from "@mui/material";
import { tranformed_date } from "../../utils/transformed";

import { useTranslation } from "react-i18next";

const TotalOutputByRy = (props) => {
  const {
    customStyle,
    header,
    materialOnGoing = [],
    materialDone = [],
  } = props;
  const setHeightTable = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10) / 2 - 24),
  };

  const [t] = useTranslation("global");

  const DATA_GET_MATERIAL_ON_GOING = materialOnGoing?.map((data) => {
    return {
      RY: data.RY,
      ARTICLE: data.ARTICLE,
      Model: data.Model,
      LEAN: data.LEAN,
      prodate: tranformed_date(data.prodate),
      Plan_qty: data.Plan_qty,
      Actual_qty: data.Actual_qty,
      TotalComp: data.TotalComp,
      ongoing: data.ongoing,
    };
  });

  const DATA_GET_MATERIAL_DONE = materialDone?.map((data) => {
    return {
      RY: data.RY,
      ARTICLE: data.ARTICLE,
      Model: data.Model,
      LEAN: data.LEAN,
      prodate: tranformed_date(data.prodate),
      Plan_qty: data.Plan_qty,
      Actual_qty: data.Actual_qty,
      TotalComp: data.TotalComp,
      ongoing: data.ongoing,
    };
  });

  const HEADER_TOTAL_OUTPUT_BY_RY = [
    t("auto-cutting.total-output-by-ry-ry"),
    t("auto-cutting.total-output-by-ry-art"),
    t("auto-cutting.total-output-by-ry-model-name"),
    t("auto-cutting.total-output-by-ry-line"),
    t("auto-cutting.total-output-by-ry-pro-date"),
    t("auto-cutting.total-output-by-ry-target"),
    t("auto-cutting.total-output-by-ry-actual"),
    t("auto-cutting.total-output-by-ry-total-component"),
    t("auto-cutting.total-output-by-ry-on-going"),
  ];

  return (
    <Card customStyle={customStyle}>
      <Title name={header} />
      <Box paddingBottom={1}>
        {!DATA_GET_MATERIAL_ON_GOING.length ? (
          <Box
            sx={{
              height: setHeightTable,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataTable
            header={HEADER_TOTAL_OUTPUT_BY_RY}
            data={DATA_GET_MATERIAL_ON_GOING}
            customTableHeadStyle={{
              bgcolor: "#337ab7",
              color: "#fff",
              textAlign: "center",
            }}
            alignText="center"
            customTextStyle={{ whiteSpace: "nowrap", fontSize: 11 }}
            height={setHeightTable}
          />
        )}
      </Box>
      <Box>
        {!DATA_GET_MATERIAL_DONE.length ? (
          <Box
            sx={{
              height: setHeightTable,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataTable
            header={HEADER_TOTAL_OUTPUT_BY_RY}
            data={DATA_GET_MATERIAL_DONE}
            customTableHeadStyle={{
              bgcolor: "#337ab7",
              color: "#fff",
              textAlign: "center",
            }}
            alignText="center"
            customTextStyle={{ whiteSpace: "nowrap", fontSize: 11 }}
            height={setHeightTable}
          />
        )}
      </Box>
    </Card>
  );
};

export default TotalOutputByRy;
