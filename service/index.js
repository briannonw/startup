const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};
let results = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Route for account creation
apiRouter.post('/auth/create', async (req, res) => {
  try {
    console.log('Received request for account creation');
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password: ${password}`);

    // Check if the username already exists
    const user = users[username];
    if (user) {
      console.log('Username already exists');
      return res.status(409).json({ msg: 'Username already exists' });  // Status code 409 for conflict
    }

    // Create the new user
    const newUser = { username, password, token: uuid.v4() };
    users[username] = newUser;
    console.log(`Created new user: ${JSON.stringify(newUser)}`);

    // Return the token for the new user
    return res.status(201).json({ token: newUser.token });
  } catch (error) {
    console.error('Error during account creation:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

const jwt = require('jsonwebtoken'); // You would need to install the 'jsonwebtoken' package

const SECRET_KEY = 'your-secret-key'; // Replace with your secret key

apiRouter.post('/auth/login', (req, res) => {
  try {
    console.log('Received login request');
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password: ${password}`);

    // Check if the user exists
    const user = users[username];
    console.log('Current user:', user); // Log the user object to check

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    // Validate the password
    if (user.password !== password) {
      console.log('Incorrect password');
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    // Generate a new token (e.g., using JWT)
    const newToken = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Update the user's token with the new one (optional)
    user.token = newToken;

    console.log('New user token:', newToken); // Log the new token

    // Return the new token for the user
    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});





//saving quiz results
apiRouter.post('/results', (req, res) => {
  const { quiz, result } = req.body;
  const token = req.headers.authorization?.split(' ')[1];  // Extract token

  console.log('Received token:', token);
  console.log('Current users:', users);  // Log the users object to check if the token is there

  const user = Object.values(users).find((u) => u.token === token);

  if (!user) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  results.push({
    username: user.username,
    quiz,
    result,
    timestamp: new Date().toISOString(),
  });

  return res.status(201).json({ msg: 'Result saved' });
});


// Route for retrieving quiz results
apiRouter.get('/results', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];  // Get token from Authorization header (Bearer <token>)

    // If token is missing, return an error
    if (!token) {
      console.error("No token provided");
      return res.status(401).json({ msg: 'Unauthorized, no token provided' });
    }

    console.log('Current users:', users);
    const user = Object.values(users).find((u) => u.token === token);
    
    // If no matching user is found, return an error
    if (!user) {
      console.error(`Invalid token: ${token}`);
      return res.status(401).json({ msg: 'Unauthorized, invalid token' });
    }

    // Filter results for the authenticated user
    const userResults = results.filter(result => result.username === user.username);

    // If no results are found for the user, you can log that as well
    if (userResults.length === 0) {
      console.log(`No results found for user: ${user.username}`);
    }

    // Return the user's quiz results
    return res.status(200).json({ results: userResults });

  } catch (error) {
    // Catch and log any unexpected errors
    console.error('Error retrieving results:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Route for logout
apiRouter.delete('/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  try {
    const user = Object.values(users).find((u) => u.token === token);

    if (user) {
      delete user.token;
      console.log(`User logged out: ${user.username}`);
    } else {
      console.log(`Invalid token: ${token}`);
    }

    res.status(204).end();
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json({ msg: 'Internal Server Error during logout' });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);  // Log the full error stack for debugging
  res.status(500).json({ msg: 'Internal Server Error' });  // Send a generic server error message
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});