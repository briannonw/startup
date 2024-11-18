import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import './account.css';

export function Account({ userName, onLogout }) {
  const [quizResults, setQuizResults] = useState([]);
  const navigate = useNavigate();  // Initialize the navigate function

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token is missing');
    // Log out the user and clear localStorage
    localStorage.removeItem('token');
    onLogout();  // Call onLogout to handle any other logout-related actions (like state changes)
    navigate('/login');  // Redirect to the login page
    return null;  // Prevent rendering the component
  }

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Send DELETE request to backend to log out
      const response = await fetch('/api/auth/logout', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear localStorage after successful logout
      localStorage.removeItem('token');
      onLogout();  // Call onLogout to handle any additional state or actions on logout
      navigate('/login');  // Redirect to the login page
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    console.log('User token:', token);  // Log the token

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

  console.log('Grouped Results:', groupedResults);

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
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </main>
  );
}
