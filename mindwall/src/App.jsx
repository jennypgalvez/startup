import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Timer } from './timer/timer';
import { About } from './about/about';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark bg-dark">
            <div className="navbar-brand">
              MindWall<span>&bull;</span>
            </div>
            <menu className="navbar-nav flex-row">
              <li className="nav-item px-3">
                <NavLink className="nav-link" to="">
                  Login
                </NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink className="nav-link" to="dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink className="nav-link" to="timer">
                  Timer
                </NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink className="nav-link" to="about">
                  About
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Jennifer Wall</span>
            <a className="text-reset" href="https://github.com/jennypgalvez/startup">Source</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender.</main>;
}