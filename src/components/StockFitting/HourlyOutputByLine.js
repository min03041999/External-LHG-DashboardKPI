import React from "react";
import Card from "../Card";
import Title from "../Title";
import TableRowSpan from "../TableRowSpan";

const HourlyOutputByLine = (props) => {
  const { customStyle, header, hourlyOutputByLineData } = props;

  const HEADER_TABLE = [
    "07:30 08:30",
    "08:30 09:30",
    "09:30 10:30",
    "10:30 11:30",
    "12:30 13:30",
    "13:30 14:30",
    "14:30 15:30",
    "15:30 16:30",
  ];

  // console.log(hourlyOutputByLineData);

  const DATA = [...hourlyOutputByLineData];

  const transformed_data = DATA?.map((item) => {
    return {
      line: item.name_machine,
      target: item.Target,
      actual: {
        "07:30-08:30": item.h1,
        "08:30-09:30": item.h2,
        "09:30-10:30": item.h3,
        "10:30-11:30": item.h4,
        "12:30-13:30": item.h5,
        "13:30-14:30": item.h6,
        "14:30-15:30": item.h7,
        "15:30-16:30": item.h8,
      },
    };
  });

  console.log(transformed_data);

  const formatCheck = (actual, target) => {
    return actual < target
      ? "red"
      : actual >= target - (target * 5) / 100 && actual <= target - 1
      ? "orange"
      : "green";
  };

  const setHeightTable = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10) - 40),
  };

  return (
    <Card customStyle={customStyle}>
      <Title name={header} />
      <TableRowSpan
        setHeightTable={setHeightTable}
        headerTable={HEADER_TABLE}
        formatCheck={formatCheck}
        data={transformed_data}
      />
    </Card>
  );
};

export default HourlyOutputByLine;
