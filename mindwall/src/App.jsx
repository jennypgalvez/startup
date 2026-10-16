import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Tasks } from './tasks/tasks';
import { Timer } from './timer/timer';
import { Friends } from './friends/friends';
import './style.css';

export default function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [authState, setAuthState] = useState(userName ? 'authenticated' : 'unauthenticated');

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
              {authState === 'unauthenticated' && (
                <li><NavLink to="/login">Login</NavLink></li>
              )}
              {authState === 'authenticated' && (
                <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/tasks">My tasks</NavLink></li>
                <li><NavLink to="/timer">Focus Mode</NavLink></li>
                <li><NavLink to="/friends">Friends</NavLink></li>
                </>
              )}
            </ul>
          </nav>
        </header>
        
        {/* Dynamic Route Content */}
        <main style={{ flex: 1, padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
          path="/login"
          element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(newUserName, newAuthState) => {
                setUserName(newUserName);
                setAuthState(newAuthState);
              }}
            />
          }
          />
          <Route path="/dashboard" element={<Dashboard userName={userName} />} />
          <Route path="/tasks" element={<Tasks userName={userName} />} />
          <Route path="/timer" element={<Timer userName={userName} />} />
          <Route path="/friends" element={<Friends userName={userName} />} />
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