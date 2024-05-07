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
};

export default function DataTable(props) {
  const {
    header,
    data,
    height = "100%",
    customTableHeadStyle,
    customTableBodyStyle,
    customTextStyle,
    alignText,
  } = props;

  const checkImage = (key, check) => {
    if (key === "picture") {
      if (check) {
        return (
          <img
            style={{ width: "100%", maxHeight: "70px" }}
            src={check}
            alt={key}
          />
        );
      } else {
        return (
          <img
            style={{ width: "100%", maxHeight: "70px" }}
            src={"http://192.168.30.19:5000/shoes-photos/no-image.jpg"}
            alt="no-img"
          />
        );
      }
    } else {
      return check;
    }
  };

  const checkColor = (key, item) => {
    if (key === "status") {
      if (item[key] === "Ongoing") {
        return { color: "#ffce54" };
      } else {
        return { color: "green" };
      }
    }
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
                <TableCell key={index} align={alignText ? "center" : "left"}>
                  <Typography
                    variant="overline"
                    sx={{
                      ...TextStyle,
                      ...customTextStyle,
                    }}
                    style={checkColor(key, item)}
                  >
                    {checkImage(key, item[key])}
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
