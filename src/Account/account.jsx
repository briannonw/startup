import React, { useState, useEffect } from 'react';
import './account.css'

export function Account({ userName, onLogout}) {
    const [quizResults, setQuizResults] = useState([]);
   
    const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is missing');
        throw new Error('User token is undefined or missing.');
      }

    useEffect(() => {
        console.log("User token:", token);  // Log the token

        fetch('/api/results', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch results');
                }
                return response.json();
            })
            .then((data) => {
                setQuizResults(data.results);
            })
            .catch((error) => {
                console.error('Error fetching results:', error);
            });
    }, [token]);
    
    const groupedResults = quizResults.reduce((acc, result) => {
        if (!acc[result.quiz]) {
            acc[result.quiz] = [];
        }
        acc[result.quiz].push(result);
        return acc;
    }, {});
    
    console.log("Grouped Results:", groupedResults);

    return (
    <main>
        <h1>{userName}</h1>
        <div className="boxes">
            <div className="box">
                <h3>What Season Are You?</h3>
                {groupedResults['quiz_1']?.length ? (
                    groupedResults['quiz_1'].map((r, index) => (
                        <p key={index}>{r.result} ({new Date(r.timestamp).toLocaleString()})</p>
                    ))
                ) : (
                    <p>No results yet</p>
                )}
            </div>
            <div className="box">
                <h3>What Car Should You Drive?</h3>
                {groupedResults['quiz_2']?.length ? (
                    groupedResults['quiz_2'].map((r, index) => (
                        <p key={index}>{r.result} ({new Date(r.timestamp).toLocaleString()})</p>
                    ))
                ) : (
                    <p>No results yet</p>
                )}
            </div>
        </div>
        <div className="button-logout">
            <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
    </main>
  );
}