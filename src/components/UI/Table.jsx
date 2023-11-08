import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { v4 as uuidv4 } from "uuid";
import "../../styles/table.css";
import { useSearchParams } from "react-router-dom";

const columns = [
  { id: "type", label: "Type", minWidth: 150 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "title", label: "Title", minWidth: 205 },
  { id: "desc", label: "Description", minWidth: 205 },
];

function createData(type, name, title, desc) {
  return { name, type, title, desc };
}

const rows = [
  createData("Folder", "Test", "React", "Intern"),
  createData("Folder", "Test", "React", "Intern"),
  createData("Folder", "Test", "React", "Intern"),
  createData("Folder", "Test", "React", "Intern"),
  createData("Folder", "Test", "React", "Intern"),
  createData("Folder", "Test", "React", "Intern"),
  createData("File", "TestFile", "React", "Intern"),
  createData("Folder", "Test", "React", "Intern"),
  createData("Folder", "Test", "React", "Intern"),
  createData("Folder", "Test", "React", "Intern"),
  createData("Folder", "Test", "React", "Intern"),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [request] = useSearchParams();
  const searchKeyword = request.get("q");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", marginTop: "15px" }}>
      <TableContainer sx={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5} className="titleTable">
                Personal Files
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter((row) => {
                return searchKeyword && searchKeyword !== null
                  ? row.name === searchKeyword
                  : row;
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
