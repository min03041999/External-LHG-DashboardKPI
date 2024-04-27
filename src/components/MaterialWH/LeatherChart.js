import React from "react";
import PieSimple from "../PieSimple";

// const chartLeather = [
//   {
//     fill: "#fc6e51",
//     name: "inspection",
//     value: 10,
//   },
//   {
//     fill: "#a0d468",
//     name: "pass",
//     value: 9,
//   },
//   {
//     fill: "#fb4343",
//     name: "fail",
//     value: 20,
//   },
// ];

export default function LeatherChart({ setHeightChart, leatherChart }) {
  return <PieSimple data={leatherChart} setHeightChart={setHeightChart} />;
}
