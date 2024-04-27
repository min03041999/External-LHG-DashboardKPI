import React from 'react';

const LineLegendIcon = (props) => {
    const { stroke } = props;
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
        >
            <path
                strokeWidth="4"
                fill="none"
                stroke={stroke}
                d="M0,16h10.666666666666666
                        A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
                        H32M21.333333333333332,16
                        A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
            ></path>
        </svg>
    );
}

export default LineLegendIcon;