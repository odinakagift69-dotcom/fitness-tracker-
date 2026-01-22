import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';

function WorkoutManager() {
  const { workouts, fetchWorkouts, addWorkout, deleteWorkout } = useUserStore(); // 👈 Added deleteWorkout
  
  const [form, setForm] = useState({ exercise: '', duration: '' });

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.exercise || !form.duration) return alert("Fill in both fields!");

    const success = await addWorkout(form);
    if (success) {
      setForm({ exercise: '', duration: '' });
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      
      {/* 1. THE FORM */}
      <h3>💪 Log a Workout</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          placeholder="Exercise (e.g. Squats)" 
          value={form.exercise}
          onChange={(e) => setForm({...form, exercise: e.target.value})}
        />
        <input 
          placeholder="Details (e.g. 10 reps)" 
          value={form.duration}
          onChange={(e) => setForm({...form, duration: e.target.value})}
        />
        <button type="submit" className="btn" style={{ background: '#28a745', color: 'white', width: 'auto' }}>
          Add
        </button>
      </form>

      {/* 2. THE HISTORY LIST */}
      <h3>📜 History</h3>
      {workouts.length === 0 ? (
        <p style={{ color: 'gray' }}>No workouts yet. Go lift something!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {(workouts || []).map((w) => (
            <li key={w._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #eee' }}>
              <div>
                <span style={{ fontWeight: 'bold', display: 'block' }}>{w.exercise}</span>
                <span style={{ color: '#555', fontSize: '0.9rem' }}>{w.duration}</span>
                <span style={{ color: '#999', fontSize: '0.8rem', marginLeft: '10px' }}>
                  {new Date(w.date).toLocaleDateString()}
                </span>
              </div>
              
              {/* 👇 THE DELETE BUTTON */}
              <button 
                onClick={() => deleteWorkout(w._id)}
                style={{ 
                  background: '#ffdddd', 
                  color: 'red', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: '30px', 
                  height: '30px', 
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                title="Delete this workout"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutManager;