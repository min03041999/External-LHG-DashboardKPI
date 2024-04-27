import React from "react";
import Card from "../Card";
import Title from "../Title";
import DataTable from "../DataTable";
import { tranformed_date } from "../../utils/transformed";

import { useTranslation } from "react-i18next";

const TotalOutputByRY = (props) => {
  const { customStyle, header, totalOutputByRyData } = props;
  const [t] = useTranslation("global");

  const setHeightTable = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10) - 40),
  };
  const HEADER_TABLE = [
    t("stockfitting.total-output-by-ry-ry"),
    t("stockfitting.total-output-by-ry-art"),
    t("stockfitting.total-output-by-ry-model-name"),
    t("stockfitting.total-output-by-ry-line"),
    t("stockfitting.total-output-by-ry-prod-date"),
    t("stockfitting.total-output-by-ry-target"),
    t("stockfitting.total-output-by-ry-done"),
    t("stockfitting.total-output-by-ry-ongoing"),
  ];

  const DATA = totalOutputByRyData?.map((data) => {
    return {
      SCBH: data.SCBH,
      ARTICLE: data.ARTICLE,
      XieMing: data.XieMing,
      LEAN: data.LEAN,
      PSDT: tranformed_date(data.PSDT),
      PlanQty: data.PlanQty,
      OntimeQty: data.OntimeQty,
      LackQty: data.LackQty,
    };
  });
  return (
    <Card customStyle={customStyle}>
      <Title name={header} />

      <DataTable
        header={HEADER_TABLE}
        data={DATA}
        height={setHeightTable}
        customTableHeadStyle={{
          backgroundColor: "#337ab7",
          color: "#fff",
          padding: "5px",
          textAlign: "center",
        }}
        alignText="center"
        customTextStyle={{ color: "#049962", fontSize: "10px" }}
      />
    </Card>
  );
};

export default TotalOutputByRY;
