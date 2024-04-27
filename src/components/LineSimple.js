import React from 'react';
import Card from './Card';
import Title from './Title';
import { Stack, Box } from '@mui/material';
import LineLegendIcon from '../icons/LineLegendIcon';


import { LINE_SIMPLE_CONFIG } from '../utils/config';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    LabelList,
    XAxis,
    YAxis,
} from 'recharts';

const LineSimple = (props) => {
    const { setHeightChart, domain, data } = props;

    return (
        <ResponsiveContainer width="100%" height={setHeightChart}>
            <LineChart
                {...LINE_SIMPLE_CONFIG.LineChart}
                data={data}
            >
                <XAxis
                    {...LINE_SIMPLE_CONFIG.XAxis}
                    dataKey={"time"}
                />
                <YAxis
                    dataKey={"actual"}
                    {...LINE_SIMPLE_CONFIG.YAxis}
                    domain={domain}
                    hide={true}
                />
                <Line
                    strokeWidth={3}
                    dataKey={"actual"}
                    stroke={"green"}
                >
                    <LabelList
                        {...LINE_SIMPLE_CONFIG.LabelList}
                        dataKey={"actual"}
                    />
                </Line>
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineSimple;