import React, { useState } from "react";
import Card from "../Card";
import Title from "../Title";
import Category from "../Category";

import { Grid, Box, Typography } from "@mui/material";
import PDFViewer from "../PDFViewer";

const KAIZEN_MODEL = [
  {
    name: "CAMPUS 00S CF EL I",
    link: "http://192.168.30.19/dashboard/KaizenCloud/CAMPUS%2000S%20CF%20EL%20I.pdf",
  },
  {
    name: "CAMPUS 00S CF EL C",
    link: "http://192.168.30.19/dashboard/KaizenCloud/CAMPUS%2000S%20CF%20EL%20C.pdf",
  },
  {
    name: "CAMPUS 2000S",
    link: "http://192.168.30.19/dashboard/KaizenCloud/CAMPUS%2000s%20(1).pdf",
  },
  {
    name: "COURT 24",
    link: "http://192.168.30.19/dashboard/KaizenCloud/CAMPUS%2000s%20(1).pdf",
  },
  {
    name: "CRAZYFLIGHT 5",
    link: "http://192.168.30.19/dashboard/KaizenCloud/CRAZYFLIGHT%205%20(1).pdf",
  },
  {
    name: "DON ISSUE 6",
    link: "http://192.168.30.19/dashboard/KaizenCloud/DON%20ISSUE%206%20(1).pdf",
  },
  {
    name: "SAMBA DECO SPZL",
    link: "http://192.168.30.19/dashboard/KaizenCloud/SAMBA%20DECO%20SPZL%20(1).pdf",
  },
  {
    name: "SAMBA LT",
    link: "http://192.168.30.19/dashboard/KaizenCloud/SAMBA%20LT%20(1).pdf",
  },
  {
    name: "SAMBA DECO SPZL",
    link: "http://192.168.30.19/dashboard/KaizenCloud/SAMBA%20DECO%20SPZL%20(1).pdf",
  },
  {
    name: "SAMBA LT",
    link: "http://192.168.30.19/dashboard/KaizenCloud/SAMBA%20LT%20(1).pdf",
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
  const { customStyle, header } = props;
  const [category, setCategory] = useState(KAIZEN_MODEL[0].name);

  const HEIGHT = {
    ...customStyle,
    height: parseFloat(parseInt(customStyle.height, 10)) - 100,
  };

  const { name, link } = KAIZEN_MODEL?.find((item) => item.name === category);

  return (
    <Card customStyle={customStyle}>
      <Title name={header} />

      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2}>
          <Category
            data={KAIZEN_MODEL}
            category={category}
            setCategory={setCategory}
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
