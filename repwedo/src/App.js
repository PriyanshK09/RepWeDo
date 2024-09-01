import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import themeSettings from './theme';

function App() {
  const [mode, setMode] = useState('light');
  const theme = createTheme(themeSettings(mode));

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <ThemeToggle toggleTheme={toggleTheme} mode={mode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
