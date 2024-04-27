import React from "react";
import ChartByDowntime from "./ChartByDowntime";
// import { TOTAL_BREAKDOWN_BY_LINE } from "../../data";

const TotalBreakdownByLineOrMachine = (props) => {
  const { customStyle, header, setHeightChart, data, titleTimes } = props;

  const transformedData = data?.map((item) => {
    return {
      name: item.floors,
      value: item.counts,
    };
  });

  // console.log(transformedData);
  const totalTime = transformedData?.reduce(
    (total, curr) => total + curr.value,
    0
  );

  return (
    <ChartByDowntime
      customStyle={customStyle}
      header={header}
      setHeightChart={setHeightChart}
      data={transformedData}
      titleTotal={totalTime}
      subTitle={titleTimes}
    />
  );
};

export default TotalBreakdownByLineOrMachine;
