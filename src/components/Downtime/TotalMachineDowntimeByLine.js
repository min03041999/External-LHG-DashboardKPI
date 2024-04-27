import React from "react";
import ChartByDowntime from "./ChartByDowntime";
import { TOTAL_DOWNTIME_BY_LINE } from "../../data";

const TotalMachineDowntimeByLine = (props) => {
  const { customStyle, header, setHeightChart, titleMinutes, data } = props;

  const transformedData = data?.map((item) => {
    return {
      name: item.floors,
      value: item.minutess,
    };
  });

  const totalMinute = transformedData?.reduce(
    (total, curr) => total + curr.value,
    0
  );

  return (
    <ChartByDowntime
      customStyle={customStyle}
      header={header}
      setHeightChart={setHeightChart}
      data={transformedData}
      titleTotal={totalMinute}
      subTitle={titleMinutes}
    />
  );
};

export default TotalMachineDowntimeByLine;
