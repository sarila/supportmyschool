import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
} from "@mui/material";

const schools = [
  { id: 1, name: "Shree Saraswati Secondary School", contact: "9851234567", address: "Kathmandu" },
  { id: 2, name: "Shree Laxmi Higher Secondary School", contact: "9807654321", address: "Bhaktapur" },
  { id: 3, name: "Shree Gyan Jyoti Secondary School", contact: "9849876543", address: "Lalitpur" },
  { id: 4, name: "Shree Adarsha Vidya Mandir", contact: "9812345678", address: "Pokhara" },
  { id: 5, name: "Shree Durga Secondary School", contact: "9865432109", address: "Chitwan" },
  { id: 6, name: "Shree Bhagwati Secondary School", contact: "9801239876", address: "Biratnagar" },
  { id: 7, name: "Shree Shanti Niketan School", contact: "9817654321", address: "Butwal" },
  { id: 8, name: "Shree Sagarmatha School", contact: "9804321765", address: "Dharan" },
];

const SchoolTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(search) ||
    school.contact.includes(search) ||
    school.address.toLowerCase().includes(search)
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSchools
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((school) => (
                <TableRow key={school.id}>
                  <TableCell>{school.id}</TableCell>
                  <TableCell>{school.name}</TableCell>
                  <TableCell>{school.contact}</TableCell>
                  <TableCell>{school.address}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredSchools.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SchoolTable;
