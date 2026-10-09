import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  return (
    <main className="container-fluid bg-secondary text-center p-5">
      <h2>Welcome to MindWall</h2>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/dashboard')}>
        Login / Enter
      </button>
    </main>
  );
}