// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DonationForm from './components/DonationForm';
import DonationList from './components/DonationList';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import DonationDetails from './components/DonationDetails';
import io from 'socket.io-client';
import Chat from './components/Chat';


const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedDoneeId, setSelectedDoneeId] = useState(null);


  const handleLogin = (userData) => {
    console.log('User logged in with data:', userData); // Debugging log
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };


  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} userType={user?.userType} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        
        {/* Conditional Routes */}
        <Route 
          path="/donate" 
          element={isAuthenticated && user?.userType === 'donor' ? <DonationForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/donations" 
          element={isAuthenticated && user?.userType === 'donee' ? <DonationList /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/notifications" 
          element={isAuthenticated ? <Notifications notifications={notifications} /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/donation/:donationId" 
          element={isAuthenticated ? <DonationDetails /> : <Navigate to="/login" />} 
        />
        
        <Route
          path="/chat"
          element={<Chat 
          donorId={user?.id} 
          doneeId={selectedDoneeId} 
          notifications={notifications} 
          setNotifications={setNotifications}
    />
  }
/>
      </Routes>
    </Router>
  );
};

export default App;
