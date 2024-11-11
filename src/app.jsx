import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { Account } from './account/account';
import { Home } from './home/home';
import { Login } from './login/login';
import { Quiz_1 } from './quiz_1/quiz_1';
import { Quiz_2 } from './quiz_2/quiz_2';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const [authState, setAuthState] = React.useState(
    userName ? AuthState.Authenticated : AuthState.Unauthenticated
  );

  const handleAuthChange = (newUserName, newAuthState) => {
    setUserName(newUserName);
    setAuthState(newAuthState);
    if (newAuthState === AuthState.Unauthenticated) {
      localStorage.removeItem('userName');
    } else {
      localStorage.setItem('userName', newUserName);
    }
  };

  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
      <header>
        <nav>
          <menu>
            <div className="nav-left">
              <NavLink to="/home">Home</NavLink>
              {authState === AuthState.Authenticated && (
                <div className="nav-right">
                  <NavLink to="/account" className="nav-right">Account</NavLink>
                </div>
              )}
            </div>
          </menu>
        </nav>
      </header>

        <Routes>
          <Route
            path="/"
            element={
              authState === AuthState.Authenticated ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/home"
            element={
              authState === AuthState.Authenticated ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />          
          <Route
            path="/login"
            element={
              authState === AuthState.Authenticated ? (
                <Navigate to="/home" />
              ) : (
                <Login authState={authState} onAuthChange={handleAuthChange} />
              )
            }
          />
          <Route
            path="/account"
            element={
              authState === AuthState.Authenticated ? (
                <Account userName={userName} onLogout={() => handleAuthChange('', AuthState.Unauthenticated)} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/quiz_1"
            element={
              authState === AuthState.Authenticated ? (
                <Quiz_1 />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/quiz_2"
            element={
              authState === AuthState.Authenticated ? (
                <Quiz_2 />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <a href="https://github.com/briannonw/startup">Briannon Woolsey's GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}