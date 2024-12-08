const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('startup');
const userCollection = db.collection('user');
const resultCollection = db.collection('result');
const likeCollection = db.collection('likeResults');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function addResult(result) {
  return resultCollection.insertOne(result);
}

async function getResults(userId) {
  return resultCollection.find({ userId: userId }).toArray();
}

// Custom function to update the user's token in the database
async function updateUserToken(userId, newToken) {
  try {
    if (!userId) {
      throw new Error('User ID is missing');
    }

    console.log(`Updating token for userId: ${userId} with newToken: ${newToken}`);

    const result = await userCollection.updateOne(
      { _id: userId },
      { $set: { token: newToken } }
    );

    if (result.matchedCount === 0) {
      throw new Error('No user found with the provided ID');
    }

    console.log('Token updated successfully');
  } catch (error) {
    console.error('Error updating token:', error);
    throw new Error('Error updating token');
  }
}

// Fetch quiz results (likes/dislikes)
async function getLikeResults() {
  const quizzes = await likeCollection.find({}).toArray();
  const quizState = {};

  quizzes.forEach((quiz) => {
    quizState[quiz.quizId] = { likes: quiz.likes, dislikes: quiz.dislikes };
  });

  return quizState;
}

// Update quiz results (likes/dislikes)
async function updateLikeResults(quizId, quizData) {
  await likeCollection.updateOne(
    { quizId: quizId },
    { $set: { likes: quizData.likes, dislikes: quizData.dislikes } },
    { upsert: true }  // If quiz doesn't exist, insert it
  );
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addResult,
  getResults,
  updateUserToken,
  getLikeResults,
  updateLikeResults,
};
