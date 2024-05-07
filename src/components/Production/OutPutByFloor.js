import React, { useMemo, useState } from "react";
import Card from "../Card";
import Title from "../Title";
import { Stack, Box, CircularProgress } from "@mui/material";
import _ from "lodash";

import ColumnLegendIcon from "../../icons/ColumnLegendIcon";
import ColumnStacked from "../ColumnStacked";

import { useTranslation } from "react-i18next";

const OutPutByFloor = (props) => {
  const { customStyle, setHeightChart, header, data, floor } = props;
  const [t] = useTranslation("global");
  const [outPut, setOutPut] = useState([]);

  useMemo(() => {
    const newOutput = [];

    data?.forEach((item) => {
      // const totalTarget = item.targetAssembly ? item.targetAssembly : 0;
      const totalTarget = item.targetAssembly2 ? item.targetAssembly2 : 0;

      const totalActual = item.actualAssembly
        ? _.sumBy(
            Object.keys(item.actualAssembly).map((key) => {
              return item.actualAssembly?.[key];
            })
          )
        : 0;

      const totalRemaining = totalTarget - totalActual;

      // console.log(totalTarget);

      newOutput.push({
        target: totalTarget,
        line: item.lineAlias,
        actual: totalActual,
        remaining: totalRemaining > 0 ? totalRemaining : 0,
      });
    });

    const sortedArray = newOutput?.sort((a, b) => {
      const lineA = parseInt(a.line.split("-")[1]);
      const lineB = parseInt(b.line.split("-")[1]);
      return lineA - lineB;
    });

    setOutPut(sortedArray);
  }, [data]);

  return (
    <Card customStyle={customStyle}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Title name={header} />
        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <ColumnLegendIcon
            name={t("production.output-by-floor-target")}
            color={"black"}
            customStyle={{ height: "0.5rem" }}
          />
          <ColumnLegendIcon
            name={t("production.output-by-floor-actual")}
            color={"#89b558"}
          />
          <ColumnLegendIcon
            name={t("production.output-by-floor-unreached")}
            color={"#fd5151"}
          />
        </Box>
      </Stack>

      {!data ? (
        <Box
          sx={{
            height: setHeightChart,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ColumnStacked
          setHeightChart={setHeightChart}
          display={true}
          data={outPut}
        />
      )}
    </Card>
  );
};

export default OutPutByFloor;
