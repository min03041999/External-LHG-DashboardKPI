import React from "react";
import Card from "../Card";
import Title from "../Title";

import { Stack, Box } from "@mui/material";

import ColumnLegendIcon from "../../icons/ColumnLegendIcon";
import ColumnStacked from "../ColumnStacked";

import { useTranslation } from "react-i18next";

const OutputByLine = (props) => {
  const { customStyle, setHeightChart, header, data } = props;
  const [t] = useTranslation("global");

  return (
    <Card customStyle={customStyle}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Title name={header} />
        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <ColumnLegendIcon
            name={t("stockfitting.output-by-line-target")}
            color={"black"}
            customStyle={{ height: "0.5rem" }}
          />
          <ColumnLegendIcon
            name={t("stockfitting.output-by-line-actual")}
            color={"#89b558"}
          />
          <ColumnLegendIcon
            name={t("stockfitting.output-by-line-unreached")}
            color={"#fb4343"}
          />
        </Box>
      </Stack>

      <ColumnStacked
        setHeightChart={setHeightChart}
        data={data}
        display={false}
      />
    </Card>
  );
};

export default OutputByLine;
