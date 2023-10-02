import React, { useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";

// Define the types for the props
interface Column {
  id: string;
  label: string;
  align: "left" | "right" | "center";
}

interface Row {
  [key: string]: string | number;
}

interface CustomTableProps {
  rows: Row[];
  columns: Column[];
  onRowClick: (row: Row) => void;
  preSort: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  "& .MuiTableSortLabel-root": {
    display: "flex",
    alignItems: "center",
  },
  "& .MuiTableSortLabel-icon": {
    marginLeft: 2,
    marginRight: -8,
  },
}));

const TableSortLabelStyled = styled(TableSortLabel)(({ theme }) => ({
  "& .MuiTableSortLabel-icon": {
    transition: "transform 0.2s ease-in-out",
  },
  "& .MuiTableSortLabel-active": {
    color: theme.palette.text.primary,
    "& .MuiTableSortLabel-icon": {
      transform: `rotate(${theme.direction === "rtl" ? "90deg" : "-90deg"})`,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    textAlign: "left",
  },
}));
// align text to the right

const CustomTable: React.FC<CustomTableProps> = ({
  rows,
  columns,
  onRowClick,
  preSort,
}) => {
  const [orderBy, setOrderBy] = useState<string>(
    columns.length > 0 ? columns[0].id : ""
  );
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // orderBy rows
  const sortedRows = useMemo(() => {
    const sortedRows = [...rows];
    if (orderBy && preSort) {
      sortedRows.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
          return order === "asc" ? -1 : 1;
        }

        if (a[orderBy] > b[orderBy]) {
          return order === "asc" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortedRows;
  }, [rows, orderBy, order, preSort]);

  const handleSort = (property: string) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer
      component={Paper}
      elevation={5}
      sx={{
        borderRadius: 2,
        margin: '1rem 0',
      }}
    >
      <Table aria-label="custom table" style={{ tableLayout: "auto" }}>
        <TableHead>
          <TableRow
            sx={{
              height: "auto",
            }}
          >
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                sortDirection={orderBy === column.id ? order : false}
                onClick={handleSort(column.id)}
              >
                <TableSortLabelStyled
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "desc"}
                >
                  {column.label}
                </TableSortLabelStyled>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row, index) => (
            <StyledTableRow
              key={row.id as string}
              onClick={() => onRowClick(row)}
              sx={{ ...(index % 2 && { bgcolor: "background.default" }) }}
            >
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {row[column.id]}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
