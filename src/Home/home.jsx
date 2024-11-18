import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

export function Home() {
  const [natureImage, setNatureImage] = useState('');
  const [carImage, setCarImage] = useState('');

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
  }, [apiKey]);

  return (
    <main>
      <h1>Personality Quizzes</h1>
      <div className="boxes">
        <div className="box">
          <div className="quiz-img">
            {/* Use the fetched nature image */}
            {natureImage ? (
              <img className="home-img" src={natureImage} alt="Nature" />
            ) : (
              <p>Loading nature image...</p>
            )}
          </div>
          <Link to="/quiz_1"><h3>What Season Are You?</h3></Link>
          <p>Likes: </p>
          <p>Dislikes: </p>
        </div>
        <div className="box">
          <div className="quiz-img">
            {/* Use the fetched car image */}
            {carImage ? (
              <img className="home-img" src={carImage} alt="Car" />
            ) : (
              <p>Loading car image...</p>
            )}
          </div>
          <Link to="/quiz_2"><h3>What Vehicle Should You Drive?</h3></Link>
          <p>Likes: </p>
          <p>Dislikes: </p>
        </div>
      </div>
    </main>
  );
}
