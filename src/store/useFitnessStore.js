import { create } from 'zustand';

const useFitnessStore = create((set) => ({
  // 1. THE STATE (The Data on the Whiteboard)
  // We start with some dummy data so we can see something on the screen immediately.
  workouts: [
    { id: 1, type: 'Running', duration: 30, calories: 300, date: '2025-12-16' },
    { id: 2, type: 'Cycling', duration: 45, calories: 400, date: '2025-12-15' },
  ],

  // 2. THE ACTIONS (How we change the Whiteboard)
  
  // Action to ADD a new workout
  addWorkout: (newWorkout) => set((state) => ({
    workouts: [...state.workouts, newWorkout]
  })),

  // Action to DELETE a workout (we keep everyone EXCEPT the one with this ID)
  deleteWorkout: (id) => set((state) => ({
    workouts: state.workouts.filter((workout) => workout.id !== id)
  })),
}));

export default useFitnessStore;