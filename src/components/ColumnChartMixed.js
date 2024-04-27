import React from "react";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  LabelList,
  Cell,
} from "recharts";

// Config Chart
import { COLUMN_CHART_MIXED_CONFIG } from "../utils/config.js";

const ColumnChartMixed = (props) => {
  const { setHeightChart, data, is_target, is_not_target, ticks } = props; // Data data_1: line, data_2: value (rft, eff), data_3: target

  return (
    <ResponsiveContainer width="100%" height={setHeightChart}>
      <ComposedChart {...COLUMN_CHART_MIXED_CONFIG.ComposedChart} data={data}>
        <XAxis dataKey="data_1" {...COLUMN_CHART_MIXED_CONFIG.XAxis} />
        <YAxis ticks={ticks} {...COLUMN_CHART_MIXED_CONFIG.YAxis} />
        <Bar dataKey="data_2" {...COLUMN_CHART_MIXED_CONFIG.Bar}>
          <LabelList
            dataKey="data_2"
            {...COLUMN_CHART_MIXED_CONFIG.LabelList}
          />
          {data?.map((item, index) => {
            const { data_3, data_2 } = item;
            const fill = data_2 && data_2 >= data_3 ? is_target : is_not_target;
            return <Cell key={index} fill={fill} />;
          })}
        </Bar>
        <Line dataKey="data_3" {...COLUMN_CHART_MIXED_CONFIG.Line} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ColumnChartMixed;
