import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Tasks } from './tasks/tasks';
import { Timer } from './timer/timer';
import { Friends } from './friends/friends';
import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        {/* Left Sidebar Navigation */}
        <header>
          <nav>
            <img src="/images/mindwall-logo.png" alt="MindWall Logo" width="100" height="100" />
            <h2>MindWall</h2>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><NavLink to="/tasks">My tasks</NavLink></li>
              <li><NavLink to="/timer">Focus Mode</NavLink></li>
              <li><NavLink to="/friends">Friends</NavLink></li>
            </ul>
          </nav>
        </header>

        {/* Dynamic Route Content */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="p-5">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </main>
  );
}