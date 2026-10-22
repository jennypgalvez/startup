import React, {useState, useEffect} from 'react';

export function Dashboard() {
  const userName = localStorage.getItem('userName') || 'Jennifer';
  //State for tasks loaded from local 
  const [tasks, setTasks] = useState([]);
  // State for mood tracking
  const [mood, setMood] = useState(localStorage.getItem('mindwall_mood') || 'Not Set');
  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('mindwall_tasks')) || [];
    if(savedTasks.length > 0) {
      setTasks(savedTasks);
    } else{
      // Default tasks if none are saved
      const defaultTasks = [
        { id: 1, name: 'Study for CS quiz', completed: false },
        { id: 2, name: 'Work on web project', completed: false },
      ];
      setTasks(defaultTasks);
      localStorage.setItem('mindwall_tasks', JSON.stringify(defaultTasks));
    }
  }, []);
  
  function toggleTask(id) {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('mindwall_tasks', JSON.stringify(updatedTasks));
  }

  function handleMoodChange(selectedMood) {
    setMood(selectedMood);
    localStorage.setItem('mindwall_mood', selectedMood);
  }

  const completedCount = tasks.filter(task => task.completed).length;
  
  return (
    <div style={{ display: 'flex', flex: 1, width: '100%' }}>
      <main style={{ flex: 2 }}>
        {/* Greeting Banner */}
        <section id="greeting" className="mb-4">
          <h1>Welcome, {userName}!</h1>
          <p className="text-muted">Let's find the best task for your energy and time right now.</p>
        </section>

        {/* Daily Quote */}
        <section id="quote-container" className="card p-3 mb-4 shadow-sm bg-light">
          <h3>Daily Quote</h3>
          <p className= "mb-0 font-italic">"Focus on being productive instead of busy." — Tim Ferriss</p>
        </section>

        {/* Task List */}
        <section id="tasks" className="card p-3 mb-4 shadow-sm">
          <h2>Today's Tasks</h2>
          <ul className="list-unstyled mt-3">
            {tasks.map(task => (
              <li key={task.id} className="mb-2">
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="me-2"
                />
                <label htmlFor={`task-${task.id}`} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.name || task.text}
                </label>
              </li>
            ))}
          </ul>
          <form action="/timer" className="mt-3">
            <button className="btn btn-primary">Start Task -&gt;</button>
          </form>
        </section>

        <footer>
          <hr />
          <p>Created by: Jennifer Wall</p>
          <a href="https://github.com/jennypgalvez/startup">GitHub Repository</a>
        </footer>
      </main>

      {/* Right Sidebar */}
      <aside style={{ flex: 1}} className="d-flex flex-column gap-3">
        <section id="mood-tracker" className="card p-3 shadow-sm">
          <h3>How are you feeling today?</h3>
          <p className="text-muted">Current mood: <strong>{mood}</strong></p>
          <div className="d-flex gap-2">
            {['Low', 'Medium', 'High'].map((m) => (
              <button
                key={m}
                onClick={() => handleMoodChange(m)}
                className={`btn btn-sm ${mood === m ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        <section id="progress-widget" className="card p-3 shadow-sm">
          <h3>Your progress</h3>
          <p className="mb-0">You have completed {completedCount} out of {tasks.length} tasks.</p>
        </section>

        <section id="friend-activity" className="card p-3 shadow-sm">
          <h3>Recent Activity of Friends</h3>
          <p className="mb-1">Sarah completed her math homework.</p>
          <p className="mb-0">John started his history assignment.</p>
        </section>

        <section id="encouragement" className="card p-3 shadow-sm">
          <h3>Keep going!</h3>
          <p className="mb-0 text-muted">Progress isn't about doing everything, it's about doing what matters.</p>
        </section>
      </aside>
    </div>
  );
}

       