import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (userName) {
      localStorage.setItem('userName', userName);
      navigate('/dashboard');
    }
  }

  return (
    <main>
      <section className="login-layout card bg-white p-4 mx-auto mt-5 shadow-sm" style={{ maxWidth: '400px' }}>
        <h2 className="text-center">Welcome to MindWall</h2>
        <p className="text-muted text-center">Match tasks to your energy and time.</p>
        <form onSubmit={handleLogin} className="login-form">
          <div>
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Login / Enter</button>
        </form>
      </section>
      <footer>
        <hr />
        <p>Created by: Jennifer Wall</p>
        <a href="https://github.com/jennypgalvez/startup">GitHub Repository</a>
      </footer>
    </main>
  );
}