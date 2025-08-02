import { Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
//   const [singleUserData, setSingleUserData] = useState({});
const   [singleUserData, setSingleUserData] = useState({
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    city: "",
    suite: ""
  },
  phone: "",
});



  const navigate = useNavigate();

  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((response) => {
        setSingleUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editUser = () => {
    axios
      .put(`http://localhost:3000/users/${id}`, singleUserData)
      .then(() => {
        alert("edit user successfully...");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form>
      <Paper elevation={24} sx={{ margin: 10, padding: 3 }}>
        <Typography sx={{ marginBottom: 3 }} variant="h5">
          Edit User
        </Typography>

        <TextField
          onChange={(e) =>
            setSingleUserData({ ...singleUserData, name: e.target.value })
          }
          variant="outlined"
          value={singleUserData.name}
          
          sx={{ marginBottom: 3 }}
          label="Enter name" 
          fullWidth
        />
        <TextField
          onChange={(e) =>
            setSingleUserData({ ...singleUserData, username: e.target.value })
          }
          variant="outlined"
          value={singleUserData.username}
          sx={{ marginBottom: 3 }}
          label="Enter Username"
          fullWidth
        />

        <TextField
          onChange={(e) =>
            setSingleUserData({ ...singleUserData, email: e.target.value })
          }
          variant="outlined"
          value={singleUserData.email}
          sx={{ marginBottom: 3 }}
          label="Enter Email"
          fullWidth
        />


        <TextField
          onChange={(e) =>
            setSingleUserData({ ...singleUserData, address: { ...singleUserData.address, street: e.target.value } })        
            }
            variant="outlined"

            value={singleUserData.address.street}
            sx={{ marginBottom: 3 }}
            label="Enter Address"
            fullWidth
        />
 
            



  
        <TextField
          onChange={(e) =>
            setSingleUserData({ ...singleUserData, phone: e.target.value })
          }
          variant="outlined"
          value={singleUserData.phone}
          sx={{ marginBottom: 3 }}
          label="Enter Phone" 
          fullWidth
        />

        <Button onClick={editUser} color="error" variant="contained">
          Edit User
        </Button>
      </Paper>
    </form>
  );
};

export default EditUser;