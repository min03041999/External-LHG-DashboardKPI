export const COLUMN_CHART_MIXED_CONFIG = {
  ComposedChart: {
    margin: {
      top: 20,
      right: 5,
    },
  },
  XAxis: {
    interval: 0,
    tickFormatter: (value) => {
      if (value.length > 6) return `L${value.match(/\d+$/)[0]}`;
      return value;
    },
    style: {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
  YAxis: {
    width: 30,
    tickCount: 1,
    minTickGap: -30,
    style: {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
  Bar: {
    barSize: 30,
    // animationDuration: 0,
    // fill: "#fd5151",
  },
  LabelList: {
    fill: "#000",
    position: "top",
    dy: 0,
    style: {
      fontSize: "12px",
      fontWeight: "600",
    },
    formatter: (value) => {
      return `${value}%`;
    },
  },
  Line: {
    strokeWidth: 3,
    legendType: "plainline",
    stroke: "#1565c0",
    // animationDuration: 0,
  },
};

export const COLUMN_GROUP_CONFIG = {
  BarChart: {
    margin: { top: 20, right: 20, left: 20 },
  },
  XAxis: {
    style: {
      fontSize: 12,
      fontWeight: 600,
    },
    tickFormatter: (value) => {
      if (value.length > 6) return `L${value.match(/\d+$/)[0]}`;
      return value;
    },
  },
  Bar: {
    barSize: 20,
    // isAnimationActive: false,
  },
  LabelList: {
    fill: "black",
    position: "top",
    style: {
      fontSize: 12,
      fontWeight: 600,
    },
  },
};

export const COLUMN_STACKED_CONFIG = {
  BarChart: {
    margin: { top: 20, right: 20, left: 20 },
  },
  CartesianGrid: {
    strokeDasharray: "3 3",
    vertical: false,
  },
  XAxis: {
    interval: 0,
    tickFormatter: (value) => {
      if (value.length > 6) return `L${value.match(/\d+$/)[0]}`;
      return value;
    },
    style: {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
  YAxis: {
    width: 30,
    minTickGap: -30,
    style: {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
  LabelList: {
    fill: "black",
    style: {
      fontSize: 12,
      fontWeight: 600,
    },
  },
};

export const LINE_TARGET_CONFIG = {
  LineChart: {
    margin: { top: 20, right: 20, left: 15, bottom: 20 },
  },
  XAxis: {
    interval: 0,
    style: {
      fontSize: 10,
      fontWeight: "bold",
    },
  },
  YAxis: {
    width: 30,
    minTickGap: -30,
    style: {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
  LineActual: {
    strokeWidth: 3,
    stroke: "#2196f3",
  },
  LineTarget: {
    stroke: "#0d47a1",
    strokeWidth: 3,
  },
  LabelList: {
    formatter: (value) => {
      return `${value}%`;
    },
    fill: "black",
    position: "bottom",
    // offset: 8,
    style: {
      fontSize: 12,
      fontWeight: 600,
    },
  },
};

export const COLUMN_SIMPLE_CONFIG = {
  ComposedChart: {
    margin: { top: 20, right: 20, left: 15, bottom: 20 },
  },
  XAxis: {
    interval: 0,
    style: {
      fontSize: 10,
      fontWeight: "bold",
    },
    axisLine: false,
    tickLine: false,
    angle: -35,
    textAnchor: "end",
  },
  YAxis: {
    width: 30,
    minTickGap: -30,
    style: {
      fontSize: 12,
      fontWeight: "bold",
    },
    axisLine: false,
    tickLine: false,
  },
  LabelList: {
    position: "center",
    fill: "white",
  },
  Line: {
    strokeWidth: 3,
    legendType: "plainline",
    stroke: "#0d47a1",
  },
};

export const LINE_SIMPLE_CONFIG = {
  LineChart: {
    margin: { top: 20, right: 20, left: 48, bottom: 20 },
  },
  XAxis: {
    interval: 0,
    style: {
      fontSize: 10,
      fontWeight: "bold",
    },
    axisLine: false,
    tickLine: false,
    angle: -35,
    textAnchor: "end",
  },
  YAxis: {
    width: 30,
    minTickGap: -30,
    style: {
      fontSize: 12,
      fontWeight: "bold",
    },
    axisLine: false,
    tickLine: false,
  },
  LabelList: {
    fill: "black",
    position: "top",
    offset: 8,
    style: {
      fontSize: 12,
      fontWeight: 600,
    },
  },
};

// Production
export const COLUMN_CHART_MIXED_COLOR = {
  //   eff: {
  //     is_target: "#429ef5",
  //     is_not_target: "#c62828",
  //   },
  eff: {
    is_target: "#82adf9",
    is_not_target: "#fd5151",
  },
  //   rft: {
  //     is_target: "#48048b",
  //     is_not_target: "#c62828",
  //   },
  rft: {
    is_target: "#48048b",
    is_not_target: "#fd5151",
  },
};
