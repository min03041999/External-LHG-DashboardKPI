import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const PieSimple = (props) => {
  const { data, setHeightChart } = props;

  return (
    <ResponsiveContainer width={"100%"} height={setHeightChart}>
      <PieChart>
        <Pie
          // isAnimationActive={false}
          data={data}
          dataKey="value"
          nameKey="name"
          label
          cx="50%"
          cy="50%"
          style={{ width: "100%", height: "100%" }}
          outerRadius={70}
        >
          {data?.map((entry, index) =>
            entry.value !== 0 ? (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ) : (
              <Cell key={`cell-${index}`} fill="transparent" />
            )
          )}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieSimple;
