import React from "react";
import Card from "../Card";
import Title from "../Title";
import { TabDailyInspectionReport } from "./TabTable";

const DailyInspectionReport = (props) => {
  const { customStyle, header, leatherSumary, matQCCheck } = props;
  return (
    <Card customStyle={customStyle}>
      <Title name={header} />
      <TabDailyInspectionReport
        setHeight={customStyle}
        leatherSumary={leatherSumary}
        matQCCheck={matQCCheck}
      />
    </Card>
  );
};

export default DailyInspectionReport;
