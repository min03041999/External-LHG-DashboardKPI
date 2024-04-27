import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import DataTable from "../DataTable";
import {
  DATA_MECHANIC_REPAIRING_TIME,
  HEADER_MECHANIC_REPAIRING_TIME,
} from "../../data";

function CustomTabPanel(props) {
  const { children, value, index } = props;

  return value === index && <React.Fragment>{children}</React.Fragment>;
}

const TabMechanicList = (props) => {
  const { setHeight } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          <Tab label="Electrical" />
          <Tab label="Sewing" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DataTable
          header={HEADER_MECHANIC_REPAIRING_TIME}
          data={DATA_MECHANIC_REPAIRING_TIME}
          height={setHeightTable}
          customTableHeadStyle={{
            backgroundColor: "#118dff",
            color: "#fff",
            textAlign: "center",
          }}
          alignText="center"
          customTextStyle={{ whiteSpace: "nowrap", fontSize: 11 }}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DataTable
          header={HEADER_MECHANIC_REPAIRING_TIME}
          data={DATA_MECHANIC_REPAIRING_TIME}
          height={setHeightTable}
          customTableHeadStyle={{
            backgroundColor: "#f09538",
            color: "#fff",
            textAlign: "center",
          }}
          alignText="center"
          customTextStyle={{ whiteSpace: "nowrap", fontSize: 11 }}
        />
      </CustomTabPanel>
    </Box>
  );
};

export default TabMechanicList;
