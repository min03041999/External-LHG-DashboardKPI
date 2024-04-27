import React from 'react';
import { Stack } from '@mui/material';

const ThreeToneLegendIcon = (props) => {
    const { firstColor, secondColor, thirdColor } = props;
    return (
        <Stack direction={"row"}>
            <div
                style={{ width: "1.5rem", height: "1rem", background: firstColor }}
            ></div>
            <div
                style={{ width: "1.5rem", height: "1rem", background: secondColor }}
            ></div>
            <div
                style={{ width: "1.5rem", height: "1rem", background: thirdColor }}
            ></div>
        </Stack>
    );
}

export default ThreeToneLegendIcon;