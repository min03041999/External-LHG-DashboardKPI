import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import { FINISH_GOOD_WH, HEADER_SHIPPING_SCHEDULE } from "../../data";
import DataTable from "../DataTable";
import moment from "moment";
import { fgwhApi } from "../../api/FGWH/fgwhApi";

import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index } = props;

  return value === index && <React.Fragment>{children}</React.Fragment>;
}

function TabShippingSchedule(props) {
  const { setHeightTable } = props;
  const [value, setValue] = useState(0);
  const [shippings, setShippings] = useState([]);
  const [t] = useTranslation("global");

  const today = moment();
  //check pass sunday
  let currentDate = today.clone().format("DD/MM");
  let currentDateFull = today.clone().format("YYYY/MM/DD");
  let date1 = today.clone().add(1, "days").format("DD/MM");
  let date1Full = today.clone().add(1, "days").format("YYYY/MM/DD");
  let date2 = today.clone().add(2, "days").format("DD/MM");
  let date2Full = today.clone().add(2, "days").format("YYYY/MM/DD");

  if (today.clone().day() === 5) {
    date2 = today.clone().add(3, "days").format("DD/MM");
    date2Full = today.clone().add(3, "days").format("YYYY/MM/DD");
  }

  if (today.clone().day() === 6) {
    date1 = today.clone().add(2, "days").format("DD/MM");
    date1Full = today.clone().add(2, "days").format("YYYY/MM/DD");
    date2 = today.clone().add(3, "days").format("DD/MM");
    date2Full = today.clone().add(3, "days").format("YYYY/MM/DD");
  }

  const getShippings = async (date) => {
    let res = await fgwhApi.getShippings(date);
    setShippings(res.data.data);
  };

  useEffect(() => {
    getShippings(currentDateFull);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    let date = "";
    switch (newValue) {
      case 0: {
        date = currentDateFull;
        break;
      }
      case 1: {
        date = date1Full;
        break;
      }
      case 2: {
        date = date2Full;
        break;
      }
      default:
        date = "";
        break;
    }
    // console.log(date);
    getShippings(date);
  };

  const DATA_SHIPPING_SCHEDULE = shippings?.map((data) => {
    return {
      RY: data.RY,
      PO: data.PO,
      MODEL_NAME: data.MODEL_NAME,
      ARTICLE: data.ARTICLE,
      COUNTRY: data.COUNTRY,
      QTY: data.QTY,
      SCAN: data.SCAN,
      UNSCAN: data.UNSCAN,
      FGT: data.FGT,
      BONDING: data.BONDING,
      CMA: data.CMA,
      A01: data.A01,
      CPSIA: data.CPSIA,
      RESULT: data.RESULT,
      FG_STATUS: data.FG_STATUS,
      LINE: data.LINE,
      LOCATION: data.LOCATION,
      SHIPPED_STATUS: data.SHIPPED_STATUS,
    };
  });

  // console.log(DATA_SHIPPING_SCHEDULE);

  const HEADER_SHIPPING_SCHEDULE = [
    t("fg-w-h.shipping-schedule-ry"),
    t("fg-w-h.shipping-schedule-po"),
    t("fg-w-h.shipping-schedule-model-name"),
    t("fg-w-h.shipping-schedule-article"),
    t("fg-w-h.shipping-schedule-contry"),
    t("fg-w-h.shipping-schedule-qty"),
    t("fg-w-h.shipping-schedule-scan-qty"),
    t("fg-w-h.shipping-schedule-unscan"),
    t("fg-w-h.shipping-schedule-fgt"),
    t("fg-w-h.shipping-schedule-bonding"),
    t("fg-w-h.shipping-schedule-cma"),
    t("fg-w-h.shipping-schedule-a01"),
    t("fg-w-h.shipping-schedule-cpsia"),
    t("fg-w-h.shipping-schedule-result"),
    t("fg-w-h.shipping-schedule-fg-status"),
    t("fg-w-h.shipping-schedule-line"),
    t("fg-w-h.shipping-schedule-location"),
    t("fg-w-h.shipping-schedule-shipped-status"),
  ];
  return (
    <Box sx={{ width: "100%", height: "93%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          marginBottom: "3px",
        }}
      >
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label={currentDate} />
          <Tab label={date1} />
          <Tab label={date2} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {!DATA_SHIPPING_SCHEDULE.length ? (
          <Box
            sx={{
              height: setHeightTable,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataTable
            header={HEADER_SHIPPING_SCHEDULE}
            data={DATA_SHIPPING_SCHEDULE}
            height={setHeightTable}
            customTableHeadStyle={{
              bgcolor: "#337ab7",
              color: "#fff",
              textAlign: "center",
            }}
            customTextStyle={{ whiteSpace: "nowrap" }}
            alignText="center"
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {!DATA_SHIPPING_SCHEDULE.length ? (
          <Box
            sx={{
              height: setHeightTable,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataTable
            header={HEADER_SHIPPING_SCHEDULE}
            data={DATA_SHIPPING_SCHEDULE}
            height={setHeightTable}
            customTableHeadStyle={{
              bgcolor: "#337ab7",
              color: "#fff",
              textAlign: "center",
            }}
            customTextStyle={{ whiteSpace: "nowrap" }}
            alignText="center"
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {!DATA_SHIPPING_SCHEDULE.length ? (
          <Box
            sx={{
              height: setHeightTable,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataTable
            header={HEADER_SHIPPING_SCHEDULE}
            data={DATA_SHIPPING_SCHEDULE}
            height="100%"
            customTableHeadStyle={{
              bgcolor: "#337ab7",
              color: "#fff",
              textAlign: "center",
            }}
            customTextStyle={{ whiteSpace: "nowrap" }}
            alignText="center"
          />
        )}
      </CustomTabPanel>
    </Box>
  );
}

export { TabShippingSchedule };
