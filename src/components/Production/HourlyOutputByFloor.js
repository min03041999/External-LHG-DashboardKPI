import React, { useMemo } from "react";
import Card from "../Card";
import Title from "../Title";
import TableRowSpan from "../TableRowSpan";
import { HEADER_TABLE } from "../../utils/enum";
import { Box, CircularProgress } from "@mui/material";

const HourlyOutputByFloor = (props) => {
  const { customStyle, setHeightTable, header, data } = props;

  // console.log(data);
  const hourlyOuput = useMemo(() => {
    return data?.map((item, index) => {
      return {
        target: Math.round(item.targetAssembly / 9),
        line: item.lineAlias,
        actual: item.actualAssembly,
      };
    });
  }, [data]);

  const sortedArray = hourlyOuput?.sort((a, b) => {
    const lineA = parseInt(a.line.split("-")[1]);
    const lineB = parseInt(b.line.split("-")[1]);
    return lineA - lineB;
  });

  const formatCheck = (actual, target) => {
    return actual < target
      ? "red"
      : actual >= target - (target * 5) / 100 && actual <= target - 1
      ? "orange"
      : "green";
  };

  return (
    <Card customStyle={customStyle}>
      <Title name={header} />

      {!data ? (
        <Box
          sx={{
            height: setHeightTable,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableRowSpan
          setHeightTable={setHeightTable}
          headerTable={HEADER_TABLE}
          formatCheck={formatCheck}
          data={sortedArray}
        />
      )}
    </Card>
  );
};

export default HourlyOutputByFloor;
