const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function quizLikes(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  // Central state for likes and dislikes
  const quizzes = {
    quiz1: { likes: 0, dislikes: 0 },
    quiz2: { likes: 0, dislikes: 0 },
  };

  let connections = [];

  // Upgrade HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Send the current state to the newly connected client
    ws.send(JSON.stringify({ type: 'initialState', quizzes }));

    // Handle incoming messages
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data);

        if (message.type === 'update') {
          const { quizId, action } = message;
          if (quizzes[quizId]) {
            if (action === 'like') {
              quizzes[quizId].likes += 1;
            } else if (action === 'dislike') {
              quizzes[quizId].dislikes += 1;
            }

            // Broadcast the updated state to all clients
            const updateMessage = JSON.stringify({
              type: 'update',
              quizId,
              likes: quizzes[quizId].likes,
              dislikes: quizzes[quizId].dislikes,
            });

            connections.forEach((c) => {
              c.ws.send(updateMessage);
            });
          }
        }
      } catch (error) {
        console.error('Error processing message:', error);
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
