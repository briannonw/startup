import React from 'react';
import './account.css'

export function Account({ userName, onLogout }) {
    return (
    <main>
        <h1>Username</h1>
        <div className="boxes">
            <div className="box">
                <h3>What Season Are You?</h3>
                <p>result 1</p>
                <p>result 2</p>
            </div>
            <div className="box">
                <h3>Quiz 2</h3>
                <p>result 1</p>
                <p>result 2</p>
            </div>
        </div>
        <div className="button-logout">
            <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
    </main>
  );
}