import React from "react";
// import Card from "./Card";
// import Title from "./Title";
// import { Stack, Box } from "@mui/material";

// import ColumnLegendIcon from "../icons/ColumnLegendIcon";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  LabelList,
} from "recharts";

import { COLUMN_STACKED_CONFIG } from "../utils/config";

const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  const rectHeight = 5;
  const rectWidth = width / 2;

  return (
    <>
      <text
        x={x + width / 2}
        y={y - 10}
        fill="black"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {value}
      </text>
      <rect
        x={x + rectWidth / 2}
        y={y - rectHeight / 2}
        width={rectWidth}
        height={rectHeight}
      ></rect>
    </>
  );
};

const ColumnStacked = (props) => {
  const { setHeightChart, display, data } = props;

  const transformed = data?.map((item) => {
    const remaining = item.remaining;
    if (remaining <= 0) {
      return {
        line: item.line,
        target: item.target,
        actual: item.actual,
      };
    } else {
      return {
        line: item.line,
        target: item.target,
        actual: item.actual,
        remaining: remaining,
      };
    }
  });

  return (
    <ResponsiveContainer width="100%" height={setHeightChart}>
      <BarChart {...COLUMN_STACKED_CONFIG.BarChart} data={transformed}>
        <CartesianGrid {...COLUMN_STACKED_CONFIG.CartesianGrid} />
        <XAxis dataKey="line" {...COLUMN_STACKED_CONFIG.XAxis} />

        {display ? <YAxis {...COLUMN_STACKED_CONFIG.YAxis} /> : ""}
        <Bar
          // isAnimationActive={false}
          dataKey={"target"}
          barSize={0}
          display={"none"}
        />
        <Bar
          // isAnimationActive={false}
          dataKey="actual"
          stackId="line"
          fill="#89b558"
          barSize={30}
        >
          <LabelList
            dataKey="actual"
            {...COLUMN_STACKED_CONFIG.LabelList}
            fill={"white"}
          />
        </Bar>
        <Bar
          // isAnimationActive={false}
          dataKey="remaining"
          stackId="line"
          fill="#fb4343"
          barSize={30}
        >
          <LabelList
            dataKey="remaining"
            {...COLUMN_STACKED_CONFIG.LabelList}
            fill={"white"}
          />
          <LabelList
            dataKey="target"
            offset={20}
            content={renderCustomizedLabel}
            {...COLUMN_STACKED_CONFIG.LabelList}
            position={"top"}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColumnStacked;
