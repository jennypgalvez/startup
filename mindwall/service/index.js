const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const DB = require('./database.js');
const app = express();

const authCookieName = 'token';

// In-memory data stores for MindWall
let users = [];
let tasks = [
  { id: 1, text: 'Finish CS260 assignment', completed: false },
  { id: 2, text: 'Read a chapter of the textbook', completed: false }
];

// Backend service must use port 4000
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Router for API endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Authentication Endpoints (from Simon reference)
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUserToken(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    user.token = null;
    await DB.updateUserToken(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify authorization
const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// MindWall Endpoints
apiRouter.get('/tasks', verifyAuth, async (req, res) => {
  const tasks = await DB.getTasks();
  res.send(tasks);
});

apiRouter.post('/task', verifyAuth, async (req, res) => {
  const newTask = {text: req.body.text, completed: false };
  await DB.addTask(newTask);
  const tasks = await DB.getTasks();
  res.send(tasks);
});

apiRouter.put('/task/:id', verifyAuth, async (req, res) => {
  const taskId = Number(req.params.id);
  await DB.updateTaskStatus(taskId, req.body.completed);
  const tasks = await DB.getTasks();
  res.send(tasks);
} );
  
apiRouter.get('/activities', verifyAuth, (_req, res) => {
  res.send(activities);
});

apiRouter.get('/quote', async (_req, res) => {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    const data = await response.json();
    res.send({ quote: data.quote, author: data.author});
  } catch (error) {
    res.send({ quote: "Focus on being productive instead of busy.", author: "Tim Ferriss"});
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return default page for unknown paths
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`MindWall server listening on port ${port}`);
});