import React from 'react';

import { COLUMN_SIMPLE_CONFIG } from '../utils/config';

import {
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    Bar,
    LabelList,
    Cell,
    Line
} from 'recharts';

const colorMaker = (target, actual) => {
    if (actual >= target - (target * 5) / 100 && actual <= target - 1) {
        return "#ef6c00";
    } else if (actual < target) {
        return "#c62828";
    } else {
        return "#2e7d32";
    }
};

const ColumnSimple = (props) => {
    const { setHeightChart, data, ticks, domain } = props;

    return (
        <ResponsiveContainer width="100%" height={setHeightChart}>
            <ComposedChart
                {...COLUMN_SIMPLE_CONFIG.ComposedChart}
                data={data}
            >
                <XAxis
                    dataKey="time"
                    {...COLUMN_SIMPLE_CONFIG.XAxis}
                />
                <YAxis
                    {...COLUMN_SIMPLE_CONFIG.YAxis}
                    ticks={ticks}
                    domain={domain}
                />
                <Bar dataKey={"actual"}>
                    <LabelList
                        dataKey="actual"
                        {...COLUMN_SIMPLE_CONFIG.LabelList}
                    />
                    {data?.map((entry, index) => {
                        const { actual, target } = entry;
                        return (
                            <Cell
                                key={`cell-${index}`}
                                fill={colorMaker(target, actual)}
                                style={{
                                    fontSize: 12,
                                    fontWeight: "bold",
                                }}
                            />
                        );
                    })}
                </Bar>
                <Line
                    dataKey="target"
                    {...COLUMN_SIMPLE_CONFIG.Line}
                />
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default ColumnSimple;