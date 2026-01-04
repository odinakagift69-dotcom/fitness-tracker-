import React, { useState } from 'react';
import useFitnessStore from '../../store/useFitnessStore';

// ✅ NEW SOURCE: Microsoft Fluent 3D Emojis (High Quality & Reliable)
const ACTIVITIES = [
  { 
    id: 'run', 
    label: 'Running', 
    burnRate: 10, 
    img: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20Running.png' 
  },
  { 
    id: 'cycle', 
    label: 'Cycling', 
    burnRate: 8, 
    img: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Person%20Biking.png' 
  },
  { 
    id: 'swim', 
    label: 'Swimming', 
    burnRate: 12, 
    img: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20Swimming.png' 
  },
  { 
    id: 'lift', 
    label: 'Weights', 
    burnRate: 6, 
    img: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20Lifting%20Weights.png' 
  },
  { 
    id: 'yoga', 
    label: 'Yoga', 
    burnRate: 4, 
    img: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20in%20Lotus%20Position.png' 
  },
  { 
    id: 'other', 
    label: 'Other', 
    burnRate: 6, 
    img: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png' 
  },
];

const WorkoutForm = () => {
  const { addWorkout, updateWorkout, editingWorkout, setEditingWorkout } = useFitnessStore();

  const isPreset = (type) => ACTIVITIES.some(a => a.label === type);

  // Initialize state directly
  const [formData, setFormData] = useState({
    type: editingWorkout?.type || '', 
    customType: editingWorkout && !isPreset(editingWorkout.type) ? editingWorkout.type : '',
    duration: editingWorkout?.duration || '',
    calories: editingWorkout?.calories || '',
    intensity: 'medium'
  });

  // 🧠 SMART CALORIE LOGIC
  const calculateCalories = (currentDuration, currentType, currentIntensity) => {
    const activity = ACTIVITIES.find(a => a.label === currentType);
    if (!activity || !currentDuration) return;

    let multiplier = 1;
    if (currentIntensity === 'low') multiplier = 0.8;
    if (currentIntensity === 'high') multiplier = 1.2;

    const estimated = Math.round(Number(currentDuration) * activity.burnRate * multiplier);
    setFormData(prev => ({ ...prev, calories: estimated }));
  };

  const handleDurationChange = (e) => {
    const newDuration = e.target.value;
    setFormData({ ...formData, duration: newDuration });
    calculateCalories(newDuration, formData.type, formData.intensity);
  };

  const handleIntensityChange = (level) => {
    setFormData(prev => ({ ...prev, intensity: level }));
    calculateCalories(formData.duration, formData.type, level);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalType = formData.type === 'Other' ? formData.customType : formData.type;

    const workoutData = {
      id: editingWorkout ? editingWorkout.id : Date.now(),
      type: finalType || 'Activity',
      duration: Number(formData.duration) || 0,
      calories: Number(formData.calories) || 0,
      date: editingWorkout ? editingWorkout.date : new Date().toISOString().split('T')[0],
    };

    if (editingWorkout) {
      updateWorkout(workoutData);
    } else {
      addWorkout(workoutData);
    }
    
    if (!editingWorkout) {
        setFormData({ type: '', customType: '', duration: '', calories: '', intensity: 'medium' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100 mb-20">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        {editingWorkout ? <span>📝 Edit Session</span> : <span>🚀 New Session</span>}
      </h2>

      {/* Activity Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {ACTIVITIES.map((act) => (
          <button
            key={act.id}
            type="button"
            onClick={() => {
                setFormData({ ...formData, type: act.label });
                calculateCalories(formData.duration, act.label, formData.intensity);
            }}
            className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              formData.type === act.label 
              ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500 scale-105' 
              : 'bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {/* These 3D images are hosted on GitHub, so they are fast and reliable */}
            <img src={act.img} alt={act.label} className="w-12 h-12 object-contain drop-shadow-md" />
            <span className="text-[10px] font-bold text-gray-600 uppercase">{act.label}</span>
          </button>
        ))}
      </div>

      {/* Custom Input */}
      {formData.type === 'Other' && (
        <div className="mb-4 animate-in fade-in slide-in-from-top-2">
          <input
            type="text"
            placeholder="Name your activity..."
            value={formData.customType}
            onChange={(e) => setFormData({ ...formData, customType: e.target.value })}
            className="w-full bg-blue-50 border border-blue-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* DURATION INPUT */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Duration (Mins)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={handleDurationChange}
          className="w-full bg-gray-50 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xl"
        />
      </div>

      {/* 🔥 SMART CALORIE SECTION */}
      <div className="mb-6 bg-orange-50 p-4 rounded-xl border border-orange-100">
        <label className="block text-xs font-bold text-orange-400 uppercase mb-2">Intensity Level</label>
        
        <div className="flex gap-2 mb-3">
            {['low', 'medium', 'high'].map((level) => (
                <button
                    key={level}
                    type="button"
                    onClick={() => handleIntensityChange(level)}
                    className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold capitalize transition ${
                        formData.intensity === level 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'bg-white text-gray-500 border border-gray-200'
                    }`}
                >
                    {level}
                </button>
            ))}
        </div>

        <div className="relative">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Estimated Calories</label>
            <input
            type="number"
            value={formData.calories}
            onChange={(e) => setFormData({...formData, calories: e.target.value})}
            className="w-full bg-white border border-orange-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500 font-bold text-xl text-orange-600"
            />
            <span className="absolute right-4 top-9 text-xs text-gray-400">cal</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          type="submit" 
          disabled={!formData.type}
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-300 shadow-lg"
        >
          {editingWorkout ? 'Update' : 'Save'}
        </button>
        
        {editingWorkout && (
          <button 
            type="button" 
            onClick={() => setEditingWorkout(null)}
            className="px-6 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default WorkoutForm;