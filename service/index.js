const express = require('express');
const uuid = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt'); // Required for password validation
const jwt = require('jsonwebtoken'); // Required for token generation
const { getUser, getUserByToken, createUser, addResult, getResults, updateUserToken } = require('./database.js');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const SECRET_KEY = 'your-secret-key'; // Replace with your secret key

// Route for account creation
apiRouter.post('/auth/create', async (req, res) => {
  try {
    console.log('Received request for account creation');
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await getUser(username); // Assuming getUser is a function that checks if the username exists
    if (existingUser) {
      console.log('Username already exists');
      return res.status(409).json({ msg: 'Username already exists' }); // Conflict status code
    }

    // Create a new user in the database
    const newUser = await createUser(username, password); // Assuming createUser handles user creation
    console.log(`Created new user: ${JSON.stringify(newUser)}`);

    // Return the token of the new user
    return res.status(201).json({ token: newUser.token });
  } catch (error) {
    console.error('Error during account creation:', error);
    return res.status(500).json({ msg: 'Internal Server Error' }); // Internal server error if something goes wrong
  }
});

// Route for login
apiRouter.post('/auth/login', async (req, res) => {
  try {
    console.log('Received login request');
    const { username, password } = req.body;

    // Check if the user exists
    const user = await getUser(username);
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('Incorrect password');
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    // Log the existing token
    console.log('Existing token from database:', user.token);

    // Check if the existing token is valid
    const existingToken = user.token;
    if (existingToken) {
      try {
        jwt.verify(existingToken, SECRET_KEY); // Verify token
        console.log('Existing token is still valid');
        return res.status(200).json({ token: existingToken });
      } catch (err) {
        console.log('Existing token is invalid or expired, generating a new one');
      }
    }

    // Generate a new token
    const newToken = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Manually update the user's token in the database
    await updateUserToken(user._id, newToken); // Ensure the correct collection is used

    // Log the new token
    console.log('Generated new token:', newToken);

    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Route for saving quiz results
apiRouter.post('/results', async (req, res) => {
  const { quiz, result } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; // Extract token

  try {
    const user = await getUserByToken(token); // Assuming this retrieves a user document
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const resultEntry = {
      userId: user._id,
      quiz,
      result,
      timestamp: new Date().toISOString(),
    };

    await addResult(resultEntry);
    return res.status(201).json({ msg: 'Result saved' });
  } catch (error) {
    console.error('Error saving result:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Route for retrieving quiz results
apiRouter.get('/results', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  try {
    const user = await getUserByToken(token);
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Retrieve results for the authenticated user by their userId
    const results = await getResults(user._id);  // Call the updated getResults function

    return res.status(200).json({ results });
  } catch (error) {
    console.error('Error retrieving results:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Route for logout
apiRouter.delete('/auth/logout', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token

  try {
    const user = await getUserByToken(token);

    if (!user) {
      console.log(`Invalid token: ${token}`);
      return res.status(401).json({ msg: 'Invalid token' });
    }

    console.log(`Logging out user: ${user.username}`);

    // Invalidate the user's token
    user.token = null;

    // Manually update the user's token in the database
    await updateUserToken(user._id, null); // Set token to null

    res.status(204).end();
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ msg: 'Internal Server Error during logout' });
  }
});

// Catch-all route to serve the index.html file for unmatched routes (e.g., SPA routing)
app.use((req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);  // Log the full error stack for debugging
  res.status(500).json({ msg: 'Internal Server Error' });  // Send a generic server error message
});

// Run the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
