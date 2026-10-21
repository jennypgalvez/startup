import React from 'react';

export function Friends() {
  const friendsList = [
    { id: 1, name: 'Sarah', status: 'Online', activity: 'Completed a math assignment' },
    { id: 2, name: 'John', status: 'Studying', activity: 'Working on a history project' },
    { id: 3, name: 'Emma', status: 'Offline', activity: 'Taking a break' },
  ];

  return (
    <main className="p-4" style={{ flex: 1 }}>
      <section className="card p-4 shadow-sm mb-4">
        <h2>Your Friends</h2>
        <p className="text-muted">See what your friends are up to and how they're doing.</p>
        <ul className="list-group list-group-flush mt-3">
          {friendsList.map(friend => (
            <li key={friend.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{friend.name}</strong>
                <div className="text-muted">{friend.activity}</div>
              </div>
              <span className={`badge ${friend.status === 'Online' ? 'bg-success' : friend.status === 'Studying' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                {friend.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <hr />
        <p>Created by: Jennifer Wall</p>
        <a href="https://github.com/jennypgalvez/startup">GitHub Repository</a>
      </footer>
    </main>
  );
}