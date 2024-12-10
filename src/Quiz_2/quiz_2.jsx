import React, { useState, useEffect } from 'react';
import './quiz_2.css';

export function Quiz_2({}) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [carImage, setCarImage] = useState('');
  const [feedback, setFeedback] = useState({ likes: 0, dislikes: 0 });
  const [ws, setWs] = useState(null);

  const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;

  const questions = [
    {
      id: "q1",
      text: "Which Flintstone Character Do You Relate to?",
      options: [
        { value: "Fred Flintstone", label: "Fred Flintstone", vehicle: "Sedan", img: "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/01/Fred-Flintstone.jpg" },
        { value: "Wilma Flintstone", label: "Wilma Flintstone", vehicle: "Mini Van", img: "https://cdn.hanna-barberawiki.com/thumb/9/97/Wilma_Flintstone.png/1200px-Wilma_Flintstone.png" },
        { value: "Barney Rubble", label: "Barney Rubble", vehicle: "SUV", img: "https://cdn.hanna-barberawiki.com/thumb/e/e2/Barney_Rubble.png/300px-Barney_Rubble.png" },
        { value: "Betty Rubble", label: "Betty Rubble", vehicle: "Sports Car", img: "https://e7.pngegg.com/pngimages/255/761/png-clipart-flintstones-character-betty-rubble-at-the-movies-cartoons.png" },
      ],
    },
    // {
    //   id: "q2",
    //   text: "Which Generation Do You Belong To?",
    //   options: [
    //     { value: "Baby Boomer", label: "Baby Boomer", vehicle: "Sports Car", img: "https://c8.alamy.com/comp/EMY14P/background-text-pattern-concept-wordcloud-illustration-of-baby-boomers-EMY14P.jpg" },
    //     { value: "Gen Z", label: "Gen Z", vehicle: "Mini Van", img: "https://www.shutterstock.com/image-illustration/generation-z-word-cloud-concept-260nw-424332475.jpg" },
    //     { value: "Millennial", label: "Millennial", vehicle: "Sedan", img: "https://www.shutterstock.com/image-illustration/generation-y-word-cloud-concept-260nw-423839059.jpg" },
    //     { value: "Gen X", label: "Gen X", vehicle: "SUV", img: "https://c8.alamy.com/comp/EMY14Y/background-text-pattern-concept-wordcloud-illustration-of-generation-EMY14Y.jpg" },
    //   ],
    // },
    // {
    //   id: "q3",
    //   text: "How Many Traffic Violations Do You Receive per Year?",
    //   options: [
    //     { value: "One", label: "One", vehicle: "Sedan", img: "https://media.istockphoto.com/id/1416797815/photo/golden-number-one.jpg?s=612x612&w=0&k=20&c=A1AOP7RZK8Rkk2yxEumTlWmhQE-0nGfxVz3Ef39Dzxc=" },
    //     { value: "Two", label: "Two", vehicle: "SUV", img: "https://i.ytimg.com/vi/sz-7LTCYgIs/hqdefault.jpg" },
    //     { value: "Three", label: "Three", vehicle: "Mini Van", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrm4vq08Bcz7UDsNLDaN_46Vx55dbDhmXCUw&s" },
    //     { value: "Four", label: "Four", vehicle: "Sports Car", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Eo_circle_pink_number-4.svg/1200px-Eo_circle_pink_number-4.svg.png" },
    //   ],
    // },
    // {
    //   id: "q4",
    //   text: "What Describes You Best?",
    //   options: [
    //     { value: "Cool as a Cucumber", label: "Cool as a Cucumber", vehicle: "Sports Car", img: "https://ih1.redbubble.net/image.3359016754.6688/st,small,507x507-pad,600x600,f8f8f8.jpg" },
    //     { value: "Hot Mess", label: "Hot Mess", vehicle: "Mini Van", img: "https://images.getbento.com/accounts/90f9564d8620cfbdb3e7caadfdc5f726/media/images/Hotmess-newlogo-transparent.png?w=1000&fit=max&auto=compress,format&h=1000" },
    //     { value: "Zen as a Yogi", label: "Zen as a Yogi", vehicle: "SUV", img: "https://i.scdn.co/image/ab67616d00001e027d0f7793aeb21ca1701e181d" },
    //     { value: "Work Work Work", label: "Work Work Work", vehicle: "Sedan", img: "https://ih1.redbubble.net/image.200328489.3476/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg" },
    //   ],
    // },
    // {
    //   id: "q5",
    //   text: "What Color Would Your Vehicle Be?",
    //   options: [
    //     { value: "Blue", label: "Blue", vehicle: "Sedan", img: "https://www.solidbackgrounds.com/images/7680x4320/7680x4320-medium-electric-blue-solid-color-background.jpg" },
    //     { value: "White", label: "White", vehicle: "Mini Van", img: "https://www.ledr.com/colours/white.jpg" },
    //     { value: "Red", label: "Red", vehicle: "Sports Car", img: "https://img.freepik.com/premium-photo/red-color-backgrounds_984027-210458.jpg" },
    //     { value: "Silver", label: "Silver", vehicle: "SUV", img: "https://img.freepik.com/premium-vector/abstract-solid-silver-titanium-plate-material-with-grunge-line-pattern-decorative-background_121035-214.jpg" },
    //   ],
    // },
    // {
    //   id: "q6",
    //   text: "Which Disney Character Do You Relate To?",
    //   options: [
    //     { value: "Eeyore", label: "Eeyore", vehicle: "Sedan", img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/disney-winnie-the-pooh-eeyore-large-face-malaky-ghazi.jpg" },
    //     { value: "Snow White", label: "Snow White", vehicle: "Mini Van", img: "https://thebikeeatingtree.wordpress.com/wp-content/uploads/2014/11/snow-white.jpg" },
    //     { value: "Cruella de Vil", label: "Cruella de Vil", vehicle: "Sports Car", img: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/02/cruella-de-vil-social.jpg" },
    //     { value: "Gaston", label: "Gaston", vehicle: "SUV", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXcTYBcO4p5P97WEavAkKzta7lW6gqDr4GiSGWEHbZJRvSM6GelY-3dIo26Nv1EdAwJ3UGMqm8El2AY3dIyuHvXl35QY4ztHWisIvALaLIRBSopOSz683AGLbbPaGg_fcpmV-FB40iT_I/s1600/beauty_and_the_beast_gaston.jpg" },
    //   ],
    // },
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
      // Reset the form if a result already exists
      window.scrollTo({ top: 0, behavior: "smooth" });
  
      setAnswers({});
      setResult(null);
    } else {
      // Calculate the quiz result
      const scores = { Sedan: 0, "Mini Van": 0, SUV: 0, "Sports Car": 0 };
  
      Object.entries(answers).forEach(([questionId, answerValue]) => {
        const question = questions.find((q) => q.id === questionId);
        const option = question?.options.find((opt) => opt.value === answerValue);
        if (option) {
          scores[option.vehicle] += 1;
        }
      });
  
      const calculatedResult = Object.keys(scores).reduce(
        (a, b) => (scores[a] > scores[b] ? a : b)
      );
      setResult(calculatedResult);
  
      // Retrieve token
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is missing');
        throw new Error('User token is undefined or missing.');
      }

      // Debugging logs
      console.log('Answers:', answers);
      console.log('Scores:', scores);
      console.log('Calculated Result:', calculatedResult);
      console.log('User Token:', token);
  
      console.log('Request body:', {
        quiz: 'quiz_2',
        result: calculatedResult,
      });
      
      console.log('Sending request...');
      // Send the result to the backend
      fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          quiz: 'quiz_2',
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

  // Fetch a random car image from Pixabay on component mount
  useEffect(() => {
    const fetchCarImage = async () => {
      const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=car&image_type=photo`);
      const data = await response.json();
      const randomCar = data.hits[Math.floor(Math.random() * data.hits.length)];
      setCarImage(randomCar?.webformatURL || '');
    };
  
    fetchCarImage();

    // 1. Fetch initial quiz data (likes/dislikes) from the database
    const fetchFeedback = async () => {
      try {
        const response = await fetch('/api/feedback');  // Corrected endpoint for feedback
        const data = await response.json();
        console.log(data); // Add this to inspect the data structure
        if (data && data.quiz_2) {
          // Directly access the likes and dislikes from the quiz_1 object
          setFeedback({
            likes: data.quiz_2.likes || 0,
            dislikes: data.quiz_2.dislikes || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
  
    fetchFeedback();
  
    const socket = new WebSocket('ws://localhost:4000'); // Adjust port if necessary
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
  
  }, []);
  

  const handleFeedback = (quizId, feedbackType) => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'updateFeedback', quizId, feedbackType }));
    }
  };

  return (
    <main className="main-text">
      <h1>What Vehicle Should You Drive?</h1>
      <div className="top-pic">
        <img
          className="main-img"
          src={carImage || 'https://c8.alamy.com/comp/HJWX2N/various-types-of-car-shapes-as-vector-graphic-HJWX2N.jpg'} // Fallback image if Pixabay API fails
          alt="Random car"
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
          <h4 className="result">Your Luxury Ride Is A:</h4>
          <h3 className="result">{`${result}`}</h3>
          <h4 className="feedback">Feedback:</h4>
          <p>Like count: {feedback.likes}</p>
          <p>Dislike count: {feedback.dislikes}</p>
          <div className="button-feedback">
            <button
              className="like-button"
              onClick={() => handleFeedback('quiz_2', 'like')}
            >
              Like
            </button>
            <button
              onClick={() => handleFeedback('quiz_2', 'dislike')}
            >
              Dislike
            </button>
          </div>
        </div>
      )}
    </main>
  );
}