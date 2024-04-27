import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Box } from "@mui/material";
import { TabTierMeeting } from "../components/TierMeeting/TabTierMeeting";
import Card from "../components/Card";
import { tierMeetingApi } from "../api/TierMeeting/tierMeetingApi";

import { useTranslation } from "react-i18next";

const TierMeetingScreen = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [tierMeetingData, setTierMeetingData] = useState([]);
  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getTierMeeting = async () => {
      let res = await tierMeetingApi.getTierMeeting();
      setTierMeetingData(res.data.data);
    };
    getTierMeeting();
  }, []);

  const SET_FULL_SCREEN_LAPTOP = { height: `${screenHeight - 70}px` };

  const [t] = useTranslation("global");

  // console.log(tierMeetingData);

  return (
    <Box component={"div"} className="tier-meeting-screen">
      <Box component={"div"}>
        <Breadcrumb>{t("tier-meeting.name")}</Breadcrumb>
      </Box>

      <Box
        component={"div"}
        className="tier-meeting-screen-body"
        sx={{ flexGrow: 1 }}
      >
        <Card customStyle={SET_FULL_SCREEN_LAPTOP}>
          <TabTierMeeting
            setHeight={SET_FULL_SCREEN_LAPTOP}
            tierMeetingData={tierMeetingData}
          />
        </Card>
      </Box>
    </Box>
  );
};

export default TierMeetingScreen;
