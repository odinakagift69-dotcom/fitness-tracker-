import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://fitness-backend-j8hm.onrender.com/api';

export const useUserStore = create((set) => ({
  // --- STATE ---
  user: null,
  workouts: [], 
  isLoading: false,
  error: null,

  // --- ACTIONS ---

  // 1. Get User Profile
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/get-user`);
      set({ user: response.data, isLoading: false });
    } catch (err) {
      console.error("Fetch User Error:", err);
      set({ error: "Failed to load profile", isLoading: false });
    }
  }, // <--- THIS COMMA IS IMPORTANT

  // 2. Save User Profile
  saveUser: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/save-user`, userData);
      set({ user: response.data.user, isLoading: false });
      return true;
    } catch (err) {
      console.error("Save User Error:", err);
      set({ error: "Failed to save profile", isLoading: false });
      return false;
    }
  }, // <--- THIS COMMA IS IMPORTANT

  // 3. Get Workout History
  fetchWorkouts: async () => {
    try {
      const response = await axios.get(`${API_URL}/workouts`);
      set({ workouts: response.data });
    } catch (err) {
      console.error("Fetch Workouts Error:", err);
    }
  }, // <--- THIS COMMA IS IMPORTANT

  // 4. Add New Workout
  addWorkout: async (workoutData) => {
    try {
      const response = await axios.post(`${API_URL}/add-workout`, workoutData);
      set(state => ({ 
        workouts: [response.data, ...state.workouts] 
      }));
      return true;
    } catch (err) {
      console.error("Add Workout Error:", err);
      return false;
    }
  }, // <--- THIS COMMA IS IMPORTANT

  // 5. Delete Workout
  deleteWorkout: async (id) => {
    try {
      await axios.delete(`${API_URL}/workouts/${id}`);
      set(state => ({
        workouts: state.workouts.filter(w => w._id !== id)
      }));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  }
}));