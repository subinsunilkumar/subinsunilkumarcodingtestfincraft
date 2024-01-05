import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = (username) => {
    setLoggedInUser(username);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={login} />} />
        <Route path="/dashboard" element={loggedInUser ? <Dashboard loggedInUser={loggedInUser} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
