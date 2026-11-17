const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('mindwall'); // Use your mindwall database name
const userCollection = db.collection('user');
const taskCollection = db.collection('task');

// Test connection on startup
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
  } catch (ex) {
    console.log(`Connection failed because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return token ? userCollection.findOne({ token: token }) : null;
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  return user;
}

async function updateUserToken(user) {
  await userCollection.updateOne(
    { email: user.email },
    { $set: { token: user.token } }
  );
}

function getTasks() {
  const query = {};
  const options = { sort: { _id: -1 }, limit: 50 };
  return taskCollection.find(query, options).toArray();
}

async function addTask(task) {
  return taskCollection.insertOne(task);
}

async function updateTaskStatus(taskId, completed) {
  // If using MongoDB ObjectId or numeric IDs, match appropriately:
  return taskCollection.updateOne(
    { id: taskId },
    { $set: { completed: completed } }
  );
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateUserToken,
  getTasks,
  addTask,
  updateTaskStatus,
};