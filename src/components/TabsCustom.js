import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const TabsCustom = (props) => {
  const { tabs, children } = props;
  const [value, setValue] = useState(tabs[0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        {tabs?.map((item, index) => (
          <Tab value={item} key={index} label={item} />
        ))}
      </Tabs>
      {tabs?.map((item, index) => (
        <div
          key={index}
          style={item === value ? { display: "block" } : { display: "none" }}
        >
          {children[index]}
        </div>
      ))}
    </Box>
  );
};

export default TabsCustom;
