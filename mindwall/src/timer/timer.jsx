import React from 'react';

export function Timer() {
  return (
    <main>
      <section>
        <h2>Focus Mode</h2>
        <p>Set your intention and start working.</p>
        
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <h1 style={{ fontSize: '4rem', color: 'var(--accent-blue)' }}>25:00</h1>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary">Start</button>
          <button className="btn btn-secondary">Reset</button>
        </div>
      </section>

      <footer>
        <hr />
        <p>Created by: Jennifer Wall</p>
        <a href="https://github.com/jennypgalvez/startup">GitHub Repository</a>
      </footer>
    </main>
  );
}