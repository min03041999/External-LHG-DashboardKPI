import React from "react";
import Card from "../Card";
import Title from "../Title";

import { Grid, Stack } from "@mui/material";

const AnalyzerTopLine = (props) => {
  const { customStyle, header, data } = props;

  const isCheck = data?.length !== 0 ? "red" : "green";

  return (
    <Card customStyle={{ ...customStyle, border: `3px solid ${isCheck}` }}>
      <Title
        name={header}
        customStyle={{ textAlign: "center", color: "red" }}
      />
      <div
        style={{
          width: "100%",
          height: "80%",
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "repeat(2, 1fr)",
          overflow: "scroll",
        }}
      >
        {data?.map((item, index) => (
          <div
            style={{
              textAlign: "center",
              color: "#d32f2f",
              fontWeight: "600",
              whiteSpace: "nowrap",
            }}
            key={index}
          >
            {item?.line}: {item?.SL_NgungChuyen} times
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AnalyzerTopLine;
