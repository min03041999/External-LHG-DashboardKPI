import React, { useState, useEffect } from "react";
import Card from "../Card";
import Title from "../Title";

import { Grid, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

const AnalyzerAttendance = (props) => {
  const { customStyle, header, data, line, section } = props;
  const [attendance, setAttendance] = useState({ actual: 0, target: 0 });
  const [t] = useTranslation("global");

  useEffect(() => {
    const getDataLine = data?.find((item) => item.lineAlias === line);

    if (getDataLine) {
      const { worker } = getDataLine;
      setAttendance({ actual: worker.assembly, target: worker.stitching });
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
            {t("production.attendance-actual")}
            <br />
            {attendance.actual}
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
            {t("production.attendance-target")}
            <br />
            {attendance.target}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AnalyzerAttendance;
