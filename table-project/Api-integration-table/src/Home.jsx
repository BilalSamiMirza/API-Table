import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Checkbox,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const deleteUser = (userId) => {


  axios
    .delete(`http://localhost:3000/users/${userId}`)
    .then(() => {
      alert("User deleted successfully.");
      setEmployees((prev) => prev.filter((user) => user.id !== userId));
    })
    .catch((err) => {
      console.log("Error deleting user:", err);
    });
};


  useEffect(() => {
    axios.get('http://localhost:3000/users')
    .then((response) => {
      setEmployees(response.data);
    })
    .catch((error) => {
      console.error('Error fetching employees:', error);
    });
  }, []);

  // useEffect(() => {
  //   fetch('https://dummyjson.com/users')
  //     .then((res) => res.json())
  //     .then((data) => setEmployees(data.users));
  // }, []);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < employees.length
                  }
                  checked={employees.length > 0 && selected.length === employees.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelected(employees.map((e) => e.id));
                    } else {
                      setSelected([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Address</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((e) => (
              <TableRow key={e.id} hover onClick={() => navigate(`/user/${e.id}`)} style={{ cursor: 'pointer' }}>
                <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selected.includes(e.id)}
                    onChange={() => handleSelect(e.id)}
                  />
                </TableCell>
                <TableCell>{e.name} {e.username}</TableCell>
                <TableCell>{e.email}</TableCell>
<TableCell>
  {
    e.address 
      ? typeof e.address === "object"
        ? [e.address.street, e.address.city, e.address.suite].filter(Boolean).join(", ")
        : e.address.split(",").map(part => part.trim()).filter(Boolean).join(", ")
      : ""
  }
</TableCell>

                <TableCell>{e.phone}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                   <EditIcon
                    onClick={() => navigate(`/EditUser/${e.id}`)}
                    sx={{ cursor: "pointer", color: "green", marginRight: 2 }}
                  />
                    <DeleteIcon
                    onClick={() => deleteUser(e.id)}
                    sx={{ cursor: "pointer", color: "red" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeTable;