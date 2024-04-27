import React from 'react';
import { Box, Typography } from '@mui/material';

const ColumnLegendIconStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
}

const ColumnLegendIconNameStyle = {
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "1.5rem"
}

const PieLegendIcon = (props) => {
    const { nameVN, nameEN, color, customStyle } = props;

    return (
        <div style={ColumnLegendIconStyle}>
            <div style={{ ...ColumnLegendIconNameStyle, background: color, ...customStyle }}></div>
            <Box>
                <Typography style={{ fontSize: "10px", fontWeight: "600" }}>{nameVN}</Typography>
                <Typography style={{ fontSize: "10px", fontWeight: "600" }}>{nameEN}</Typography>
            </Box>
        </div>
    )
}

export default PieLegendIcon;