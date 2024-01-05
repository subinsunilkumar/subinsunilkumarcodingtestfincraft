import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorValue] = useState('');

  const login = () => {
    if (username === 'user' && password === 'user@1234') {
      navigate('/dashboard');
      onLogin(username);
    } else {
      setErrorValue('Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <h2>Welcome.</h2>
      <p>Login to SpaceVue portal</p>
      <br />
      <br />
      <p>Username:</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <p>Password:</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={login}>Login</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;
