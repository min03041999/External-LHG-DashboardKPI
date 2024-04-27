import React from 'react';
import Card from './Card';
import Title from './Title';
import LineLegendIcon from '../icons/LineLegendIcon';
import { Stack, Box } from '@mui/material';
import LineActualIcon from '../icons/LineActualIcon';

import { LINE_TARGET_CONFIG } from '../utils/config';
import { IS_TARGET_EFF_RFT } from '../utils/base';

import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    Line,
    LabelList
} from 'recharts';

const LineTarget = (props) => {
    const { setHeightChart, data, ticks, domain } = props;

    return (
        <ResponsiveContainer width="100%" height={setHeightChart}>
            <LineChart {...LINE_TARGET_CONFIG.LineChart} data={data}>
                <XAxis
                    dataKey="time"
                    {...LINE_TARGET_CONFIG.XAxis}
                    axisLine={false}
                    tickLine={false}
                    angle={-35}
                    textAnchor='end'
                />
                <YAxis
                    dataKey={"actual"}
                    ticks={[ticks]}
                    domain={[0, domain]}
                    axisLine={false}
                    {...LINE_TARGET_CONFIG.YAxis}
                />
                <Line
                    dataKey={"actual"}
                    {...LINE_TARGET_CONFIG.LineActual}
                    dot={(props) => {
                        const { cx, cy, key } = props;
                        return (
                            <rect
                                key={key}
                                x={cx - 4}
                                y={cy - 4}
                                width={8}
                                height={8}
                                fill={"#2196f3"}
                            ></rect>
                        );
                    }}
                >
                    <LabelList
                        dataKey={"actual"}
                        {...LINE_TARGET_CONFIG.LabelList}
                    />
                </Line>
                <Line
                    dataKey={"target"}
                    {...LINE_TARGET_CONFIG.LineTarget}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineTarget;