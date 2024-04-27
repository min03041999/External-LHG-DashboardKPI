import React from 'react';
import { Box } from '@mui/material';

const LineActualIconStyle = {
    position: "relative",
}

const LineActualIconSymbolStyle = {
    width: "24px",
    height: "3px",
    backgroundColor: "#2196f3",
}

const CircleActualIconSymbolStyle = {
    position: "absolute",
    top: "-2px",
    left: "8px",
    width: "8px",
    height: "8px",
    backgroundColor: "#2196f3",
}

const LineActualIcon = (props) => {
    return (
        <Box style={LineActualIconStyle}>
            <div style={CircleActualIconSymbolStyle}></div>
            <div style={LineActualIconSymbolStyle}></div>
        </Box >
    )
}

export default LineActualIcon;