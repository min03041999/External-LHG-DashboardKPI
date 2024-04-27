import React from 'react';

import { Paper } from '@mui/material';

const PaperStyle = {
    position: "relative",
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxSizing: "border-box",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    padding: "10px 5px"
}

const Card = (props) => {
    const { children, customStyle } = props;
    return (
        <Paper style={{ ...PaperStyle, ...customStyle }}>
            {children}
        </Paper>
    )
}

export default Card;