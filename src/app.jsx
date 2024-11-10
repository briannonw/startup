import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Quiz_1 } from './quiz_1/quiz_1';
import { Quiz_2 } from './quiz_2/quiz_2';
import { Account } from './account/account';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
    <div className='body bg-dark text-light'>
      <header>
            <nav>
                <menu>
                    <div className="nav-left">
                        <NavLink to='home'>Home</NavLink>
                        <div className="nav-right">
                            <NavLink to='account'>Account</NavLink>
                        </div>
                    </div>
                </menu>
            </nav>
        </header>

        <Routes>
            <Route path='./home' element={<Home />} />
            <Route path='./account' element={<Account />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
            <a href="https://github.com/briannonw/startup">Briannon Woolsey's GitHub</a>
        </footer>
    </div>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }