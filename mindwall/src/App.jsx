import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Tasks } from './tasks/tasks';
import { Timer } from './timer/timer';
import { Friends } from './friends/friends';
import './style.css';

export default function App() {
  const [userName, setUserName] = useState('');
  const [authState, setAuthState] = useState('unauthenticated');

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        {/* Left Sidebar Navigation */}
        <header>
          <nav>
            <img src="/images/mindwall-logo.png" alt="MindWall Logo" width="100" height="100" />
            <h2>MindWall</h2>
            <ul>
              {authState === 'authenticated' && (
                <li><NavLink to="/">Home</NavLink></li>
              )}
              {authState === 'authenticated' && (
                <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/tasks">My tasks</NavLink></li>
                <li><NavLink to="/timer">Focus Mode</NavLink></li>
                <li><NavLink to="/friends">Friends</NavLink></li>
                <li>
                  < button 
                    onClick={() => {
                      localStorage.removeItem('userName');
                      setUserName('');
                      setAuthState('unauthenticated');
                    }}
                    className="btn btn-sm btn-secondary mt-3"
                >
                  Logout
                </button>
                </li>
                </>
              )}
            </ul>
          </nav>
        </header>
        
        {/* Dynamic Route Content */}
        <main style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route 
              path="/"
              element={
                authState === 'authenticated' ? (
                <Login
                  userName={userName}
                  authState={authState}
                  onAuthChange={(newUserName, newAuthState) => {
                    setUserName(newUserName);
                    setAuthState(newAuthState);
                }}
            />
              ) : (
                <navigate to="/dashboard" replace />
              )
            }
            />

          <Route
            path="/dashboard"
            element={authState === 'authenticated' ? <Dashboard userName={userName} /> : <navigate to="/" replace />} 
          />
          <Route
            path="/tasks" 
            element={authState === 'authenticated' ? <Tasks userName={userName} /> : <navigate to="/" replace />}  
          />
          <Route 
            path="/timer" 
            element={authState === 'authenticated' ? <Timer userName={userName} /> : <navigate to="/" replace />} 
          />
          <Route
            path="/friends"
            element={authState === 'authenticated' ? <Friends userName={userName} /> : <navigate to="/" replace />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
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