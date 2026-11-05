const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Router for API endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// In-memory data store for tasks (matching your frontend task structure)
let tasks = [
  { id: 1, text: 'Finish CS260 assignment', completed: false },
  { id: 2, text: 'Read a chapter of the textbook', completed: false },
  { id: 3, text: 'Plan a project', completed: false }
];

// In-memory data store for friend activities
let activities = [
  { id: 1, name: 'Sarah', activity: 'Completed a math assignment', status: 'Online' },
  { id: 2, name: 'John', activity: 'Working on a history project', status: 'Studying' },
  { id: 3, name: 'Emma', activity: 'Taking a break', status: 'Offline' }
];

// Get tasks endpoint
apiRouter.get('/tasks', (_req, res) => {
  res.send(tasks);
});

// Add a new task endpoint
apiRouter.post('/task', (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  res.send(tasks);
});

// Get friends/activity feed endpoint
apiRouter.get('/activities', (_req, res) => {
  res.send(activities);
});

// Third-party quote endpoint integration (satisfies assignment requirement)
apiRouter.get('/quote', async (_req, res) => {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    res.send({
      quote: data.content,
      author: data.author
    });
  } catch (error) {
    // Fallback quote matching your dashboard theme
    res.send({
      quote: "Focus on being productive instead of busy.",
      author: "Tim Ferriss"
    });
  }
});

// Default fallback for SPA routing
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`MindWall server listening on port ${port}`);
});