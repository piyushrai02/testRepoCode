import React, { useState, useEffect } from 'react';
import './App.css';
import Blog from './components/Blog';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const AuthWrapper = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="blog-app">
      {token && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={token ? <Blog token={token} /> : <Login setToken={setToken} />}
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthWrapper />
    </Router>
  );
}

export default App;
