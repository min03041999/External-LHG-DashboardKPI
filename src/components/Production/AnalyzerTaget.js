import _ from "lodash";
import React, { useEffect, useState } from "react";
import Card from "../Card";
import Title from "../Title";
import { Typography, Box } from "@mui/material";

const AnalyzerTarget = (props) => {
  const { customStyle, header, type, target, line, data } = props;
  const [value, setValue] = useState("0%");

  useEffect(() => {
    if (line) {
      const getDataLine = data?.find((item) => item.lineAlias === line);
      if (getDataLine) {
        const { efficiency, quality } = getDataLine;
        console.log(efficiency, quality);
        if (type === "eff") {
          setValue(`${efficiency}%`);
        } else {
          setValue(`${quality}%`);
        }
      }
    } else {
      setValue(data);
    }
  }, [data, line]);

  return (
    <Card customStyle={customStyle}>
      <Box component={"div"} className="analyzer-target">
        <Title name={header} />
        <Typography className="analyzer-target-actual">{value}</Typography>
        <Typography className="analyzer-target-purpose">{target}</Typography>
      </Box>
    </Card>
  );
};

export default AnalyzerTarget;
