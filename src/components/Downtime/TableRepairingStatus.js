import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const TableHeadStyle = {
  minWidth: 120,
  whiteSpace: "nowrap",
  paddingBottom: 0,
  paddingTop: 0,
};

const TableBodyStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

const TextStyle = {
  fontWeight: "600",
  fontSize: 12,
};

export default function TableRepairingStatus(props) {
  const {
    header,
    data,
    height = "100%",
    customTableHeadStyle,
    customTableBodyStyle,
    customTextStyle,
    alignText,
  } = props;

  const wrapText = (item, key) => {
    if (key === "id_machine") {
      let idMachine0 = item[key]?.split(" ")[0];
      let idMachine1 = item[key]?.split(" ")[1];
      // console.log(idMachine0, idMachine1);
      return (
        <span>
          {idMachine0}
          <br />
          {idMachine1}
        </span>
      );
    }
    return <span>{item[key]}</span>;
  };
  return (
    <TableContainer sx={{ width: "100%", height: height }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {header?.map((item, i) => (
              <TableCell
                key={i}
                sx={{
                  ...TableHeadStyle,
                  ...customTableHeadStyle,
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, i) => (
            <TableRow
              key={i}
              sx={{ ...TableBodyStyle, ...customTableBodyStyle }}
            >
              {Object.keys(item)?.map((key, index) => (
                <TableCell
                  key={index}
                  align={alignText ? "center" : "left"}
                  sx={{
                    ...TextStyle,
                    ...customTextStyle,
                    color:
                      item?.Repairing === null
                        ? "#cd3d3d"
                        : item?.Done === ""
                        ? "#ebb43e"
                        : "#70b44c",
                  }}
                >
                  <Typography fontSize={12} fontWeight={"bold"}>
                    {wrapText(item, key)}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
