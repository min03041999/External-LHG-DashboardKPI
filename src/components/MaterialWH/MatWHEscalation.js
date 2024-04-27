import React from "react";
import Card from "../Card";
import Title from "../Title";
import DataTable from "../DataTable";
import { useTranslation } from "react-i18next";

const MatWHEscalation = (props) => {
  const { customStyle, header, data } = props;
  const [t] = useTranslation("global");
  const setHeightTable = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10) - 40),
  };

  const HEADER_MATERIAL_WH_ESCALATION = [
    t("material-wh.material-wh-escalation-po"),
    t("material-wh.material-wh-escalation-material-id"),
    t("material-wh.material-wh-escalation-material-name"),
    t("material-wh.material-wh-escalation-reason"),
    t("material-wh.material-wh-escalation-action"),
  ];

  return (
    <Card customStyle={customStyle}>
      <Title name={header} />
      <DataTable
        header={HEADER_MATERIAL_WH_ESCALATION}
        data={data}
        height={setHeightTable}
        customTableHeadStyle={{
          backgroundColor: "#337ab7",
          color: "#fff",
          textAlign: "center",
        }}
        customTextStyle={{ whiteSpace: "nowrap" }}
      />
    </Card>
  );
};

export default MatWHEscalation;
