import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

export default function DefectTable(props) {
  const {
    header,
    data,
    height = "100%",
    bgColor = "#337ab7",
    color = "#fff",
  } = props;

  return (
    <TableContainer sx={{ width: "100%", height: height }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {header?.map((item, i) => (
              <TableCell
                key={i}
                align="center"
                style={{
                  minWidth: 100,
                  backgroundColor: bgColor,
                  color: color,
                  whiteSpace: "nowrap",
                  paddingBottom: "0",
                  paddingTop: "0",
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, i) => (
            <TableRow key={i}>
              <TableCell
                padding="none"
                style={{
                  fontSize: 11,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {item.SupplierName}
              </TableCell>
              <TableCell padding="none">
                <Box>
                  {item.Materials.length > 0 && (
                    <>
                      {Array.from(
                        new Set(
                          item.Materials?.map(
                            (itemMat) => itemMat.Material_Name
                          )
                        )
                      )?.map((uniqueMat, i) => (
                        <Box key={i} display="flex">
                          <Box>
                            <LabelImportantIcon fontSize="small" />
                          </Box>
                          <Box
                            fontSize={11}
                            fontWeight={"bold"}
                            whiteSpace={"nowrap"}
                          >
                            {uniqueMat}
                          </Box>
                        </Box>
                      ))}
                    </>
                  )}
                </Box>
              </TableCell>
              <TableCell padding="none">
                {item.Defect?.map((defect, i) => (
                  <Box key={i} display="flex">
                    <Box>
                      <LabelImportantIcon fontSize="small" />
                    </Box>
                    <Box
                      fontSize={11}
                      fontWeight={"bold"}
                      whiteSpace={"nowrap"}
                    >
                      {defect.Defect_Name}
                    </Box>
                  </Box>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
