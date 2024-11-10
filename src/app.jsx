import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className='body bg-dark text-light'>
      <header>
            <nav>
                <menu>
                    <div class="nav-left">
                        <a href="home.html">Home</a>
                        <div class="nav-right">
                            <a href="account.html">Account</a>
                        </div>
                    </div>
                </menu>
            </nav>
        </header>

        <main>App components go here</main>

        <footer>
            <a href="https://github.com/briannonw/startup">Briannon Woolsey's GitHub</a>
        </footer>
    </div>
  );
}