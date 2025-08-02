import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: '#435D7D', color: 'black', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Manage <b>Employees</b>
        </Typography>
        <Box>
          <Button variant="contained" color="error" sx={{ mr: 2 }}>
            Delete
          </Button>
          <Button
  variant="contained"
  color="success"
  startIcon={<AddIcon />}
  onClick={() => navigate('/Create')}
>
  Add New Employee
</Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;