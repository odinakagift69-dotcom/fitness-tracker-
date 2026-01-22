import { useState } from 'react';
// 👇 THIS IS THE KEY FIX: It must match the filename exactly
import { useUserStore } from '../store/userStore';

function ProfileForm() {
  const { saveUser } = useUserStore();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    fitnessGoal: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.fitnessGoal) return;
    await saveUser(formData);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h3>Create Profile</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name: </label>
          <input name="name" onChange={handleChange} value={formData.name} placeholder="Name" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Goal: </label>
          <select name="fitnessGoal" onChange={handleChange} value={formData.fitnessGoal}>
            <option value="">Select Goal...</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Build Muscle">Build Muscle</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProfileForm;