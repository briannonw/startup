import React, { useState, useEffect } from 'react';
import './quiz_1.css';

export function Quiz_1({}) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [natureImage, setNatureImage] = useState('');
  const [feedback, setFeedback] = useState({ likes: 0, dislikes: 0 });
  const [ws, setWs] = useState(null);

  const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;

  const questions = [
    {
      id: "q1",
      text: "Where Is Your Favorite Place to Spend Your Free Time?",
      options: [
        { value: "mountains", label: "Mountains", season: "Winter", img: "https://img.aestheticwallpaperai.com/wallpapers/ac34ba69-8580-463d-97f9-08195f9a4989.webp" },
        { value: "ocean", label: "Ocean", season: "Summer", img: "https://w0.peakpx.com/wallpaper/397/320/HD-wallpaper-ocean-waves-at-sunset-ocean-waves-sunset-nature.jpg" },
        { value: "city", label: "City", season: "Spring", img: "https://cdn.openart.ai/stable_diffusion/985e6e634e7cadf3b8c297ffddedb8f80d3659c6_2000x2000.webp" },
        { value: "countryside", label: "Countryside", season: "Fall", img: "https://i.pinimg.com/736x/71/fa/d6/71fad64710b7d7f0aadd0cf4ae38a0cf.jpg" },
      ],
    },
    {
      id: "q2",
      text: "What Is Your Favorite Fruit?",
      options: [
        { value: "cherries", label: "Cherries", season: "Spring", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROPET4Zc40xn5neVO4ThlMewl2bXQaFvZLyA&s" },
        { value: "apples", label: "Apples", season: "Fall", img: "https://images.squarespace-cdn.com/content/v1/5661b263e4b0830bdc162128/1531245497639-JRROBNGN7IAZD5E422HC/red-apples-1521577242.jpg" },
        { value: "watermelon", label: "Watermelon", season: "Summer", img: "https://i.pinimg.com/736x/1c/b4/9e/1cb49e2f17d4f6471b340d66ef422c91.jpg" },
        { value: "pomegranates", label: "Pomegranates", season: "Winter", img: "https://i.pinimg.com/236x/4e/42/d8/4e42d8fb2a5b220b9f2b5c524482271a.jpg" },
      ],
    },
    {
      id: "q3",
      text: "What Is the Ideal Temperature?",
      options: [
        { value: "70-80°F", label: "70-80°F", season: "Fall", img: "https://blog.certifiedmtp.com/wp-content/uploads/2024/06/a36db4ff-1bff-4560-a17c-d149a6b409c8.png" },
        { value: "40-50°F", label: "40-50°F", season: "Winter", img: "https://www.shutterstock.com/image-photo/fahrenheit-celsius-scale-white-round-260nw-1568150494.jpg" },
        { value: "90-100°F", label: "90-100°F", season: "Summer", img: "https://www.shutterstock.com/image-photo/fahrenheit-scale-thermometer-isolated-on-260nw-1845980626.jpg" },
        { value: "50-60°F", label: "50-60°F", season: "Spring", img: "https://as1.ftcdn.net/v2/jpg/03/69/39/04/1000_F_369390402_mB9BqCKH0rvVFZIWfULpQrf7kcMcx6Ia.jpg" },
      ],
    },
    {
      id: "q4",
      text: "What Is Your Favorite Element?",
      options: [
        { value: "Water", label: "Water", season: "Winter", img: "https://wallpapers.com/images/hd/water-drop-pictures-qa6cdnusxq4muojp.jpg" },
        { value: "Earth", label: "Earth", season: "Spring", img: "https://i.pinimg.com/736x/2f/2a/d1/2f2ad1f3b59c7e0327358ee49aed708c.jpg" },
        { value: "Fire", label: "Fire", season: "Summer", img: "https://i.pinimg.com/originals/42/f0/05/42f0056455932df235e1bf6ca8aaa355.jpg" },
        { value: "Air", label: "Air", season: "Fall", img: "https://images.squarespace-cdn.com/content/v1/55ca27a6e4b0f52348481f01/1602273588016-OA2XA6CAVBT3ZVLWLVY7/air+element.jpg" },
      ],
    },
    {
      id: "q5",
      text: "Where Would You Like to Live?",
      options: [
        { value: "Mansion", label: "Mansion", season: "Winter", img: "https://img.freepik.com/premium-photo/photo-mansion-with-minimalist-aesthetic_778780-60573.jpg" },
        { value: "Bungalow", label: "Bungalow", season: "Fall", img: "https://i.pinimg.com/736x/21/b5/77/21b577c785c90f5a482af55fb315db4d.jpg" },
        { value: "Apartment", label: "Apartment", season: "Spring", img: "https://res.cloudinary.com/brickandbatten/image/upload/c_scale,w_464,h_693,dpr_2/f_auto,q_auto/v1645599206/wordpress_assets/62482-Black-Swan-Seapearl-opt1-A.jpg?_i=AA" },
        { value: "Tent", label: "Tent", season: "Summer", img: "https://flungmagazine.com/wp-content/uploads/2018/04/Bell-Tent-straight-shot-feature-image.jpg" },
      ],
    },
    {
      id: "q6",
      text: "What Is Your Favorite Activity?",
      options: [
        { value: "Swimming", label: "Swimming", season: "Summer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBZy1Dg6q7cZYBhMM1jMwEVaVAWyguGEB0GA&s" },
        { value: "Tennis", label: "Tennis", season: "Spring", img: "https://media.istockphoto.com/id/1416908778/photo/group-of-tennis-balls-and-rackets-against-a-net-on-an-empty-court-in-a-sports-club-during-the.jpg?s=612x612&w=0&k=20&c=ddeFyUcun4YjlU4MemKyN5q7DPr6qUSFye8GFUI5eZo=" },
        { value: "Hiking", label: "Hiking", season: "Fall", img: "https://64.media.tumblr.com/e9c3e02db7167b6d6a537820640a3b75/tumblr_ptvjkrdFzQ1sciduvo1_1280.jpg" },
        { value: "Snow Skiing", label: "Snow Skiing", season: "Winter", img: "https://i.pinimg.com/736x/ee/49/61/ee4961fafd47d9f0b13eb26edb1cfa5a.jpg" },
      ],
    },
    {
      id: "q7",
      text: "What Is Your Favorite Type of Boots?",
      options: [
        { value: "Rain Boots", label: "Rain Boots", season: "Spring", img: "https://png.pngtree.com/thumb_back/fw800/background/20230906/pngtree-a-pair-of-yellow-rain-boots-are-covered-in-water-image_13299335.jpg" },
        { value: "Hiking Boots", label: "Hiking Boots", season: "Fall", img: "https://cdn.shopify.com/s/files/1/0252/9735/4833/files/woman-wearing-hiking-boots-on-rock.jpg?v=1669852983" },
        { value: "Snow Boots", label: "Snow Boots", season: "Winter", img: "https://www.switchbacktravel.com/sites/default/files/images/articles/Winter%20Boots%20%28Sorel%20Caribou%20in%20snow%29.jpg" },
        { value: "No Boots", label: "No Boots", season: "Summer", img: "https://www.shutterstock.com/shutterstock/photos/396731062/display_1500/stock-photo-no-rain-boots-sign-396731062.jpg" },
      ],
    },
    {
      id: "q8",
      text: "What Is Your Favorite Drink?",
      options: [
        { value: "Cider", label: "Cider", season: "Fall", img: "https://t3.ftcdn.net/jpg/00/70/26/46/360_F_70264619_a6NJ9BcYvtNmuBZoscTEthAFsmhgrNcI.jpg" },
        { value: "Lemonade", label: "Lemonade", season: "Summer", img: "https://i0.wp.com/thejoyfilledkitchen.com/wp-content/uploads/2021/04/Lemonade-1-2.jpg?resize=585%2C1024&ssl=1" },
        { value: "Tea", label: "Tea", season: "Spring", img: "https://www.the-tea-crane.com/wp-content/uploads/2019/11/81VGqCXNEL.jpg" },
        { value: "Eggnog", label: "Eggnog", season: "Winter", img: "https://media.istockphoto.com/id/1338595351/photo/eggnog-with-spicy-cinnamon-christmas-and-winter-holidays-cozy-cocktail-with-cinnamon-and.jpg?s=612x612&w=0&k=20&c=OCnu7yMpHR5MXosURHsLfxpN3UPwEtCtnNUicxuQZi4=" },
      ],
    },
    {
      id: "q9",
      text: "What Is Your Zodiac Sign?",
      options: [
        { value: "Gemini, Libra, or Aquarius", label: "Gemini, Libra, or Aquarius", season: "Spring", img: "https://www.shutterstock.com/image-vector/gemini-libra-aquarius-zodiac-signs-260nw-2303850907.jpg" },
        { value: "Taurus, Virgo, or Capricorn", label: "Taurus, Virgo, or Capricorn", season: "Fall", img: "https://c8.alamy.com/comp/2R37E4N/taurus-virgo-capricorn-earth-element-zodiac-signs-set-of-astrology-cards-for-stories-horoscope-banner-vintage-art-style-linear-hand-drawing-ve-2R37E4N.jpg" },
        { value: "Aries, Leo, or Sagittarius", label: "Aries, Leo, or Sagittarius", season: "Summer", img: "https://thumbs.dreamstime.com/b/zodiac-signs-aries-leo-sagittarius-fire-element-mystic-astrology-card-set-horoscope-banner-animals-black-background-282579922.jpg" },
        { value: "Cancer, Scorpio, or Pisces", label: "Cancer, Scorpio, or Pisces", season: "Winter", img: "https://www.shutterstock.com/image-vector/zodiac-signs-cancer-scorpio-pisces-260nw-2319000229.jpg" },
      ],
    },
    {
      id: "q10",
      text: "What Is Your Favorite Color?",
      options: [
        { value: "Orange", label: "Orange", season: "Fall", img: "https://garden.spoonflower.com/c/8145303/p/f/m/orp7PuHfR3jEwezsB2OfL5gHszOQzVqudLklAx_Ns9YBF7NyxL0/Blaze%20Orange%20Solid%20Color.jpg" },
        { value: "Red", label: "Red", season: "Summer", img: "https://wallpapers.com/images/featured/solid-red-background-oaui1n3oheyxwp9u.jpg" },
        { value: "Green", label: "Green", season: "Spring", img: "https://thumbs.dreamstime.com/b/green-solid-color-background-matte-texture-wallpaper-design-surface-151675837.jpg" },
        { value: "Blue", label: "Blue", season: "Winter", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN3zKia8sil-WrodDChO5FDuQ8yXXfRIfyCQ&s" },
      ],
    },
  ];
  const handleOptionClick = (questionId, optionValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  const handleSubmit = () => {
    if (!allQuestionsAnswered) {
      alert("Please answer all questions before submitting!");
      return;
    }

    if (result) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setAnswers({});
      setResult(null);
    } else {
      const scores = { Winter: 0, Spring: 0, Summer: 0, Fall: 0 };

      Object.entries(answers).forEach(([questionId, answerValue]) => {
        const question = questions.find((q) => q.id === questionId);
        const option = question.options.find((opt) => opt.value === answerValue);
        if (option) {
          scores[option.season] += 1;
        }
      });

      const calculatedResult = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
      setResult(calculatedResult);

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is missing');
        throw new Error('User token is undefined or missing.');
      }

      fetch('/api/results', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
              quiz: 'quiz_1',
              result: calculatedResult,
          }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Result saved:', data);
        alert('Your result has been successfully saved!');
      })
      .catch(error => {
        console.error('Error saving result:', error);
        alert('There was an issue saving your result. Please try again.');
      });
    }
  };
  
  const allQuestionsAnswered = questions.every((q) => answers[q.id]);
  
  useEffect(() => {
    // Fetch random nature image
    const fetchNatureImage = async () => {
      try {
        const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=season&image_type=photo`);
        const data = await response.json();
        const randomNature = data.hits[Math.floor(Math.random() * data.hits.length)];
        setNatureImage(randomNature?.webformatURL || '');
      } catch (error) {
        console.error('Error fetching nature image:', error);
      }
    };

    fetchNatureImage();

    // 1. Fetch initial quiz data (likes/dislikes) from the database
    const fetchFeedback = async () => {
      try {
        const response = await fetch('/api/feedback');  // Corrected endpoint for feedback
        const data = await response.json();
        console.log(data); // Add this to inspect the data structure
        if (data && data.quiz_1) {
          // Directly access the likes and dislikes from the quiz_1 object
          setFeedback({
            likes: data.quiz_1.likes || 0,
            dislikes: data.quiz_1.dislikes || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
  
    fetchFeedback();

    const socket = new WebSocket('wss://startup.cs260project.click'); // Adjust for production URL
    setWs(socket);
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
  
      if (data.type === 'like-dislike-update') {
        console.log('Update received:', data);
        // Update the feedback state with the new like/dislike counts
        setFeedback((prev) => ({
          ...prev,
          likes: data.likes ?? prev.likes,
          dislikes: data.dislikes ?? prev.dislikes,
        }));
      }
  
      if (data.type === 'initialState' || data.type === 'feedbackUpdate') {
        setFeedback((prev) => ({
          ...prev,
          likes: data.likes ?? prev.likes,
          dislikes: data.dislikes ?? prev.dislikes,
        }));
      }
    };
  
    return () => {
      socket.close();
    };

  }, []);  // Empty dependency array ensures this runs only once on mount
  
  const handleFeedback = (quizId, feedbackType) => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'updateFeedback', quizId, feedbackType }));
    }
  };

  return (
    <main className="main-text">
      <h1>What Season Are You?</h1>
      <div className="top-pic">
        <img
          className="main-img"
          src={natureImage || 'https://c8.alamy.com/comp/2HNPHJE/four-seasons-concept-with-spring-blossom-summer-beach-autumn-leaves-and-snow-2HNPHJE.jpg'}
          alt="Random nature img"
        />
      </div>

      {questions.map((question) => (
        <div key={question.id} className="question">
          <h3>{question.text}</h3>
          <div className="options">
            {question.options.map((option) => (
              <div
                key={option.value}
                className={`option ${answers[question.id] === option.value ? "selected" : ""}`}
                onClick={() => handleOptionClick(question.id, option.value)}
              >
                <img src={option.img} alt={option.label} />
                <p>{option.label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="button-submit">
        <button onClick={handleSubmit}>
          {result ? "Try Again" : "Submit"}
        </button>
      </div>

      {result && (
        <div>
          <h4 className="result">Your Season Is:</h4>
          <h3 className="result">{result}</h3>
          <h4 className="feedback">Feedback:</h4>
          <p className="like-count">Quiz Likes: {feedback.likes}</p>
          <p className="like-count">Quiz Dislikes: {feedback.dislikes}</p>
          <div className="button-feedback">
            <button
              className="like-button"
              onClick={() => handleFeedback('quiz_1', 'like')}
            >
              Like
            </button>
            <button
              onClick={() => handleFeedback('quiz_1', 'dislike')}
            >
              Dislike
            </button>
          </div>
        </div>
      )}
    </main>
  );
}