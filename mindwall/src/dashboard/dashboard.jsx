import React from 'react';

export function Dashboard() {
  const userName = localStorage.getItem('userName') || 'Jennifer';

  return (
    <div style={{ display: 'flex', flex: 1, width: '100%' }}>
      <main style={{ flex: 1 }}>
        {/* Greeting Banner */}
        <section id="greeting">
          <h1>{userName}</h1>
          <p>Let's find the best task for your energy and time right now.</p>
        </section>

        {/* Daily Quote */}
        <section id="quote-container">
          <h3>Daily Quote</h3>
          <p>"Focus on being productive instead of busy." — Tim Ferriss</p>
        </section>

        {/* Task List */}
        <section id="tasks">
          <h2>Today's Tasks</h2>
          <p>Loading your saved tasks from the database...</p>
          <ul>
            <li>
              <input type="checkbox" id="task1" /> <label htmlFor="task1">Study for CS quiz</label>
            </li>
            <li>
              <input type="checkbox" id="task2" /> <label htmlFor="task2">Work on web project</label>
            </li>
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
      <aside>
        <section id="mood-tracker">
          <h3>How are you feeling today?</h3>
          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-sm btn-outline-primary">Low</button>
            <button className="btn btn-sm btn-outline-primary">Medium</button>
            <button className="btn btn-sm btn-outline-primary">High</button>
          </div>
        </section>

        <section id="progress-widget">
          <h3>Your progress</h3>
          <p>You have completed 2 out of 5 this week.</p>
        </section>

        <section id="friend-activity">
          <h3>Recent Activity of Friends</h3>
          <p>Sarah completed her math homework.</p>
          <p>John started his history assignment.</p>
        </section>

        <section id="encouragement">
          <h3>Keep going!</h3>
          <p>Progress isn't about doing everything, it's about doing what matters.</p>
        </section>
      </aside>
    </div>
  );
}