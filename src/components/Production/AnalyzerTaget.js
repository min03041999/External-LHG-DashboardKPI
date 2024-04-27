import _ from "lodash";
import React from "react";
import Card from "../Card";
import Title from "../Title";
import { Typography, Box } from "@mui/material";

const AnalyzerTarget = (props) => {
  const { customStyle, header, type, target, data } = props;

  console.log(type, data);

  return (
    <Card customStyle={customStyle}>
      <Box component={"div"} className="analyzer-target">
        <Title name={header} />
        <Typography className="analyzer-target-actual">{data}</Typography>
        <Typography className="analyzer-target-purpose">{target}</Typography>
      </Box>
    </Card>
  );
};

export default AnalyzerTarget;
