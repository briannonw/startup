const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const axios = require('axios');
const { getLikeResults, updateLikeResults } = require('./database');  // Add imports for database functions

function quizLikes(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  let connections = [];

  // Upgrade HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  wss.on('connection', async (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    try {
      // Fetch the initial state from your API
      const response = await axios.get('http://startup.cs260project.click/api/feedback');
      const quizzes = response.data;

      // Send the current state to the newly connected client
      ws.send(JSON.stringify({ type: 'initialState', quizzes }));
    } catch (error) {
      console.error('Error fetching initial state:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Failed to load quizzes.' }));
    }

    // Handle incoming messages
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log('Received message:', message); // Log parsed message
    
        if (message.type === 'updateFeedback') {
          const { quizId, feedbackType } = message;
    
          // Update the feedback in the database
          const updatePayload = { quizId, action: feedbackType };
          const apiResponse = await axios.post('http://startup.cs260project.click/api/feedback', updatePayload);
    
          const updatedQuiz = apiResponse.data;
    
          // Log the updated data
          console.log('Updated quiz data:', updatedQuiz);
    
          // Broadcast the updated state to all clients
          const updateMessage = JSON.stringify({
            type: 'like-dislike-update',
            quizId,
            likes: updatedQuiz.likes,
            dislikes: updatedQuiz.dislikes,
          });
          console.log('Sending update message:', updateMessage);
    
          connections.forEach((c) => {
            c.ws.send(updateMessage);
          });
        }
      } catch (error) {
        console.error('Error processing message:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Failed to process update.' }));
      }
    });    

    // Remove closed connections
    ws.on('close', () => {
      connections = connections.filter((c) => c.id !== connection.id);
    });

    // Keep connections alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Ping connections to keep them alive
  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { quizLikes };
