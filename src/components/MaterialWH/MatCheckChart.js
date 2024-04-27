import React from "react";
import PieSimple from "../PieSimple";

// const chartMatCheck = [
//   {
//     name: "Inspection",
//     fill: "#fc6e51",
//     value: 3,
//   },
//   {
//     name: "Pass",
//     fill: "#a0d468",
//     value: 5,
//   },
//   {
//     name: "Fail",
//     fill: "#fb4343",
//     value: 7,
//   },
//   {
//     name: "Waiting for lab",
//     fill: "#ffce54",
//     value: 9,
//   },
// ];

export default function MatCheckChart({ setHeightChart, matCheckChart }) {
  return <PieSimple data={matCheckChart} setHeightChart={setHeightChart} />;
}
