import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './context/UserContext';
import themeSettings from './theme';

function App() {
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admindashboard" element={<PrivateRoute admin><AdminDashboard /></PrivateRoute>} />
        </Routes>
        <Footer mode={mode} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
