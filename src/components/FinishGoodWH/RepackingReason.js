import React from "react";
import Card from "../Card";
import Title from "../Title";
import { Box, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";
// import { FINISH_GOOD_WH } from "../../data";
import { useTranslation } from "react-i18next";
import FadeInNumber from "../../utils/animation";
const colors = ["#fb4343", "#a0d468", "#ffce54", "#118dff", "#ff5d5d"];

const RepackingReason = (props) => {
  const { customStyle, header, fgwhData } = props;
  const [t] = useTranslation("global");

  // console.log(fgwhData);
  const setHeight = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10) - 100),
  };

  return (
    <Card customStyle={customStyle}>
      <Title name={header} customStyle={{ textAlign: "center" }} />
      <Typography
        variant="h4"
        component="h4"
        fontWeight={500}
        textAlign={"center"}
      >
        <FadeInNumber n={fgwhData.repackingReason.po.total} /> PO
      </Typography>
      <Box width="100%" height={setHeight} display="flex">
        <Box width="60%" height="100%">
          <ResponsiveContainer width="100%" height={"105%"}>
            <BarChart
              data={fgwhData.repackingReason.defects}
              margin={{ top: 20, bottom: 35 }}
            >
              <Bar dataKey="qty">
                {fgwhData.repackingReason.defects?.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                ))}
                <LabelList
                  dataKey="qty"
                  position="top"
                  fontSize={11}
                  fill="#000"
                  fontWeight={600}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box width="40%" display={"flex"} flexDirection={"column"} gap={2}>
          {fgwhData.repackingReason.defects?.map((data, index) => (
            <Box display={"flex"} alignItems={"flex-start"} gap={1} key={index}>
              <Box
                width={"2rem"}
                height={"0.7rem"}
                bgcolor={colors[index]}
              ></Box>
              <Box fontSize={"0.7rem"} fontWeight={"700"} flex={2}>
                {data?.defectName}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Typography fontWeight={500} textAlign={"center"}>
        {t("fg-w-h.repacking-reason-top-5")}
      </Typography>
    </Card>
  );
};

export default RepackingReason;
