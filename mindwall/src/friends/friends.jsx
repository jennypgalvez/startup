import React, { useState, useEffect } from 'react';

export function Friends() {
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState('');
  const [friendActivity, setFriendActivity] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load saved friends/activities from backend on mount
  useEffect(() => {
    fetch('/api/activities')
      .then((res) => {
        if (res.ok) return res.json();
        return [];
      })
      .then((data) => setFriends(data))
      .catch((err) => console.error('Error loading activities:', err));
  }, []);

  // Add a friend after verifying they exist in the database
  async function handleAddFriend(e) {
    e.preventDefault();
    setErrorMsg('');
    if (friendName.trim() === '') return;

    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: friendName.trim(),
          activity: friendActivity.trim() || 'Focusing',
          status: 'Online',
        }),
      });

      if (response.ok) {
        const updatedFriends = await response.json();
        setFriends(updatedFriends);
        setFriendName('');
        setFriendActivity('');
        setShowInput(false);
      } else {
        const body = await response.json();
        setErrorMsg(body.msg || 'Friend not registered');
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      setErrorMsg('Something went wrong while adding your friend.');
    }
  }

  // Delete a friend activity entry
  async function handleDeleteFriend(id) {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedFriends = await response.json();
        setFriends(updatedFriends);
      }
    } catch (error) {
      console.error('Error deleting friend:', error);
    }
  }

  return (
    <main className="p-4" style={{ flex: 1 }}>
      <section className="card p-4 shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2>Friends Activity</h2>
            <p className="text-muted mb-0">See what your study buddies are working on.</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowInput(!showInput);
              setErrorMsg('');
            }}
          >
            {showInput ? 'Cancel' : '+ Add Friend'}
          </button>
        </div>

        {showInput && (
          <form onSubmit={handleAddFriend} className="mb-4 p-3 border rounded bg-light">
            <div className="mb-2">
              <label className="form-label">Friend&apos;s Registered Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter friend's email (e.g. friend@byu.edu)"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Current Activity</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Studying CS 260"
                value={friendActivity}
                onChange={(e) => setFriendActivity(e.target.value)}
              />
            </div>

            {errorMsg && (
              <div className="alert alert-danger py-2" role="alert">
                {errorMsg}
              </div>
            )}

            <button type="submit" className="btn btn-success w-100">
              Save Friend
            </button>
          </form>
        )}

        {friends.length === 0 ? (
          <p className="text-muted text-center my-4">No friends added yet.</p>
        ) : (
          <ul className="list-group">
            {friends.map((friend) => (
              <li
                key={friend._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{friend.name}</strong>
                  <div className="text-muted small">{friend.activity}</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-success">{friend.status}</span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteFriend(friend._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-4 text-center">
        <hr />
        <p>Created by: Jennifer Wall</p>
        <a href="https://github.com/jennypgalvez/startup">GitHub Repository</a>
      </footer>
    </main>
  );
}