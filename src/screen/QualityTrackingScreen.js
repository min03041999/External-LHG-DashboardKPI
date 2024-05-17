import React from "react";
import Breadcrumb from "../components/Breadcrumb";

const QualityTrackingScreen = () => {
  return (
    <React.Fragment>
      {/* <Breadcrumb factory={"LHG"}>Prod. Quality Tracking</Breadcrumb> */}
      <iframe
        src="http://192.168.30.19/Dashboard/#/quality-tracking"
        title="Quality Tracking"
        width="100%"
        height="880"
        style={{ marginTop: "10px" }}
      ></iframe>
    </React.Fragment>
  );
};

export default QualityTrackingScreen;
