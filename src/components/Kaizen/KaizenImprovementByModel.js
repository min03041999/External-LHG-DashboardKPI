import React, { useState } from 'react';
import Card from '../Card';
import Title from '../Title';
import Category from '../Category';

import { Grid, Box, Typography } from '@mui/material';
import PDFViewer from '../PDFViewer';

const KAIZEN_MODEL = [
    {
        name: "CAMPUS 00S",
        link: "http://192.168.30.19/dashboard/KaizenCloud/CAMPUS%2000S.pdf",
    },
    {
        name: "CAMPUS 00S CF EL I",
        link: "http://192.168.30.19/dashboard/KaizenCloud/CAMPUS%2000S%20CF%20EL%20I.pdf",
    },
    {
        name: "CAMPUS 00S CF EL C",
        link: "http://192.168.30.19/dashboard/KaizenCloud/CAMPUS%2000S%20CF%20EL%20C.pdf",
    },

    {
        name: "COUNTRY XLG BOOST",
        link: "http://192.168.30.19/dashboard/KaizenCloud/COUNTRY%20XLG%20BOOST.pdf",
    },
    {
        name: "LIGRA 7 M",
        link: "http://192.168.30.19/dashboard/KaizenCloud/LIGRA%207%20M.pdf",
    },
    {
        name: "NOVAFLIGHT",
        link: "http://192.168.30.19/dashboard/KaizenCloud/NOVAFLIGHT.pdf",
    },
    {
        name: "STAN SMITH CS LIP ON",
        link: "http://192.168.30.19/dashboard/KaizenCloud/STAN%20SMITH%20CS%20LIP%20ON.pdf",
    },
    {
        name: "STAN SMITH CS",
        link: "http://192.168.30.19/dashboard/KaizenCloud/STAN%20SMITH%20CS.pdf",
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
}

const KaizenImprovementByModel = (props) => {
    const { customStyle, header } = props;
    const [category, setCategory] = useState(KAIZEN_MODEL[0].name);

    const HEIGHT = { ...customStyle, height: parseFloat(parseInt(customStyle.height, 10)) - 100 };

    const { name, link } = KAIZEN_MODEL?.find((item) => item.name === category);

    return (
        <Card customStyle={customStyle}>
            <Title name={header} />

            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={2}>
                    <Category data={KAIZEN_MODEL} category={category} setCategory={setCategory} />
                </Grid>
                <Grid item xs={10}>
                    <Box component={"div"} sx={HeaderPDFStyle}>
                        <Typography variant="h5">{name}</Typography >
                    </Box>
                    <PDFViewer customStyle={HEIGHT} name={name} pdfUrl={link} />
                </Grid>
            </Grid>
        </Card>
    )
}

export default KaizenImprovementByModel;