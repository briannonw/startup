import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { AuthState } from './authState';

export function Login({ onAuthChange, authState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      onAuthChange(username, AuthState.Authenticated);
      localStorage.setItem('userName', username);
      navigate('/home');
    } else {
      alert("Please enter a valid username.");
    }
  };

  return (
    <main className="login-main">
      <div className="login-box">
          <h1 className="welcome">Personality Quizzes<br />Account Login</h1>
          <div className="content">
              <input 
                type="text" 
                placeholder="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
          </div>
          <div className="content">
              <input 
                type="password" 
                placeholder="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
          </div>
          <button className="content" type="button" onClick={handleLogin}>Login</button>
          <button className="content">Login with google/facebook/etc.</button>
      </div>
    </main>
  );
}