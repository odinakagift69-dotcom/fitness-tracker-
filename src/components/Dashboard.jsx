import React, { useState } from 'react';
import useStore from '../store'; // Importing from your store
import { PLANS } from '../utils/fitnessData';
import { EXERCISE_ALTERNATIVES } from '../utils/alternatives';
import WorkoutTimer from './WorkoutTimer';

const Dashboard = () => {
  // 1. GET DATA FROM STORE (Using specific selectors is better for performance)
  const user = useStore((state) => state.user);
  const workoutHistory = useStore((state) => state.workoutHistory) || []; // <--- We declare it here
  const caloriesConsumed = useStore((state) => state.caloriesConsumed) || 0;
  const addCalories = useStore((state) => state.addCalories);
  const resetCalories = useStore((state) => state.resetCalories);
  
  const [workoutActive, setWorkoutActive] = useState(false);
  const [swappedWorkouts, setSwappedWorkouts] = useState({});

  // Safety Check
  if (!user) return null;
  
  const recommendedPlan = PLANS[user.goal] || PLANS['lose_weight'];

  // Calculate Progress % for the ring
  const progress = Math.min((caloriesConsumed / (user.dailyCalories || 2000)) * 100, 100);

  // Helper for Swapping Logic
  const handleSwap = (originalName) => {
    const alts = EXERCISE_ALTERNATIVES[originalName] || ["General Cardio"];
    const current = swappedWorkouts[originalName] || originalName;
    const nextAlt = alts.find(a => a !== current) || alts[0];
    setSwappedWorkouts(prev => ({ ...prev, [originalName]: nextAlt }));
  };

  // Helper for WhatsApp
  const sendWhatsApp = () => {
    const mealText = recommendedPlan.meals.map(m => `• ${m.name}`).join('%0A');
    const workoutText = recommendedPlan.workouts.map(w => `• ${swappedWorkouts[w.name] || w.name}`).join('%0A');
    const msg = `*My Fitness Plan*%0A%0A*Meals:*%0A${mealText}%0A%0A*Workouts:*%0A${workoutText}`;
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-[#fafaf9]">
      
      {/* HEADER & WHATSAPP BUTTON */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 mt-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            Hello, {user.gender === 'male' ? 'Champ' : 'Star'}!
          </h1>
          <p className="text-slate-500 mt-2 text-xl font-medium">
            Goal: <span className="text-emerald-600 font-bold">{user.dailyCalories} kcal</span>
          </p>
        </div>
        <button 
          onClick={sendWhatsApp}
          className="mt-6 md:mt-0 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-200 transition-all active:scale-95"
        >
          Share to WhatsApp
        </button>
      </div>

      {/* 3D PROGRESS BAR SECTION */}
      <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200 border border-white mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-32 h-32">
          {/* Progress Ring SVG */}
          <svg className="w-full h-full -rotate-90">
            <circle cx="64" cy="64" r="58" stroke="#f1f5f9" strokeWidth="12" fill="none" />
            <circle 
              cx="64" cy="64" r="58" stroke="#10b981" strokeWidth="12" fill="none" 
              strokeDasharray="364" 
              strokeDashoffset={364 - (364 * progress) / 100} 
              strokeLinecap="round" 
              className="transition-all duration-1000 ease-out" 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-slate-800">
            {Math.round(progress)}%
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-black text-slate-800">Calorie Tracker</h3>
          <p className="text-slate-500 font-medium">{caloriesConsumed} / {user.dailyCalories} kcal</p>
          <button 
            onClick={resetCalories} 
            className="mt-2 text-xs font-bold text-rose-400 hover:text-rose-600 uppercase tracking-widest"
          >
            Reset Intake
          </button>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* NUTRITION SECTION */}
        <div>
          <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
             <img src="https://cdn-icons-png.flaticon.com/512/415/415733.png" className="w-10 h-10 drop-shadow-md" alt="icon" /> 
             Nutrition
          </h3>
          <div className="space-y-6">
            {recommendedPlan.meals.map((meal, index) => (
              <div key={index} className="group relative h-48 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                <img src={meal.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={meal.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/20 to-transparent opacity-90" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                  <div>
                    <h4 className="text-2xl font-bold text-white leading-none">{meal.name}</h4>
                    {/* LOG MEAL BUTTON */}
                    <button 
                      onClick={() => addCalories(meal.calories)} 
                      className="mt-4 bg-white/20 hover:bg-emerald-500 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-widest transition-all active:scale-95"
                    >
                      Log Meal +
                    </button>
                  </div>
                  <p className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold">{meal.calories} kcal</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WORKOUT SECTION */}
        <div>
          <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
             <img src="https://cdn-icons-png.flaticon.com/512/2964/2964514.png" className="w-10 h-10 drop-shadow-md" alt="icon" /> 
             Routine
          </h3>
          <div className="space-y-6">
            {recommendedPlan.workouts.map((workout, index) => {
              const displayTitle = swappedWorkouts[workout.name] || workout.name;
              return (
                <div key={index} className="group relative h-48 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  <img src={workout.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" alt={workout.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/20 to-transparent opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                    <div>
                      <h4 className="text-2xl font-bold text-white leading-none">{displayTitle}</h4>
                      {/* SWAP BUTTON */}
                      <button 
                        onClick={() => handleSwap(workout.name)} 
                        className="mt-4 bg-emerald-500/40 hover:bg-emerald-500 px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        Swap 🔄
                      </button>
                    </div>
                    <p className="text-emerald-100 font-bold">{workout.duration}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => setWorkoutActive(true)} 
            className="w-full mt-10 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl hover:bg-emerald-600 transition-all shadow-xl"
          >
            Start Live Session
          </button>
        </div>
      </div>

      {/* --- HISTORY LOG (THIS SECTION USES 'workoutHistory') --- */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <h3 className="text-2xl font-black text-slate-900 mb-8">📅 Recent Activity</h3>
        
        {workoutHistory.length === 0 ? (
          <div className="text-center py-12 text-slate-400 italic">
            No workouts yet. Hit that start button!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-4 pl-4">Date</th>
                  <th className="pb-4">Stats</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* HERE IS WHERE WE USE IT! */}
                {workoutHistory.map((log) => (
                  <tr key={log.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition">
                    <td className="py-5 pl-4 font-bold text-slate-700">{log.date}</td>
                    <td className="py-5">
                      <p className="font-bold text-emerald-600">{log.caloriesBurned} kcal</p>
                      <p className="text-xs text-slate-400">{log.duration}</p>
                    </td>
                    <td className="py-5">
                      <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">Done</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {workoutActive && <WorkoutTimer onClose={() => setWorkoutActive(false)} />}
    </div>
  );
};

export default Dashboard;