import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

export function Home() {
  const [natureImage, setNatureImage] = useState('');
  const [carImage, setCarImage] = useState('');
  const [feedback, setFeedback] = useState({ quiz_1: { likes: 0, dislikes: 0 }, quiz_2: { likes: 0, dislikes: 0 } });
  const [ws, setWs] = useState(null);

  const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;

  useEffect(() => {
    // Fetch a random nature image from Pixabay
    const fetchNatureImage = async () => {
      const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=season&image_type=photo`);
      const data = await response.json();
      if (data.hits.length > 0) {
        setNatureImage(data.hits[Math.floor(Math.random() * data.hits.length)].webformatURL);
      }
    };

    // Fetch a random car image from Pixabay
    const fetchCarImage = async () => {
      const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=car&image_type=photo`);
      const data = await response.json();
      if (data.hits.length > 0) {
        setCarImage(data.hits[Math.floor(Math.random() * data.hits.length)].webformatURL);
      }
    };

    // Fetch both images on component mount
    fetchNatureImage();
    fetchCarImage();


    // 1. Fetch initial quiz data (likes/dislikes) from the database
    const fetchFeedback = async () => {
      try {
        const response = await fetch('/api/feedback'); // Corrected endpoint for feedback
        const data = await response.json();
        console.log(data); // Add this to inspect the data structure
        if (data.quiz_1 && data.quiz_2) {
          setFeedback({
            quiz_1: { likes: data.quiz_1.likes || 0, dislikes: data.quiz_1.dislikes || 0 },
            quiz_2: { likes: data.quiz_2.likes || 0, dislikes: data.quiz_2.dislikes || 0 },
          });
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
  
    fetchFeedback();
  
    const socket = new WebSocket('wss://startup.cs260project.click'); // Adjust port if necessary
    setWs(socket);
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
  
      if (data.type === 'like-dislike-update') {
        console.log('Update received:', data);
        // Update the feedback state with the new like/dislike counts
        setFeedback((prev) => ({
          ...prev,
          [data.quizId]: {
            likes: data.likes ?? prev[data.quizId]?.likes,
            dislikes: data.dislikes ?? prev[data.quizId]?.dislikes,
          },
        }));
      }
  
      if (data.type === 'initialState' || data.type === 'feedbackUpdate') {
        setFeedback((prev) => ({
          ...prev,
          [data.quizId]: {
            likes: data.likes ?? prev[data.quizId]?.likes,
            dislikes: data.dislikes ?? prev[data.quizId]?.dislikes,
          },
        }));
      }
    };
  
    return () => {
      socket.close();
    };

  }, [apiKey]);

  return (
    <main>
      <h1>Personality Quizzes</h1>
      <div className="boxes">
        <div className="box">
          <div className="quiz-img">
            {/* Use the fetched nature image */}
            {natureImage ? (
              <img 
                className="home-img" 
                src={natureImage || 'https://c8.alamy.com/comp/2HNPHJE/four-seasons-concept-with-spring-blossom-summer-beach-autumn-leaves-and-snow-2HNPHJE.jpg'}
                alt="Nature"
              />
            ) : (
              <p>Loading nature image...</p>
            )}
          </div>
          <Link to="/quiz_1"><h3>What Season Are You?</h3></Link>
          <p>Like count: {feedback.quiz_1.likes}</p>
          <p>Dislike count: {feedback.quiz_1.dislikes}</p>
        </div>
        <div className="box">
          <div className="quiz-img">
            {/* Use the fetched car image */}
            {carImage ? (
              <img 
                className="home-img" 
                src={carImage || 'https://c8.alamy.com/comp/HJWX2N/various-types-of-car-shapes-as-vector-graphic-HJWX2N.jpg'} // Fallback image if Pixabay API fails
                alt="Car" 
              />
            ) : (
              <p>Loading car image...</p>
            )}
          </div>
          <Link to="/quiz_2"><h3>What Vehicle Should You Drive?</h3></Link>
          <p>Like count: {feedback.quiz_2.likes}</p>
          <p>Dislike count: {feedback.quiz_2.dislikes}</p>
        </div>
      </div>
    </main>
  );
}
