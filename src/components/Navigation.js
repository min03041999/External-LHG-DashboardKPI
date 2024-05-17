import React, { useEffect, useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// import { format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";
import { factoryApi } from "../api/Factory/FactoryApi";

import { FACTORY } from "../utils/env";

import { useTranslation } from "react-i18next";

const ItemStyle = {
  width: "60px",
  border: "1px solid #95a4a7",
  color: "#fff",
  backgroundColor: "#95a4a7",
  padding: "11px 4px",
  textAlign: "center",
  borderRadius: "5px",
  cursor: "pointer",
};

const ItemActiveStyle = {
  width: "60px",
  border: "1px solid #049962",
  color: "#fff",
  backgroundColor: "#049962",
  padding: "11px 4px",
  textAlign: "center",
  borderRadius: "5px",
  cursor: "pointer",
};

// const FLOOR = ["A-F1", "A-F2", "A-F4", "B-F2", "C-F2", "D-F1", "D-F3"];

// const LINE = ["A1-1", "A1-2", "A1-3", "A1-4", "A1-5", "A1-6"];

const Navigation = (props) => {
  const { navigate, setNavigate, date, setDate, isState } = props;
  const [floor, setFloor] = useState([]);
  const [line, setLine] = useState([]);

  const [t] = useTranslation("global");
  const languages = localStorage.getItem("languages");

  const assembly_stitching = [
    {
      id: "assembly",
      name: t("navigation.assembly"),
    },
    {
      id: "stitching",
      name: t("navigation.stitching"),
    },
  ];

  useEffect(() => {
    const NavigationFloor = async () => {
      let res = await factoryApi.getFactoryApi();
      let floorArray =
        res.data.data?.map((item) => {
          return {
            floorId: item.floorId,
            floorAlias: item.floorAlias,
          };
        }) || [];

      // console.log(floorArray);

      let addFloor = [
        {
          floorId: "Auto Cutting",
          floorAlias: t("navigation.auto-cutting"),
        },
        {
          floorId: "Stock Fitting",
          floorAlias: t("navigation.stockfitting"),
        },
      ];

      if (date !== undefined) {
        setFloor([...floorArray, ...[]]);
      } else {
        setFloor([...floorArray, ...addFloor]);
      }
    };

    const NavigationLine = async (navigate) => {
      const { floor } = navigate;
      const res = await factoryApi.getFactoryApi();
      const getLine = res.data.data?.filter((item) => item.floorId === floor);
      const lineArray =
        getLine[0]?.lineList?.map((item) => item.lineAlias) || [];
      lineArray.sort((a, b) => {
        let numA = parseInt(a.split("-")[1]);
        let numB = parseInt(b.split("-")[1]);
        return numA - numB;
      });
      setLine(lineArray);
    };

    NavigationFloor();
    NavigationLine(navigate);
  }, [navigate, languages]);

  const onActiveFactory = (e) => {
    const factory = e.target.innerText;

    if (factory) {
      setNavigate({ ...navigate, floor: "", line: "", section: "" });
    }
  };

  const onActiveFloor = (floor) => {
    setNavigate({ ...navigate, floor: floor, line: "", section: "" });
  };

  const onActiveLine = (line) => {
    setNavigate({ ...navigate, line: line, section: "assembly" });
  };

  const onActiveSection = (section) => {
    setNavigate({ ...navigate, section: section });
  };

  return (
    <Box className="navigation">
      {/* Factory */}
      <Stack
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <div className="navigation-main">
          <Typography className="navigation-text">
            {t("navigation.factory")}
          </Typography>{" "}
          <ChevronRightIcon />
        </div>
        <div style={ItemActiveStyle}>
          <Typography
            className="navigation-text"
            onClick={
              isState
                ? onActiveFactory
                : () => {
                    console.log("factory");
                  }
            }
          >
            {FACTORY}
          </Typography>
        </div>
      </Stack>
      {/* Factory */}

      {/* FLOOR */}
      <Stack
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 2 }}
        sx={{ marginTop: "10px" }}
      >
        <div className="navigation-main">
          <Typography className="navigation-text">
            {t("navigation.floor")}
          </Typography>{" "}
          <ChevronRightIcon />
        </div>
        {floor?.map((item, index) => (
          <div
            style={
              navigate.floor === item.floorId ? ItemActiveStyle : ItemStyle
            }
            key={index}
            onClick={
              isState
                ? () => onActiveFloor(item.floorId)
                : () => console.log("floor")
            }
          >
            <Typography className="navigation-text">
              {item.floorAlias}
            </Typography>
          </div>
        ))}
      </Stack>
      {/* FLOOR */}

      {/* LINE */}
      <Stack
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 2 }}
        sx={{ marginTop: "10px" }}
      >
        <div className="navigation-main">
          <Typography className="navigation-text">
            {t("navigation.line")}
          </Typography>{" "}
          <ChevronRightIcon />
        </div>
        {line?.map((item, index) => (
          <div
            style={navigate.line === item ? ItemActiveStyle : ItemStyle}
            key={index}
            onClick={
              isState
                ? () => onActiveLine(item)
                : () => {
                    console.log("line");
                  }
            }
          >
            <Typography className="navigation-text">{item}</Typography>
          </div>
        ))}
      </Stack>
      {/* LINE */}

      {/* Date & Section */}
      {date && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 2 }}
          sx={{ marginTop: "10px" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="DateFrom"
              name="DateFrom"
              format="DD-MM-YYYY"
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              slotProps={{
                textField: {
                  size: "small",
                },
              }}
            />
          </LocalizationProvider>

          {navigate.line ? (
            <Stack
              direction={{ xs: "row", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
            >
              {assembly_stitching?.map((item, index) => (
                <div
                  style={
                    navigate.section === item.id
                      ? { ...ItemActiveStyle, width: "70px" }
                      : { ...ItemStyle, width: "70px" }
                  }
                  key={index}
                  onClick={
                    isState
                      ? () => onActiveSection(item.id)
                      : () => console.log("section")
                  }
                >
                  <Typography
                    className="navigation-text"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {item.name}
                  </Typography>
                </div>
              ))}
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      )}
      {/* Date & Section */}
    </Box>
  );
};

export default Navigation;
