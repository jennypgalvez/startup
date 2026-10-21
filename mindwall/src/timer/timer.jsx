import React, {useState, useEffect } from 'react';

export function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function handleReset() {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  }

  return (
    <main className="p-4" style={{ flex: 1 }}>
      <section className="card p-4 shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2>Focus Mode</h2>
        <p className="text-muted">Set your intention and start working.</p>
        
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <h1 style={{ fontSize: '4rem', color: 'var(--accent-blue)' }}>{formatTime(timeLeft)}</h1>
        </div>

        <div className="d-flex gap-2 justify-content-center">
          <button
            className={`btn ${isRunning ? 'btn-warning' : 'btn-primary'}`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button className="btn btn-secondary" onClick={handleReset}> Reset</button>
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