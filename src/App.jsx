import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from './store/userStore';
import ProfileForm from './components/ProfileForm';
import WorkoutManager from './components/WorkoutManager';
import WorkoutChart from './components/WorkoutChart'; // ✅ Checks standard location

function App() {
  const { fetchUser, user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleReset = async () => {
    if(!confirm("Are you sure? This deletes EVERYTHING.")) return;
    await axios.delete('hhttps://fitness-backend-j8hm.onrender.com/api/reset');
    window.location.reload();
  };

  // SAFETY: While loading, show a loading text instead of blank screen
  if (user === undefined) return <div style={{padding: 20}}>Loading...</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔥 Fitness Tracker</h1>
      </header>

      <main className="main-content">
        {!user || isEditing ? (
          <div className="card">
            <ProfileForm />
            {user && <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>}
          </div>
        ) : (
          <div className="card profile-card">
            <div className="profile-header">
              <h2>Welcome, {user.name}!</h2>
              <span className="badge">{user.fitnessGoal}</span>
            </div>
            <div className="stats-grid">
               <div className="stat-box">
                 <span className="stat-label">Weight</span>
                 <span className="stat-value">{user.weight || '--'} kg</span>
               </div>
               <div className="stat-box">
                 <span className="stat-label">Age</span>
                 <span className="stat-value">{user.age || '--'}</span>
               </div>
            </div>
            <button className="btn btn-outline" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}

        {user && !isEditing && (
          <>
            <div className="card">
              <WorkoutChart />
            </div>
            <div className="card">
              <WorkoutManager />
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        <button className="btn btn-danger" onClick={handleReset}>
          ⚠️ Reset Database
        </button>
      </footer>
    </div>
  );
}

export default App;