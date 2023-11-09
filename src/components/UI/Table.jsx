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
  { id: "type", label: "Type", minWidth: 355 },
  { id: "name", label: "Name", minWidth: 355 },
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [request] = useSearchParams();
  const searchKeyword = request.get("q");
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    async function pullRequest() {
      try {
        const token = JSON.parse(localStorage.getItem("base64"));
        const authorizationKey = `Basic ${token["base64"]}`;
        const response = await fetch(
          "https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/382b3102-ffba-422e-8711-d7f330fb5468/children?maxItems=25&orderBy=isFolder%20desc%2Cname%20asc&include=path%2Cproperties%2CallowableOperations%2Cpermissions%2CaspectNames%2CisFavorite%2Cdefinition&includeSource=true",
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              Authorization: authorizationKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error("Hata:", error);
        throw error;
      }
    }

    const fetchData = async () => {
      try {
        const arrayData = await pullRequest();
        console.log("a", arrayData);
        const data = arrayData["list"]["entries"].map((entry) => {
          return {
            name: entry.entry.name,
            type: entry.entry.nodeType === "cm:folder" ? "Folder" : "File",
          };
        });

        const row = data;
        console.log(row);
        setRows(row);
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    fetchData();
  }, []);

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
