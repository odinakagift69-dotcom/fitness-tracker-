import React, { useState } from 'react';
import useFitnessStore from '../../store/useFitnessStore';

// We define our initial state for the form inputs
const initialFormState = {
  type: '',
  duration: '', // Stored as a string initially
  calories: '', // Stored as a string initially
};

const WorkoutForm = () => {
  // 1. Local State (The trainer's clipboard)
  const [formData, setFormData] = useState(initialFormState);

  // 2. Global State Action (The whiteboard access)
  const addWorkout = useFitnessStore((state) => state.addWorkout);

  // Handles all input changes using the input's 'name' attribute
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Standard practice: prevents the browser refresh

    // Input Validation (Basic check)
    if (!formData.type || !formData.duration || !formData.calories) {
      alert("Please fill in all fields.");
      return; // Early return if validation fails
    }

    // Prepare data for the store (convert strings to numbers)
    const newWorkout = {
      id: Date.now(), // Unique ID, good for React keys
      type: formData.type,
      duration: parseInt(formData.duration, 10),
      calories: parseInt(formData.calories, 10),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    };

    // 3. Update the Zustand store!
    addWorkout(newWorkout);

    // 4. Reset the form back to empty
    setFormData(initialFormState);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-lg shadow-md mb-6 w-full"
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Log New Workout</h2>

      {/* Type Dropdown */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Workout Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>Select Activity</option>
          <option value="Running">🏃‍♂️ Running</option>
          <option value="Lifting">🏋️‍♀️ Lifting</option>
          <option value="Cycling">🚴‍♀️ Cycling</option>
          <option value="Swimming">🏊 Swimming</option>
        </select>
      </div>

      {/* Duration Input */}
      <div className="mb-4">
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          Duration (Minutes)
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="e.g., 30"
          min="1"
          required
          className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Calories Input */}
      <div className="mb-6">
        <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-1">
          Calories Burned
        </label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          placeholder="e.g., 350"
          min="1"
          required
          className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
      >
        Add Workout
      </button>
    </form>
  );
};

export default WorkoutForm;