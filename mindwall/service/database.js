const { MongoClient, ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('mindwall'); // Use your mindwall database name
const userCollection = db.collection('user');
const taskCollection = db.collection('task');
const activityCollection = db.collection('activity');

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

// Scoped to user email for clean slate functionality
function getTasks(email) {
  return taskCollection.find({ email: email }).sort({ _id: -1 }).toArray();
}

async function addTask(task) {
  return taskCollection.insertOne(task);
}

async function updateTaskStatus(taskId, completed) {
  // If using MongoDB ObjectId or numeric IDs, match appropriately:
  const query = ObjectId.isValid(taskId) ? { _id: new ObjectId(taskId) } : { _id: taskId };
  return taskCollection.updateOne(query, { $set: { completed: completed } });
}

function deleteTask(taskId) {
  const query = ObjectId.isValid(taskId) ? { _id: new ObjectId(taskId) } : { _id: taskId };
  return taskCollection.deleteOne(query);
}

async function getActivities(email) {
  return activityCollection.find({ email: email }).toArray();
}

async function addActivity(activity) {
  return activityCollection.insertOne(activity);
}

async function deleteActivity(id) {
  const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
  return activityCollection.deleteOne(query);
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateUserToken,
  getTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
  getActivities,
  addActivity,
  deleteActivity,
};