import React, { useEffect } from "react";
import Card from "../Card";
import Title from "../Title";
import DataTable from "../DataTable";

import PieSimple from "../PieSimple";
import PieLegendIcon from "../../icons/PieLegendIcon";

import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const Top3Defect = (props) => {
  const { header, data, line, setHeightChart } = props;
  const [t] = useTranslation("global");

  //   const colorDefectName = ["red", "darkgreen", "yellow", "lightgreen"];
  // const colorPieChart = ["#5dd15b", "#46583e", "#ced11e", "#f33434"];
  const colorDefectName = ["#fb4343", "#fb852e", "#ffce54", "#a0d468"];
  const colorPieChart = ["#fb4343", "#fb852e", "#ffce54", "#a0d468"];
  const percentData = data?.map((item, index) => ({
    name: `Defect ${index + 1}`,
    value: Math.round(Number(item.TQty?.replace("%", "") || 0)), // Use 0 if item.TQty is null
    fill: colorPieChart[index % colorPieChart.length],
  }));

  const totalValue = percentData.reduce((total, data) => total + data.value, 0);

  if (totalValue !== 100 && percentData.length > 0) {
    const lastItem = percentData[percentData.length - 1];
    const adjustment = 100 - totalValue;
    lastItem.value += adjustment;
  }

  if (totalValue > 100) {
    const excess = totalValue - 100;
    percentData[percentData.length - 1].value -= excess;
  }

  // const HEADER_TABLE = ["Defect Name", "Action plan & Follow up", "Picture"];
  const HEADER_TABLE = [
    `${t("production.stopline-top-3-defect-defect-name")}`,
    `${t("production.stopline-top-3-defect-action")}`,
    `${t("production.stopline-top-3-defect-picture")}`,
  ];

  const CUSTOM_DATA = data?.map((item) => {
    return {
      name: (
        <span>
          {item.NameVit}
          <br />
          {item.NameEng}
        </span>
      ),
      action_name: item.Action_Plan,
      picture: item.Picture
        ? `http://192.168.30.19:5000/qip-defect-photos/` + item.Picture
        : null,
    };
  });

  return (
    <Card>
      <Title name={header} />

      <Grid container columns={{ xs: 6, sm: 6, md: 12, lg: 12 }}>
        <Grid item xs={6} sm={6} md={6}>
          <Grid container columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{ width: "100%", height: "100%" }}
            >
              <PieSimple data={percentData} setHeightChart={setHeightChart} />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{ width: "100%", height: "100%" }}
            >
              {data?.map((item, index) => {
                const colorIndex = index % colorDefectName.length;

                return (
                  <PieLegendIcon
                    key={index}
                    color={`${colorDefectName[colorIndex]}`}
                    nameVN={item.NameVit}
                    nameEN={item.NameEng}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <DataTable
            header={HEADER_TABLE}
            data={CUSTOM_DATA}
            customTableHeadStyle={{
              backgroundColor: "#337ab7",
              color: "#fff",
              padding: "5px",
            }}
            customTextStyle={{ color: "#049962" }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Top3Defect;
