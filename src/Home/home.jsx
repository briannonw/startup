import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main>
        <h1>Personality Quizzes</h1>
        <div className="boxes">
            <div className="box">
                <div className="quiz-img">
                    <img className="home-img" src="https://c8.alamy.com/comp/2HNPHJE/four-seasons-concept-with-spring-blossom-summer-beach-autumn-leaves-and-snow-2HNPHJE.jpg" alt="Pic for Quiz 1" />
                </div>
                <Link to="/quiz_1"><h3>What Season Are You?</h3></Link>
                <p>Likes: </p>
                <p>Dislikes: </p>
            </div>
            <div className="box">
                <div className="quiz-img">
                    <img className="home-img" src="https://c8.alamy.com/comp/2HNPHJE/four-seasons-concept-with-spring-blossom-summer-beach-autumn-leaves-and-snow-2HNPHJE.jpg" alt="Pic for Quiz 2" />
                </div>
                <Link to="/quiz_2"><h3>Quiz 2</h3></Link>
                <p>Likes: </p>
                <p>Dislikes: </p>
            </div>
        </div>
    </main>
  );
}