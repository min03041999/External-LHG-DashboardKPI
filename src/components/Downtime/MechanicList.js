import React from "react";
import Card from "../Card";
import Title from "../Title";
import DataTable from "../DataTable";

import { useTranslation } from "react-i18next";
// import {
//   DATA_MECHANIC_REPAIRING_TIME,
//   HEADER_MECHANIC_REPAIRING_TIME,
// } from "../../data";

const MechanicList = (props) => {
  const { customStyle, header, data } = props;

  const [t] = useTranslation("global");

  const HEADER_MECHANIC_REPAIRING_TIME = [
    t("downtime.mechanic-list-mechanic"),
    t("downtime.mechanic-list-mechanic-type"),
    t("downtime.mechanic-list-current-task"),
    t("downtime.mechanic-list-status"),
    t("downtime.mechanic-list-total-repairing"),
  ];

  const transformedData = Array.isArray(data)
    ? data.map((item) => {
        return {
          Mechanic: item.mechanic,
          MechanicType: item.mechanic_type,
          CurrentTask: item.current_task,
          Status: item.status,
          TotalRepairing: item.counts,
        };
      })
    : [];

  const setHeightTable = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10) - 40),
  };
  return (
    <Card customStyle={customStyle}>
      <Title name={header} />

      <DataTable
        height={setHeightTable}
        header={HEADER_MECHANIC_REPAIRING_TIME}
        data={transformedData}
        customTableHeadStyle={{
          bgcolor: "#118dff",
          color: "#fff",
          textAlign: "center",
        }}
        customTextStyle={{ whiteSpace: "nowrap", fontSize: 11 }}
        alignText="center"
      />
    </Card>
  );
};

export default MechanicList;
