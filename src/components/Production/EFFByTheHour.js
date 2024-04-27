import React, { useMemo } from "react";
import Card from "../Card";
import Title from "../Title";
import LineLegendIcon from "../../icons/LineLegendIcon";
import { Stack, Box } from "@mui/material";
import LineActualIcon from "../../icons/LineActualIcon";

import { IS_TARGET_EFF_RFT } from "../../utils/base";
import LineTarget from "../LineTarget";

import { handleFakeEff, handleFakeModel } from "../../utils/helper";
import { OBJECT_TIME_RANGE } from "../../utils/times";

import { useTranslation } from "react-i18next";

const EFFByTheHour = (props) => {
  const {
    customStyle,
    setHeightChart,
    header,
    type,
    section,
    data,
    line,
    setGetEFF,
  } = props;
  const [t] = useTranslation("global");

  const effHours = useMemo(() => {
    const getDataLine = data?.find((item) => item.lineAlias === line);

    if (getDataLine) {
      const { worker, shoesData, actualAssembly, actualStitching } =
        getDataLine;

      const workers =
        section === "assembly" ? worker.assembly : worker.stitching;

      const laborCount =
        shoesData && shoesData.length > 0
          ? section === "assembly"
            ? shoesData[0].assemblyLc
            : shoesData[0].stitchingLc
          : 0;

      const actual = section === "assembly" ? actualAssembly : actualStitching;

      const myArr = [];
      const myKeys = Object.keys(OBJECT_TIME_RANGE);

      // console.log(workers, actual, laborCount);
      if (workers && actual && laborCount) {
        // console.log(workers, actual, laborCount);
        const keys = new Set(Object.keys(actual).slice(0, 9));
        for (let key of myKeys) {
          // Tinh Ideal Time
          const idealTime = (actual[key] * laborCount) / 233;

          const productionTime = workers;

          //chi dung co khach hang
          const effFake = parseFloat(
            ((idealTime / productionTime) * 100).toFixed(2)
          );

          // myArr.push({
          //   time: key,
          //   actual:
          //     keys.has(key) && productionTime !== 0
          //       ? handleFakeEff(line, effFake)
          //       : 0,
          // });

          //20240427
          const { shoesName } = shoesData[0];

          myArr.push({
            time: key,
            actual:
              keys.has(key) && productionTime !== 0
                ? handleFakeModel(shoesName)
                : 0,
          });
          //20240427
        }

        return myArr;
      }
    }
  }, [data, line, section]);

  useMemo(() => {
    const sum = effHours?.reduce((acc, value) => acc + (value?.actual || 0), 0);
    const count = effHours?.filter((value) => value?.actual !== 0).length;
    // console.log(Math.round(sum / (count || 1)));
    setGetEFF(sum ? Math.round(sum / (count || 1)) : 0);
  }, [effHours]);

  const transformed = effHours?.map((item) => {
    return {
      time: item.time,
      actual: item.actual,
      target:
        type === "eff"
          ? IS_TARGET_EFF_RFT.line.eff
          : IS_TARGET_EFF_RFT.line.rft[section],
    };
  });

  const target =
    type === "eff"
      ? IS_TARGET_EFF_RFT.line[type]
      : IS_TARGET_EFF_RFT.line[type][section];

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
          sx={{ display: "flex", gap: "5px", alignItems: "center" }}
        >
          <LineLegendIcon stroke={"#0d47a1"} />
          <span style={{ fontSize: "10px", fontWeight: "600" }}>
            {t("production.eff-by-the-hour-target")}
          </span>
          <LineActualIcon />
          <span style={{ fontSize: "10px", fontWeight: "600" }}>
            {t("production.eff-by-the-hour-actual")}
          </span>
        </Box>
      </Stack>

      <LineTarget
        setHeightChart={setHeightChart}
        data={transformed}
        ticks={target}
        domain={target}
      />
    </Card>
  );
};

export default EFFByTheHour;
