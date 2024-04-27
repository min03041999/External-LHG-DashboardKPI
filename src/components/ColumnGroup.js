import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  Bar,
  LabelList,
} from "recharts";

import { COLUMN_GROUP_CONFIG } from "../utils/config";

const ColumnGroup = (props) => {
  const { setHeightChart, data } = props; // data_1: line, data_2: value (VD: stitching), data_3: value (VD: assembly)

  return (
    <ResponsiveContainer width="100%" height={setHeightChart}>
      <BarChart {...COLUMN_GROUP_CONFIG.BarChart} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis {...COLUMN_GROUP_CONFIG.XAxis} dataKey="line" />
        <Bar dataKey="stitching" fill="#82adf9" {...COLUMN_GROUP_CONFIG.Bar}>
          <LabelList dataKey="stitching" {...COLUMN_GROUP_CONFIG.LabelList} />
        </Bar>
        <Bar dataKey="assembly" fill="#8884d8" {...COLUMN_GROUP_CONFIG.Bar}>
          <LabelList dataKey="assembly" {...COLUMN_GROUP_CONFIG.LabelList} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColumnGroup;
