import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductionScreen from "../screen/ProductionScreen";
import MaterialScreen from "../screen/MaterialScreen";
import AutoCuttingScreen from "../screen/AutoCuttingScreen";
import StockFittingScreen from "../screen/StockFittingScreen";
import FGWHScreen from "../screen/FGWHScreen";
import KaizenScreen from "../screen/KaizenScreen";
import TierMeetingScreen from "../screen/TierMeetingScreen";
import QualityTrackingScreen from "../screen/QualityTrackingScreen";
import DowntimeScreen from "../screen/DowntimeScreen";

const RoutesDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductionScreen />} />
      <Route path="/material" element={<MaterialScreen />} />
      <Route path="/auto-cutting" element={<AutoCuttingScreen />} />
      <Route path="/stockfitting" element={<StockFittingScreen />} />
      <Route path="/fg-wh" element={<FGWHScreen />} />
      <Route path="/kaizen" element={<KaizenScreen />} />
      <Route path="/tier-meeting" element={<TierMeetingScreen />} />
      <Route path="/quality-tracking" element={<QualityTrackingScreen />} />
      <Route path="/downtime" element={<DowntimeScreen />} />
    </Routes>
  );
};

export default RoutesDashboard;
