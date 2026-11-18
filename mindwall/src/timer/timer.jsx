import React, { useState, useEffect } from 'react';

export function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [cycles, setCycles] = useState(0);

  // Define times in seconds
  const WORK_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Automatically switch modes based on Pomodoro rules
      if (mode === 'work') {
        const newCycles = cycles + 1;
        setCycles(newCycles);
        if (newCycles % 4 === 0) {
          switchToLongBreak();
        } else {
          switchToShortBreak();
        }
      } else {
        switchToWork();
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, cycles]);

  function switchToWork() {
    setMode('work');
    setTimeLeft(WORK_TIME);
    setIsRunning(false);
  }

  function switchToShortBreak() {
    setMode('shortBreak');
    setTimeLeft(SHORT_BREAK);
    setIsRunning(false);
  }

  function switchToLongBreak() {
    setMode('longBreak');
    setTimeLeft(LONG_BREAK);
    setIsRunning(false);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function handleReset() {
    setIsRunning(false);
    if (mode === 'work') setTimeLeft(WORK_TIME);
    else if (mode === 'shortBreak') setTimeLeft(SHORT_BREAK);
    else setTimeLeft(LONG_BREAK);
  }

  return (
    <main className="p-4" style={{ flex: 1 }}>
      <section className="card p-4 shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2>Pomodoro Focus Mode</h2>
        <p className="text-muted">Work, take breaks, and boost your productivity.</p>
        
        {/* Mode Selector Tabs */}
        <div className="d-flex justify-content-center gap-2 mb-3">
          <button 
            className={`btn btn-sm ${mode === 'work' ? 'btn-dark' : 'btn-outline-dark'}`} 
            onClick={switchToWork}
          >
            Work (25m)
          </button>
          <button 
            className={`btn btn-sm ${mode === 'shortBreak' ? 'btn-dark' : 'btn-outline-dark'}`} 
            onClick={switchToShortBreak}
          >
            Short Break (5m)
          </button>
          <button 
            className={`btn btn-sm ${mode === 'longBreak' ? 'btn-dark' : 'btn-outline-dark'}`} 
            onClick={switchToLongBreak}
          >
            Long Break (15m)
          </button>
        </div>

        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <h1 style={{ fontSize: '4rem', color: 'var(--accent-blue)' }}>{formatTime(timeLeft)}</h1>
          <p className="text-muted">Completed Pomodoros: {cycles}</p>
        </div>

        <div className="d-flex gap-2 justify-content-center">
          <button
            className={`btn ${isRunning ? 'btn-warning' : 'btn-primary'}`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
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