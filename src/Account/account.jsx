import React from 'react';
import './account.css'

export function Account({ userName, onLogout }) {
    const [quizResults, setQuizResults] = useState([]);
   
    useEffect(() => {
        fetch('/api/results', {
            method: 'GET',
            headers: {
                Authorization: userToken,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch results');
                }
                return response.json();
            })
            .then((data) => {
                setQuizResults(data);
            })
            .catch((error) => {
                console.error('Error fetching results:', error);
            });
    }, [userToken]);
    
    const groupedResults = quizResults.reduce((acc, result) => {
        if (!acc[result.quiz]) {
            acc[result.quiz] = [];
        }
        acc[result.quiz].push(result);
        return acc;
    }, {});

    return (
    <main>
        <h1>{userName}</h1>
        <div className="boxes">
            <div className="box">
                <h3>What Season Are You?</h3>
                <p>result 1</p>
                <p>result 2</p>
            </div>
            <div className="box">
                <h3>What Car Should You Drive?</h3>
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