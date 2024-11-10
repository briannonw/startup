import React from 'react';
import './login.css'

export function Login() {
  return (
    <main className="login-main">
      <div className="login-box">
          <h1 className="welcome">Personality Quizzes<br />Account Login</h1>
          <div className="content">
              <input type="text" placeholder="username" />
          </div>
          <div className="content">
              <input type="password" placeholder="password" />
          </div>
          <button className="content" type="submit">Login</button>
          <button className="content">Login with google/facebook/etc.</button>
      </div>
    </main>
  );
}