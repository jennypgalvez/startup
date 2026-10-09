import React from 'react';

export function Tasks() {
  return (
    <>
      <main>
        <section>
          <h2>Your Tasks</h2>
          <ul>
            <li className="mb-2">
              <input type="checkbox" id="task1" /> <label htmlFor="task1">Finish CS260 assignment</label>
            </li>
            <li className="mb-2">
              <input type="checkbox" id="task2" /> <label htmlFor="task2">Read a chapter of the textbook</label>
            </li>
            <li className="mb-2">
              <input type="checkbox" id="task3" /> <label htmlFor="task3">Plan a project</label>
            </li>
          </ul>

          <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Add New Task</button>
        </section>

        <footer>
          <hr />
          <p>Created by: Jennifer Wall</p>
          <a href="https://github.com/jennypgalvez/startup">GitHub Repository</a>
        </footer>
      </main>
    </>
  );
}