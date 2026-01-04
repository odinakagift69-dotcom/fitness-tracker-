import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useFitnessStore = create(
  persist(
    // ❌ OLD: (set, get) => ({ 
    // ✅ NEW: We removed 'get' because we don't use it
    (set) => ({
      workouts: [],
      editingWorkout: null,
      
      // 👤 User Profile State
      userProfile: {
        name: 'User',
        weight: '', // in kg
        height: '', // in cm
        bmi: null,
      },

      // ACTIONS
      addWorkout: (newWorkout) => set((state) => ({
        workouts: [newWorkout, ...state.workouts]
      })),

      deleteWorkout: (id) => set((state) => ({
        workouts: state.workouts.filter((workout) => workout.id !== id)
      })),

      setEditingWorkout: (workout) => set({ editingWorkout: workout }),

      updateWorkout: (updatedWorkout) => set((state) => ({
        workouts: state.workouts.map((w) => 
          w.id === updatedWorkout.id ? updatedWorkout : w
        ),
        editingWorkout: null, 
      })),

      // 👤 Update Profile & Calculate BMI
      updateProfile: (data) => set((state) => {
        // Calculate BMI: weight (kg) / (height (m) * height (m))
        let bmi = null;
        if (data.weight && data.height) {
          const heightInMeters = data.height / 100;
          bmi = (data.weight / (heightInMeters * heightInMeters)).toFixed(1);
        }
        return { userProfile: { ...state.userProfile, ...data, bmi } };
      }),
    }),
    {
      name: 'fitness-pro-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFitnessStore;