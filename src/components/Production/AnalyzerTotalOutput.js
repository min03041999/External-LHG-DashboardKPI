import _ from "lodash";
import React, { useMemo, useState } from "react";
import Card from "../Card";
import Title from "../Title";

import { Grid, Typography } from "@mui/material";

const AnalyzerTotalOutput = (props) => {
  const { customStyle, header, data, titleActual, titleTarget, section, line } =
    props;

  const [totalOutput, setTotalOutput] = useState({ actual: "", target: "" });

  useMemo(() => {
    if (section) {
      setTotalOutput({
        actual: data.actual,
        target: data.target,
      });
    } else {
      const totalActualOutPut = Math.round(
        _.sumBy(data, (obj) => obj.totalActualAssembly)
      );

      const totalTargetOutPut = Math.round(
        _.sumBy(data, (obj) => obj.targetAssembly)
      );
      // console.log(totalActualOutPut, totalTargetOutPut);
      setTotalOutput({
        actual: totalActualOutPut,
        target: totalTargetOutPut,
      });
    }
  }, [data, line, section]);

  return (
    <Card customStyle={customStyle}>
      <Title name={header} />
      <Grid container spacing={1} sx={{ marginTop: "5px" }}>
        <Grid item xs={6} sm={6} md={6} sx={{ alignSelf: "center" }}>
          <Typography
            sx={{ fontSize: "18px", fontWeight: "600", textAlign: "center" }}
          >
            {titleActual}
            <br />
            {Math.round(totalOutput.actual)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{ borderLeft: "2px solid #000", alignSelf: "center" }}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: "600", textAlign: "center" }}
          >
            {titleTarget}
            <br />
            {Math.round(totalOutput.target)}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AnalyzerTotalOutput;
