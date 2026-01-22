import { create } from 'zustand';

const useStore = create((set) => ({
  // --- 1. STATE VARIABLES (Data we keep track of) ---
  user: null,
  workoutHistory: [],
  caloriesConsumed: 0, // <--- NEW: Track how much user has eaten

  // --- 2. ACTIONS (Functions to change the data) ---

  // LOGIN: Save user to screen AND backend
  loginUser: async (profileData) => {
    // A. Update Screen Immediately
    set({ user: profileData });

    // B. Send to Backend
    try {
      const response = await fetch('http://localhost:5000/api/save-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      const result = await response.json();
      console.log('Backend Response:', result.message);
    } catch (error) {
      console.error('❌ Failed to save to backend:', error);
    }
  },

  // CHECK SESSION: See if user is already logged in on server
  checkUserSession: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/get-user');
      const savedUser = await response.json();
      
      if (savedUser) {
        console.log('✅ Found user session in backend!');
        set({ user: savedUser });
      }
    } catch (error) {
      console.error('❌ Could not fetch session:', error);
    }
  },

  // LOGOUT
  logoutUser: () => set({ user: null }),

  // HISTORY: Add a finished workout
  addWorkoutLog: (log) => set((state) => ({ 
    workoutHistory: [log, ...state.workoutHistory] 
  })),

  // --- NEW DIET ACTIONS ---

  // ADD CALORIES: Click "Log Meal" -> Adds number to total
  addCalories: (amount) => set((state) => ({ 
    caloriesConsumed: state.caloriesConsumed + amount 
  })),

  // RESET CALORIES: Click "Reset" -> Sets total back to 0
  resetCalories: () => set({ caloriesConsumed: 0 }),

}));

export default useStore;