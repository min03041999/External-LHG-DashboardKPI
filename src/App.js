import { useState } from 'react';
import SideBar from "./components/SideBar";
import RoutesDashboard from "./config/RoutesDashboard";

import { Box } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const BodyStyle = {
  position: "relative",
  // transition: "0.2s",
}

const ToggleStyle = {
  position: "fixed",
  top: "23px",
  left: "60px",
  width: "30px",
  height: "30px",
  boder: "1px solid #4059F6",
  borderRadius: "14px",
  cursor: "pointer",
  backgroundColor: "#4059F6",
  color: "#fff",
  lineHeight: "8px",
  // transition: "0.2s",
}

function App() {
  const [open, setOpen] = useState(false);

  const bodyMargin = open ? "250px" : "75px";
  const leftToggle = open ? "235px" : "60px";

  return (
    <Box component={"div"}>
      <SideBar open={open} />
      <Box component="div" style={{ ...BodyStyle, marginLeft: bodyMargin }}>

        {/* Toggle */}
        <button style={{ ...ToggleStyle, left: leftToggle }} onClick={() => { setOpen(!open) }}>
          {open ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
        </button>

        <Box sx={{ padding: "0px 30px" }}>
          <RoutesDashboard />
        </Box>
      </Box>
    </Box >
  );
}

export default App;
