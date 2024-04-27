import React, { useEffect, useState } from "react";
import Card from "../Card";
import Title from "../Title";
import DataTable from "../DataTable";
import PieSimple from "../PieSimple";
import PieLegendIcon from "../../icons/PieLegendIcon";

import {
  Stack,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from "@mui/material";
import moment from "moment";
import { stockFittingApi } from "../../api/StockFitting/stockFittingApi";
import { dataLine } from "../../data";
import { useTranslation } from "react-i18next";

const StoplineTop3Defect = (props) => {
  const { customStyle, header } = props;
  const [line, setLine] = useState(dataLine[0].line);
  const [stopLineTop3Defect, setStopLineTop3Defect] = useState([]);
  const date = moment();
  const fullDate = date.clone().format("YYYY-MM-DD");
  const [t] = useTranslation("global");

  const getStopLineTop3 = async (date, line) => {
    let res = await stockFittingApi.getStopLineTop3(date, line);
    setStopLineTop3Defect(res.data.data);
  };

  useEffect(() => {
    getStopLineTop3(fullDate, line);
  }, []);

  const handleChange = (event) => {
    setLine(event.target.value);
    getStopLineTop3(fullDate, event.target.value);
  };

  const DIVIDE_COLUMN = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10) / 2) - 30,
  };

  const DATA = [...stopLineTop3Defect];

  // const colorDefectName = ["red", "darkgreen", "yellow", "lightgreen"];
  // const colorPieChart = ["#5dd15b", "#46583e", "#ced11e", "#f33434"];

  const colorDefectName = ["#fb4343", "#fb852e", "#ffce54", "#a0d468"];
  const colorPieChart = ["#fb4343", "#fb852e", "#ffce54", "#a0d468"];

  const percentData = DATA?.map((item, index) => ({
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

  const HEADER_TABLE = [
    t("stockfitting.stopline-top-3-defect-name"),
    t("stockfitting.stopline-top-3-defect-action"),
    t("stockfitting.stopline-top-3-picture"),
  ];

  const CUSTOM_DATA = DATA?.map((item) => {
    return {
      name: (
        <span>
          {item.NameVit}
          <br />
          {item.NameEng}
        </span>
      ),
      action_name: item.Action_Plan,
      picture: item.Picture,
    };
  });

  return (
    <Card customStyle={customStyle}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="unset"
        spacing={2}
      >
        <Title name={header} />
        <Box
          component={"div"}
          sx={{
            minWidth: 80,
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              {t("stockfitting.stopline-top-3-defect-line")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={line}
              label="Line"
              onChange={handleChange}
              MenuProps={{
                getcontentanchorel: null,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                PaperProps: {
                  style: {
                    maxHeight: "200px", // Set the desired height for the dropdown list
                  },
                },
              }}
            >
              {dataLine?.map((item, index) => (
                <MenuItem key={index} value={item.line}>
                  {item.line}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Box component={"div"} {...DIVIDE_COLUMN} style={{ display: "flex" }}>
            <Grid container columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{ width: "100%", height: "100%" }}
              >
                <PieSimple
                  data={percentData}
                  setHeightChart={DIVIDE_COLUMN.height}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{ width: "100%", height: "100%" }}
              >
                {DATA?.map((item, index) => {
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
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component={"div"} {...DIVIDE_COLUMN}>
            <DataTable
              header={HEADER_TABLE}
              data={CUSTOM_DATA}
              customTableHeadStyle={{
                backgroundColor: "#337ab7",
                color: "#fff",
                padding: "5px",
              }}
              customTextStyle={{ color: "#049962", fontSize: "10px" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default StoplineTop3Defect;
