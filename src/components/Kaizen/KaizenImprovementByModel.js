import React, { useEffect, useState } from "react";
import Card from "../Card";
import Title from "../Title";
import Category from "../Category";

import { Grid, Stack, Button, Box, Typography } from "@mui/material";
import PDFViewer from "../PDFViewer";

const KAIZEN_MODEL_LHG = [
  // {
  //   name: "CAMPUS 00S CF EL I",
  //   link: "http://192.168.30.19/dashboard/KaizenCloud/CAMPUS%2000S%20CF%20EL%20I.pdf",
  // },
  // {
  //   name: "CAMPUS 00S CF EL C",
  //   link: "http://192.168.30.19/dashboard/KaizenCloud/CAMPUS%2000S%20CF%20EL%20C.pdf",
  // },
  {
    name: "CAMPUS 00S",
    link: "http://192.168.30.19/dashboard/KaizenCloud/CAMPUS%2000s.pdf",
  },
  {
    name: "COURT 24",
    link: "http://192.168.30.19/dashboard/KaizenCloud/COURT%2024.pdf",
  },
  {
    name: "CRAZYFLIGHT 5",
    link: "http://192.168.30.19/dashboard/KaizenCloud/CRAZYFLIGHT%205.pdf",
  },
  {
    name: "DON ISSUE 6",
    link: "http://192.168.30.19/dashboard/KaizenCloud/DON%20ISSUE%206.pdf",
  },
  {
    name: "GRAND COURT PLATFORM SUEDE",
    link: "http://192.168.30.19/dashboard/KaizenCloud/GRAND%20COURT%20PLATFORM%20SUEDE.pdf",
  },
  {
    name: "NOVAFLIGHT 2M",
    link: "http://192.168.30.19/dashboard/KaizenCloud/NOVAFLIGHT%202M.pdf",
  },
  {
    name: "SAMBA DECO SPZL",
    link: "http://192.168.30.19/dashboard/KaizenCloud/SAMBA%20DECO%20SPZL.pdf",
  },
  {
    name: "SAMBA LT",
    link: "http://192.168.30.19/dashboard/KaizenCloud/SAMBA%20LT.pdf",
  },
];

const KAIZEN_MODEL_LVL = [
  {
    name: "SAMBA",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20SAMBA.pdf",
  },
  {
    name: "COURTJAM CONTROL 3 MWCL",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20COURTJAM%20CONTROL%203%20MWCL.pdf",
  },
  {
    name: "GAZELLE INDOOR",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20GAZELLE%20INDOOR.pdf",
  },
  {
    name: "A.E. 1",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20A.E.%201.pdf",
  },
  {
    name: "ACTIVERIDE 2.0 J",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20ACTIVERIDE%202.0%20J.pdf",
  },
  {
    name: "BARRICADE M",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20BARRICADE%20M.pdf",
  },
  {
    name: "CLOT GAZELLE BY EC",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20CLOT%20GAZELLE%20BY%20EC.pdf",
  },
  {
    name: "CRAZY 98",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20CRAZY%2098.pdf",
  },
  {
    name: "D ROSE SON OF CHI",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20D%20ROSE%20SON%20OF%20CHI.pdf",
  },
  {
    name: "D.O.N. ISSUE 4",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20D.O.N.%20ISSUE%204.pdf",
  },
  {
    name: "EDGE LUX 5",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20EDGE%20LUX%205.pdf",
  },
  {
    name: "GAMECOURT 2 M",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20GAMECOURT%202%20M.pdf",
  },
  {
    name: "GAZELLE",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20GAZELLE.pdf",
  },
  {
    name: "OZWEEGO",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20OZWEEGO.pdf",
  },
  {
    name: "PARK ST",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20PARK%20ST.pdf",
  },
  {
    name: "PRO BOUNCE 2018",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20PRO%20BOUNCE%202018.pdf",
  },
  {
    name: "STABIL 16 W",
    link: "http://192.168.30.19/dashboard/KaizenCloud/LVL%20STABIL%2016%20W.pdf",
  },
];

const HeaderPDFStyle = {
  width: "100%",
  height: "48px",
  marginTop: "8px",
  textAlign: "center",
  backgroundColor: "red",
  color: "#fff",
  boxSizing: "border-box",
  padding: "10px",
};

const KaizenImprovementByModel = (props) => {
  const { customStyle, header, factory, onChangeFactory } = props;

  const [kaizenModel, setKaizenModel] = useState(
    factory ? KAIZEN_MODEL_LHG : KAIZEN_MODEL_LVL
  );
  const [category, setCategory] = useState(kaizenModel[0].name);
  const HEIGHT = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10)) - 110,
  };

  const { name, link } = kaizenModel?.find((item) => item.name === category);

  useEffect(() => {
    const data = factory === "LHG" ? KAIZEN_MODEL_LHG : KAIZEN_MODEL_LVL;
    setKaizenModel(data);
    setCategory(data[0].name);
  }, [factory]);

  return (
    <Card customStyle={customStyle}>
      <Stack direction="row" spacing={2}>
        <Title name={header} />
        <Button
          variant="contained"
          sx={{
            bgcolor: factory === "LHG" ? "#049962" : "#82ca9d",
            marginRight: 2,
            marginLeft: 2,
            ":hover": {
              bgcolor: "#82ca9d",
              color: "#fff",
              opacity: 0.8,
            },
          }}
          onClick={() => onChangeFactory("LHG")}
        >
          LHG
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: factory === "LVL" ? "#049962" : "#82ca9d",
            marginRight: 2,
            marginLeft: 2,
            ":hover": {
              bgcolor: "#82ca9d",
              color: "#fff",
              opacity: 0.8,
            },
          }}
          onClick={() => onChangeFactory("LVL")}
        >
          LVL
        </Button>
      </Stack>
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2}>
          <Category
            data={kaizenModel}
            category={category}
            setCategory={setCategory}
            customStyle={customStyle}
          />
        </Grid>
        <Grid item xs={10}>
          <Box component={"div"} sx={HeaderPDFStyle}>
            <Typography variant="h5">{name}</Typography>
          </Box>
          <PDFViewer customStyle={HEIGHT} name={name} pdfUrl={link} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default KaizenImprovementByModel;
