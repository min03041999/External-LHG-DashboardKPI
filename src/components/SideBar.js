import * as React from "react";
import { List, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import Icon_Production from "../assets/Image/Icon-Production.png";
import Icon_Auto_Cutting from "../assets/Image/Icon-Auto-Cutting.png";
import Icon_StockFitting from "../assets/Image/Icon-StockFitting.png";
import Icon_Kaizen from "../assets/Image/Icon-Kaizen.png";
import Icon_Tier_Meeting from "../assets/Image/Icon-Tier-Meeting.png";
import Icon_Material from "../assets/Image/Icon-Material.png";
import Icon_Quality_Tracking from "../assets/Image/Icon-Quality-Tracking.png";
import Icon_FG from "../assets/Image/Icon-FG.png";
import Icon_Down_Time from "../assets/Image/Icon-Down-Time.png";

import { useTranslation } from "react-i18next";

const SideBarStyle = {
  position: "fixed",
  height: "100vh",
  backgroundColor: "#25364b",
  boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
  overflow: "hidden",
  // transition: "0.2s"
};

const HeaderSideBarStyle = {
  height: "70px",
  color: "#fff",
  textTransform: "uppercase",
  textAlign: "center",
  fontSize: "22px",
  lineHeight: "80px",
};

const NoActiveStyle = {
  fontSize: "16px",
  color: "#fff",
  padding: "20px",
};

const ActiveStyle = {
  padding: "20px",
  borderLeft: "5px solid #fff",
  backgroundColor: "#1d2b3c",
  transition: "0.3s",
};

const SideBar = (props) => {
  const { open } = props;

  const [t] = useTranslation("global");
  const sideMenu = [
    {
      icon: (
        <img
          src={Icon_Production}
          alt="icon"
          width={35}
          height={35}
          style={{
            objectFit: "cover",
            filter: "drop-shadow(2px 4px 6px black)",
          }}
        />
      ),
      text: t("sidebar.production"),
      path: "/",
    },
    {
      icon: (
        <img
          src={Icon_Material}
          alt="icon"
          width={30}
          height={30}
          style={{
            objectFit: "cover",
            filter: "drop-shadow(2px 4px 6px black)",
          }}
        />
      ),
      text: t("sidebar.material-w-h"),
      path: "/material",
    },
    {
      icon: (
        <img
          src={Icon_Auto_Cutting}
          alt="icon"
          width={30}
          height={30}
          style={{
            objectFit: "cover",
            filter: "drop-shadow(2px 4px 6px black)",
          }}
        />
      ),
      text: t("sidebar.auto-cutting"),
      path: "/auto-cutting",
    },
    {
      icon: (
        <img
          src={Icon_StockFitting}
          alt="icon"
          width={30}
          height={30}
          style={{
            objectFit: "cover",
            filter: "drop-shadow(2px 4px 6px black)",
          }}
        />
      ),
      text: t("sidebar.stockfitting"),
      path: "/stockfitting",
    },
    {
      icon: (
        <img
          src={Icon_FG}
          alt="icon"
          width={30}
          height={30}
          style={{
            objectFit: "cover",
            filter: "drop-shadow(2px 4px 6px black)",
          }}
        />
      ),
      text: t("sidebar.fg-w-h"),
      path: "/fg-wh",
    },
    {
      icon: (
        <img
          src={Icon_Kaizen}
          alt="icon"
          width={30}
          height={30}
          style={{
            objectFit: "cover",
            filter: "drop-shadow(2px 4px 6px black)",
          }}
        />
      ),
      text: t("sidebar.kaizen"),
      path: "/kaizen",
    },
    {
      icon: (
        <img
          src={Icon_Tier_Meeting}
          alt="icon"
          width={30}
          height={30}
          style={{
            objectFit: "cover",
            filter: "drop-shadow(2px 4px 6px black)",
          }}
        />
      ),
      text: t("sidebar.tier-meeitng"),
      path: "/tier-meeting",
    },
    {
      icon: (
        <img
          src={Icon_Down_Time}
          alt="icon"
          width={30}
          height={30}
          style={{
            objectFit: "cover",
            filter: "drop-shadow(2px 4px 6px black)",
          }}
        />
      ),
      text: t("sidebar.downtime"),
      path: "/downtime",
    },
    {
      icon: (
        <img
          src={Icon_Quality_Tracking}
          alt="icon"
          width={30}
          height={30}
          style={{
            objectFit: "cover",
            filter: "drop-shadow(2px 4px 6px black)",
          }}
        />
      ),
      text: t("sidebar.quality-tracking"),
      path: "/quality-tracking",
    },
  ];

  const sidebarWidth = open ? "250px" : "75px";
  const { pathname } = useLocation();
  const active = sideMenu.findIndex((e) => e.path === pathname);

  return (
    <div style={{ ...SideBarStyle, width: sidebarWidth }}>
      <Typography style={HeaderSideBarStyle}>
        LHG {open ? t("sidebar.dashboard") : ""}
      </Typography>

      {/* List Menu */}
      <List component="nav">
        {sideMenu?.map((listItem, index) => (
          <ListItemButton
            component={Link}
            to={listItem.path}
            key={index}
            sx={active === index ? ActiveStyle : NoActiveStyle}
          >
            <ListItemIcon
              sx={{
                color: "#fff",
                fontSize: "16px",
              }}
            >
              {listItem.icon}
            </ListItemIcon>
            {open ? (
              <Typography
                sx={{
                  fontSize: "15px",
                  color: "#fff",
                  letterSpacing: "1.5px",
                }}
              >
                {listItem.text}
              </Typography>
            ) : (
              ""
            )}
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default SideBar;
