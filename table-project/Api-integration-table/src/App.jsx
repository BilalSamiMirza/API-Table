import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeTable from './home';
import UserDetail from './UserDetail';
import Navbar from './Navbar';
import CreateUser from './Screens/CreateUser'; // Assuming you have a CreateUser component
import EditUser from './Screens/EditUser'; // Assuming you have an EditUser component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeeTable />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/EditUser/:id" element={<EditUser />} />
        <Route path="/Create" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;