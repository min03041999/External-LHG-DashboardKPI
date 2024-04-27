import React from "react";
import Card from "../Card";
import Title from "../Title";
// import { DATA_REPAIRING_TIME, HEADER_REPAIRING_TIME } from "../../data";
import TableRepairingStatus from "./TableRepairingStatus";

import { useTranslation } from "react-i18next";

const RepairingStatus = (props) => {
  const { customStyle, header, data } = props;
  const [t, i18n] = useTranslation("global");

  const HEADER_REPAIRING_TIME = [
    t("downtime.repairing-status-line"),
    t("downtime.repairing-status-machine-type"),
    t("downtime.repairing-status-machine-name"),
    t("downtime.repairing-status-breakdown-issue"),
    t("downtime.repairing-status-waiting"),
    t("downtime.repairing-status-repairing"),
    t("downtime.repairing-status-done"),
  ];

  const setHeightTable = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10) - 40),
  };

  return (
    <Card customStyle={customStyle}>
      <Title name={header} customStyle={{ textAlign: "center" }} />
      <TableRepairingStatus
        header={HEADER_REPAIRING_TIME}
        height={setHeightTable}
        data={data}
        customTableHeadStyle={{
          textAlign: "center",
          backgroundColor: "#118dff",
          color: "#fff",
        }}
        alignText={"center"}
      />
    </Card>
  );
};

export default RepairingStatus;
