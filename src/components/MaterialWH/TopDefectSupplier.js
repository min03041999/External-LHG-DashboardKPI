import React from "react";
import Card from "../Card";
import DefectTable from "./DefectTable";

import { useTranslation } from "react-i18next";
import { Box, CircularProgress } from "@mui/material";

const TopDefectSupplier = (props) => {
  const { customStyle, data } = props;
  const [t] = useTranslation("global");

  const HEADER_N762 = [
    t("material-wh.top-defect-supplier"),
    t("material-wh.common-material-type"),
    t("material-wh.common-defect"),
  ];

  return (
    <Card customStyle={customStyle}>
      {!data.length ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DefectTable header={HEADER_N762} data={data} />
      )}
    </Card>
  );
};

export default TopDefectSupplier;
