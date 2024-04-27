import React from 'react';

const ColumnLegendIconStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
}

const ColumnLegendIconNameStyle = {
    width: "1.5rem",
    height: "1rem",
}

const ColumnLegendIcon = (props) => {
    const { name, color, customStyle } = props;

    return (
        <div style={ColumnLegendIconStyle}>
            <div style={{ ...ColumnLegendIconNameStyle, background: color, ...customStyle }}></div>
            <span style={{ fontSize: "10px", fontWeight: "600" }}>{name}</span>
        </div>
    )
}

export default ColumnLegendIcon;