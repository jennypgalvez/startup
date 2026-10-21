import React from 'react';

export function Friends() {
  return (
    <main>
      <section>
        <h2>Your Friends</h2>
        <ul>
          <li className="p-2 border-bottom">Sarah - Online</li>
          <li className="p-2 border-bottom">John - Studying</li>
          <li className="p-2 border-bottom">Emma - Offline</li>
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