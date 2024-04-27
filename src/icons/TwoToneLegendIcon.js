import React from 'react';
import { Stack } from '@mui/material';

const TwoToneLegendIcon = (props) => {
    const { firstColor, secondColor } = props;
    return (
        <Stack direction={"row"}>
            <div
                style={{ width: "1.5rem", height: "1rem", background: firstColor }}
            ></div>
            <div
                style={{ width: "1.5rem", height: "1rem", background: secondColor }}
            ></div>
        </Stack>
    );
}

export default TwoToneLegendIcon;