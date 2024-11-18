import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { AuthState } from './authState';

export function Login({ onAuthChange, authState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        // Check the response status
        console.log('Response status:', response.status);
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const data = await response.json();
        console.log('Login response data:', data);

        const token = data.token;
        if (token) {
          onAuthChange(username, AuthState.Authenticated);
          localStorage.setItem('userName', username);
          localStorage.setItem('token', token);
          console.log('Logged in successfully');
          navigate('/home');
        } else {
          alert('Invalid username or password');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
      }
    } else {
      alert('Please enter both username and password.');
    }
  };
  
  
  const handleCreateAccount = async () => {
    if (username && password) {
      try {
        const response = await fetch('/api/auth/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        // Check for successful response (2xx status code)
        if (response.ok) {
          const data = await response.json(); // Parse the JSON response
          const { token } = data;
  
          if (token) {
            onAuthChange(username, AuthState.Authenticated);
            localStorage.setItem('userName', username);
            localStorage.setItem('token', token);
            navigate('/home');
          } else {
            console.error('No token received');
            alert('Account creation failed. Please try again.');
          }
        } else {
          const errorData = await response.json().catch(err => {
            // In case the server response is not a valid JSON
            console.error('Error response is not valid JSON:', err);
            return { msg: 'Account creation failed due to invalid response' };
          });
  
          console.error('Error during account creation:', errorData);
          alert(errorData.msg || 'Account creation failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during account creation:', error);
        alert('Account creation failed. Please try again.');
      }
    } else {
      alert('Please enter both username and password.');
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
          <div className="content">
            <button type="button" onClick={handleLogin}>Login</button>
            <button type="button" onClick={handleCreateAccount}>Create Account</button>
          </div>
          <button className="content">Login with google/facebook/etc.</button>
      </div>
    </main>
  );
}