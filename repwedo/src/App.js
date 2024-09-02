import React, { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Account from './pages/Account'; // Add this import
import { UserProvider, UserContext } from './context/UserContext';
import themeSettings from './theme';

// PrivateRoute component
const PrivateRoute = ({ element, requiredRole, ...rest }) => {
  const { user } = useContext(UserContext);
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;
  return element;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState('light');
  const theme = createTheme(themeSettings(mode));

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header mode={mode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<PrivateRoute element={<AdminDashboard />} requiredRole="admin" />} />
          <Route path="/account" element={<PrivateRoute element={<Account />} requiredRole="normal" />} />
        </Routes>
        <Footer mode={mode} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
