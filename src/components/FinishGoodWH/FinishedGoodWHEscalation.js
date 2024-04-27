import React from "react";
import Card from "../Card";
import Title from "../Title";
import DataTable from "../DataTable";
import { FINISHED_GOODS_WH_ESCALATION } from "../../data";
import { useTranslation } from "react-i18next";

const FinishedGoodWHEscalation = (props) => {
  const { customStyle, header } = props;
  const [t] = useTranslation("global");
  const setHeightTable = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10) - 40),
  };

  const HEADER_FINISHED_GOODS_WH_ESCALATION = [
    t("fg-w-h.finished-goods-wh"),
    t("fg-w-h.finished-goods-po"),
    t("fg-w-h.finished-goods-article"),
    t("fg-w-h.finished-goods-model"),
    t("fg-w-h.finished-goods-reason"),
    t("fg-w-h.finished-goods-action"),
  ];

  return (
    <Card customStyle={customStyle}>
      <Title name={header} customStyle={{ textAlign: "center" }} />
      <DataTable
        header={HEADER_FINISHED_GOODS_WH_ESCALATION}
        data={FINISHED_GOODS_WH_ESCALATION}
        height={setHeightTable}
        customTableHeadStyle={{
          bgcolor: "#337ab7",
          color: "#fff",
          textAlign: "center",
        }}
        customTextStyle={{ whiteSpace: "nowrap" }}
        alignText="center"
      />
    </Card>
  );
};

export default FinishedGoodWHEscalation;
