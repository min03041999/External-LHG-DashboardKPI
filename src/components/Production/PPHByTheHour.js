import _ from "lodash";
import React, { useMemo } from "react";
import Card from "../Card";
import Title from "../Title";
import { Stack, Box } from "@mui/material";
import LineLegendIcon from "../../icons/LineLegendIcon";

import { OBJECT_TIME_RANGE } from "../../utils/times";
import LineSimple from "../LineSimple";
import { useTranslation } from "react-i18next";

const PPHByTheHour = (props) => {
  const { customStyle, setHeightChart, header, data, section, line } = props;

  const [t] = useTranslation("global");

  const pphTheHour = useMemo(() => {
    const getDataLine = data?.find((item) => item.lineAlias === line);

    if (getDataLine) {
      const { worker, actualAssembly, actualStitching } = getDataLine;

      const actual = section === "assembly" ? actualAssembly : actualStitching;
      const worker_ =
        section === "assembly" ? worker.assembly : worker.stitching;

      if (actual && worker_) {
        const myArr = [];
        const myKeys = Object.keys(OBJECT_TIME_RANGE);
        const keys = new Set(Object.keys(actual).slice(0, 9));
        for (let key of myKeys) {
          const actualValue = worker_
            ? parseFloat((actual[key] / worker_).toFixed(1))
            : 0;
          myArr.push({
            time: key,
            actual:
              keys.has(key) && actualValue !== 0 && isFinite(actualValue)
                ? actualValue
                : 0,
          });
        }
        return myArr;
      }
    }
  }, [data, section, line]);

  // if (getDataLine) {
  //   const maxvalue = Math.max(...pphTheHour?.map((obj) => obj.actual));

  //   const domain = maxvalue !== 0 ? [0, maxvalue] : ["auto", "auto"];
  // }
  const maxValue = useMemo(() => {
    const max = _.max(pphTheHour?.map(({ target }) => target));
    return max !== 0 ? [0, max] : ["auto", "auto"];
  }, [pphTheHour]);

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
          <LineLegendIcon stroke={"#4caf50"} />
          <span style={{ fontSize: "10px", fontWeight: "600" }}>
            {t("production.pph-by-the-hour-target")}
          </span>
        </Box>
      </Stack>

      <LineSimple
        setHeightChart={setHeightChart}
        data={pphTheHour}
        domain={maxValue}
      />
    </Card>
  );
};

export default PPHByTheHour;
