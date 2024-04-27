import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import { HEADER_LEATHER_SUMMARY, HEADER_MATQCCHECK } from "../../data";
import DataTable from "../DataTable";
import { tranformed_date } from "../../utils/transformed";

import { useTranslation } from "react-i18next";

function CustomTabPanel(props) {
  const { children, value, index } = props;

  return value === index && <React.Fragment>{children}</React.Fragment>;
}

function TabDailyKanbanStatus(props) {
  const { setHeight, dailyRequest, dailyIngrogress, dailyDone } = props;
  const [value, setValue] = React.useState(0);
  const [t] = useTranslation("global");

  const HEADER_DAILY_KANBAN_STATUS = [
    t("material-wh.daily-kaiban-status-dept"),
    t("material-wh.daily-kaiban-status-kaibanno"),
    t("material-wh.daily-kaiban-status-receive-date-request"),
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const DATA_REQUEST = dailyRequest?.map((data) => {
    return {
      DepName: data.DepName,
      KanbanNo: data.Kanban_no,
      ReceiveDateRequest: tranformed_date(data.Date) + " " + data.Hours,
    };
  });

  const DATA_IN_PROGRESS = dailyIngrogress?.map((data) => {
    return {
      DepName: data.DepName,
      KanbanNo: data.Kanban_no,
      ReceiveDateRequest: tranformed_date(data.Date) + " " + data.Hours,
    };
  });

  const DATA_DONE = dailyDone?.map((data) => {
    return {
      DepName: data.DepName,
      KanbanNo: data.Kanban_no,
      ReceiveDateRequest: tranformed_date(data.Date) + " " + data.Hours,
    };
  });

  const setHeightTable = {
    ...setHeight,
    height: parseFloat(parseInt(setHeight.height, 10) - 90),
  };

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
          <Tab label={t("material-wh.daily-kaiban-status-request")} />
          <Tab label={t("material-wh.daily-kaiban-status-in-progress")} />
          <Tab label={t("material-wh.daily-kaiban-status-done")} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DataTable
          header={HEADER_DAILY_KANBAN_STATUS}
          data={DATA_REQUEST}
          height={setHeightTable}
          customTableHeadStyle={{
            backgroundColor: "#bfbfbf",
            color: "#000",
            textAlign: "center",
          }}
          alignText="center"
          customTextStyle={{ whiteSpace: "nowrap", fontSize: 11 }}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DataTable
          header={HEADER_DAILY_KANBAN_STATUS}
          data={DATA_IN_PROGRESS}
          height={setHeightTable}
          customTableHeadStyle={{
            backgroundColor: "#ffce54",
            color: "#000",
            textAlign: "center",
          }}
          alignText="center"
          customTextStyle={{ whiteSpace: "nowrap", fontSize: 11 }}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <DataTable
          header={HEADER_DAILY_KANBAN_STATUS}
          data={DATA_DONE}
          height={setHeightTable}
          customTableHeadStyle={{
            backgroundColor: "#a0d468",
            color: "#000",
            textAlign: "center",
          }}
          alignText="center"
          customTextStyle={{ whiteSpace: "nowrap", fontSize: 11 }}
        />
      </CustomTabPanel>
    </Box>
  );
}

function TabDailyInspectionReport(props) {
  const { setHeight, leatherSumary, matQCCheck } = props;
  const [t] = useTranslation("global");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const HEADER_LEATHER_SUMMARY = [
    t("material-wh.daily-inspection-report-leather-receive-date"),
    t("material-wh.daily-inspection-report-leather-report-no"),
    t("material-wh.daily-inspection-report-leather-supplier"),
    t("material-wh.daily-inspection-report-leather-mat-id"),
    t("material-wh.daily-inspection-report-leather-mat-name"),
    t("material-wh.daily-inspection-report-leather-total-qty"),
    t("material-wh.daily-inspection-report-leather-inspection-qty"),
    t("material-wh.daily-inspection-report-leather-defect-qty"),
    t("material-wh.daily-inspection-report-leather-percent-defect"),
    t("material-wh.daily-inspection-report-leather-percent-released"),
    t("material-wh.daily-inspection-report-leather-inspection-result"),
    t("material-wh.daily-inspection-report-leather-inspection-date"),
  ];

  const HEADER_MATQCCHECK = [
    t("material-wh.daily-inspection-report-syn-receive-date"),
    t("material-wh.daily-inspection-report-syn-report-no"),
    t("material-wh.daily-inspection-report-syn-supplier"),
    t("material-wh.daily-inspection-report-syn-mat-id"),
    t("material-wh.daily-inspection-report-syn-mat-name"),
    t("material-wh.daily-inspection-report-syn-ry"),
    t("material-wh.daily-inspection-report-syn-art"),
    t("material-wh.daily-inspection-report-syn-total-qty"),
    t("material-wh.daily-inspection-report-syn-inspected-qty"),
    t("material-wh.daily-inspection-report-syn-defect-qty"),
    t("material-wh.daily-inspection-report-syn-inspection-result"),
    t("material-wh.daily-inspection-report-syn-test-result"),
    t("material-wh.daily-inspection-report-syn-final-result"),
    t("material-wh.daily-inspection-report-syn-inspection-date"),
  ];

  const DATA_LEATHER_SUMMARY = leatherSumary?.map((data) => {
    return {
      ReceiveDate: tranformed_date(data.ReceiveDate),
      ReportID: data.ReportID,
      SupplierName: data.SupplierName,
      MatID: data.MatID,
      MatName: data.MatName,
      Qty: data.Qty,
      InspecQty_Other: data.InspecQty_Other,
      DefectQty: data.DefectQty,
      Per_Defect: `${data.Per_Defect}%`,
      Per_Released: `${data.Per_Released}%`,
      InspectionResult: data.InspectionResult,
      QC_InspectionDate: tranformed_date(data.QC_InspectionDate),
    };
  });

  const DATA_MATQCCHECK = matQCCheck?.map((data) => {
    return {
      ReceivedDate: tranformed_date(data.ReceivedDate),
      Report_No: data.Report_No,
      SupplierName: data.SupplierName,
      MatID: data.MatID,
      MaterialName: data.MaterialName,
      RY: data.RY,
      Article: data.Article,
      Total_Qty: data.Total_Qty,
      Inspected_Qty: data.Inspected_Qty,
      DefectQty: data.DefectQty,
      Inspection_Result: data.Inspection_Result,
      Test_Result: data.Test_Result,
      Final_Status: data.Final_Status,
      QC_InspectionDate: tranformed_date(data.QC_InspectionDate),
    };
  });

  const setHeightTable = {
    ...setHeight,
    height: parseFloat(parseInt(setHeight.height, 10) - 90),
  };

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
          <Tab label={t("material-wh.daily-inspection-report-leather")} />
          <Tab label={t("material-wh.daily-inspection-report-syn")} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DataTable
          header={HEADER_LEATHER_SUMMARY}
          data={DATA_LEATHER_SUMMARY}
          height={setHeightTable}
          customTableHeadStyle={{
            bgcolor: "#337ab7",
            color: "#fff",
            textAlign: "center",
          }}
          alignText="center"
          customTextStyle={{ whiteSpace: "nowrap", fontSize: 11 }}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DataTable
          header={HEADER_MATQCCHECK}
          data={DATA_MATQCCHECK}
          height={setHeightTable}
          customTableHeadStyle={{
            bgcolor: "#337ab7",
            color: "#fff",
            textAlign: "center",
          }}
          alignText="center"
          customTextStyle={{ whiteSpace: "nowrap", fontSize: 11 }}
        />
      </CustomTabPanel>
    </Box>
  );
}

export { TabDailyInspectionReport, TabDailyKanbanStatus };
