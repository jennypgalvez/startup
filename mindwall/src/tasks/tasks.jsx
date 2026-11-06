import React, { useState, useEffect } from 'react';

export function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => {
        console.error('Error fetching tasks:', err);
        // Fallback default tasks if API fails
        setTasks([
          { id: 1, text: 'Finish CS260 assignment', completed: false },
          { id: 2, text: 'Read a chapter of the textbook', completed: false },
          { id: 3, text: 'Plan a project', completed: false },
        ]);
      });
  }, []);

  async function handleToggle(id) {
    const taskToToggle = tasks.find(task => task.id === id);
    if (!taskToToggle) return;

    const updatedCompleted = !taskToToggle.completed;
    
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: updatedCompleted } : task
    ));

    try {
      const response = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...taskToToggle, completed: updatedCompleted })
      });

      if (response.ok) {
        const serverTasks = await response.json();
        setTasks(serverTasks);
      } 
    } catch (error) {
      console.error('Error updating task:', error);   
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();
    if (inputText.trim() === '') return;

    try {
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });

      if (response.ok) {
        const updatedTasks = await response.json();
        setTasks(updatedTasks);
        setInputText('');
        setShowInput(false);
      } else {
        alert('Failed to add task. Please try again.');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  return (
    <>
      <main className="p-4">
        <section>
          <h2>Your Tasks</h2>
          <ul style={{ paddingLeft: '0' }}>
            {Array.isArray(tasks) && tasks.map(task => (
              <li key={task.id} className="mb-2" style={{ listStyle: 'none' }}>
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  style={{
                    marginLeft: '8px',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#6c757d' : 'inherit'
                  }}
                >
                  {task.text || task.name}
                </label>
              </li>
            ))}
          </ul>

          {showInput ? (
            <form onSubmit={handleAddTask} style={{ marginTop: '1rem' }}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter a new task..."
                className="form-control mb-2"
                style={{ maxWidth: '300px', display: 'inline-block', marginRight: '8px' }}
                autoFocus
              />
              <button type="submit" className="btn btn-success btn-sm">Save Task</button>
            </form>
          ) : (
            <button
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={() => setShowInput(true)}
            >
              Add New Task
            </button>
          )}
        </section>

        <footer>
          <hr />
          <p>Created by: Jennifer Wall</p>
          <a href="https://github.com/jennypgalvez/startup">GitHub Repository</a>
        </footer>
      </main>
    </>
  );
}