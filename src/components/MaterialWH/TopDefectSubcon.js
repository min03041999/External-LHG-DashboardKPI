import React from "react";
import Card from "../Card";
import DefectTable from "./DefectTable";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress } from "@mui/material";

const TopDefectSubcon = (props) => {
  const { customStyle, data } = props;
  const [t] = useTranslation("global");

  const HEADER_N761 = [
    t("material-wh.top-defect-subcon"),
    t("material-wh.common-defect-material"),
    t("material-wh.common-defect"),
  ];

  const data_top_3_subcon = data?.map((item) => {
    return {
      SupplierName: item.Supplier,
      Materials: [...item.Materials],
      Defect: [...item.Defect],
    };
  });

  // console.log(data_top_3_subcon);

  return (
    <Card customStyle={customStyle}>
      {!data_top_3_subcon.length ? (
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
        <DefectTable header={HEADER_N761} data={data_top_3_subcon} />
      )}
    </Card>
  );
};

export default TopDefectSubcon;
