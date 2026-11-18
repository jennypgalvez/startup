import React, {useState, useEffect} from 'react';

export function Friends() {
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState('');
  const [friendActivity, setFriendActivity] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    // Fetch friends data from the API
    fetch('/api/activities')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch friends');
        return res.json();  
      })
      .then((data) => setFriends(data))
      .catch((err) => {
        console.error('Error fetching friends:', err);
        // Fallback default friends if API fails
        setFriends([
          { id: 1, name: 'Sarah', status: 'Online', activity: 'Completed a math assignment' },
          { id: 2, name: 'John', status: 'Studying', activity: 'Working on a history project' },
          { id: 3, name: 'Emma', status: 'Offline', activity: 'Taking a break' },
        ]);
      });
  }, []);

  async function handleAddFriend(e) {
    e.preventDefault();
    if (friendName.trim() === '') return;

    try{
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: friendName, activity: friendActivity, status: 'Online' })
      });

      if (response.ok) {
        const updatedFriends = await response.json();
        setFriends(updatedFriends);
        setFriendName('');
        setFriendActivity('');
        setShowInput(false);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  }  

  async function deleteFriend(id) {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const serverFriends = await response.json();
        setFriends(serverFriends);
      }
    } catch (error) {
      console.error('Error deleting friend:', error);
    }
  }

  return (
    <main className="p-4" style={{ flex: 1 }}>
      <section className="card p-4 shadow-sm mb-4">
        <h2>Your Friends</h2>
        <p className="text-muted">See what your friends are up to and how they're doing.</p>

        <ul className="list-group list-group-flush mt-3">
          {Array.isArray(friends) && friends.map(friend => {
            const friendId = friend._id || friend.id;
            return (
              <li key={friendId} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{friend.name}</strong>
                  <div className="text-muted">{friend.activity}</div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className={`badge ${friend.status === 'Online' ? 'bg-success' : friend.status === 'Studying' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                    {friend.status}
                  </span>
                  <button
                    onClick={() => deleteFriend(friendId)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {showInput ? (
          <form onSubmit={handleAddFriend} className="mt-3">
            <input
              type="text"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="Friend's Name"
              className="form-control mb-2"
              required
            />
            <input
              type="text"
              value={friendActivity}
              onChange={(e) => setFriendActivity(e.target.value)}
              placeholder="What are they working on?"
              className="form-control mb-2"
              />
              <button type="submit" className="btn btn-success btn-sm me-2">Save Friend</button>
              <button type="button" onClick={() => setShowInput(false)} className="btn btn-secondary btn-sm">Cancel</button>
          </form>
        ) : (   
        <button onClick={() => setShowInput(true)} className="btn btn-primary btn-sm mt-3">Add Friend</button>
        )}
        </section>

      <footer>
        <hr />
        <p>Created by: Jennifer Wall</p>
        <a href="https://github.com/jennypgalvez/startup">GitHub Repository</a>
      </footer>
    </main>
  );
}