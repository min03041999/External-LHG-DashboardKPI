import React, { useEffect, useMemo, useState } from "react";
import Card from "../Card";
import Title from "../Title";
import { Stack, Box } from "@mui/material";

import LineLegendIcon from "../../icons/LineLegendIcon";
import ThreeToneLegendIcon from "../../icons/ThreeToneLegendIcon";

import { OBJECT_TIME_RANGE } from "../../utils/times";
import ColumnSimple from "../ColumnSimple";
import { useTranslation } from "react-i18next";
import { handleOutPutHour } from "../../utils/helper";
import _ from "lodash";
const OutPutTheHour = (props) => {
  const {
    customStyle,
    setHeightChart,
    header,
    section,
    data,
    line,
    floor,
    setTotalOuput,
  } = props;
  const [t] = useTranslation("global");

  // const [target, setTarget] = useState();

  const outPutHour = useMemo(() => {
    const getDataLine = data?.find((item) => item.lineAlias === line);

    if (getDataLine) {
      const {
        plannedWorkingHours,
        targetAssembly,
        targetStitching,
        actualAssembly,
        actualStitching,
      } = getDataLine;

      const actual = section === "assembly" ? actualAssembly : actualStitching;
      const target = section === "assembly" ? targetAssembly : targetStitching;

      // const myTarget =
      //   target && plannedWorkingHours && plannedWorkingHours !== 0
      //     ? Math.ceil(target / 9)
      //     : 0;

      // setTarget(myTarget);

      const myKeys = Object.keys(OBJECT_TIME_RANGE);
      const keys = new Set(Object.keys(actual).slice(0, 9));

      // return Object.entries(myKeys)?.map(([key, value]) => ({
      //   time: value,
      //   actual: data && keys.has(value) ? actual[key] : 0,
      //   target: floor === "D-F3" ? 90 : 140,
      // }));

      return Object.entries(myKeys)?.map(([key, value]) => ({
        time: value,
        actual: data && keys.has(value) ? actual[value] : 0,
        target: floor === "D-F3" ? 90 : 140,
      }));
    }
  }, [data, line, section]);

  // console.log(outPutHour);

  const ticks =
    outPutHour[0]?.target !== 0 ? [outPutHour[0]?.target] : ["auto", "auto"];
  const domain =
    outPutHour[0]?.target !== 0 ? [0, outPutHour[0]?.target] : ["auto", "auto"];

  useMemo(() => {
    const target = outPutHour?.reduce(
      (acc, value) => acc + (value?.target || 0),
      0
    );
    const actual = outPutHour?.reduce(
      (acc, value) => acc + (value?.actual || 0),
      0
    );

    setTotalOuput({ target: target, actual: actual });
  }, [outPutHour]);
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
          <LineLegendIcon stroke={"#0d47a1"} />
          <span style={{ fontSize: "10px", fontWeight: "600" }}>
            {t("production.output-by-the-hour-target")}
          </span>
          <ThreeToneLegendIcon
            firstColor={"#2e7d32"}
            secondColor={"#ef6c00"}
            thirdColor={"#c62828"}
          />
          <span style={{ fontSize: "10px", fontWeight: "600" }}>
            {t("production.output-by-the-hour-actual")}
          </span>
        </Box>
      </Stack>

      <ColumnSimple
        setHeightChart={setHeightChart}
        data={outPutHour}
        ticks={ticks}
        domain={domain}
      />
    </Card>
  );
};

export default OutPutTheHour;
