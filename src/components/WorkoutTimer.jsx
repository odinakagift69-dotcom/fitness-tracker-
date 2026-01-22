import React, { useState, useEffect } from 'react';
import useStore from '../store';

const WorkoutTimer = ({ onClose }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const addWorkoutLog = useStore((state) => state.addWorkoutLog);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds) => {
    const getSeconds = `0${totalSeconds % 60}`.slice(-2);
    const minutes = Math.floor(totalSeconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    return { min: getMinutes, sec: getSeconds };
  };

  const timeDisplay = formatTime(seconds);

  const handleFinish = () => {
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: `${timeDisplay.min}:${timeDisplay.sec}`,
      caloriesBurned: Math.floor((seconds / 60) * 8) || 1, 
    };
    addWorkoutLog(newLog);
    onClose();
  };

  return (
    // GLASSMORPHISM CONTAINER: Semi-transparent black background with blur
    <div className="fixed bottom-6 right-6 backdrop-blur-md bg-black/80 text-white p-6 rounded-3xl shadow-2xl border border-gray-700 w-72 animate-slide-up z-50">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
            Current Session
          </h3>
          <p className="text-sm font-semibold text-blue-400">
            {isActive ? '🔥 Burning Calories' : '⏸️ Paused'}
          </p>
        </div>
        
        {/* Close Button (X) */}
        <button onClick={onClose} className="text-gray-500 hover:text-white transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      {/* CIRCULAR TIMER DISPLAY */}
      <div className="relative flex items-center justify-center py-4">
        {/* SVG Ring Background */}
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-800"
          />
          {/* Animated Progress Ring */}
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="440"
            strokeDashoffset={440 - (440 * (seconds % 60)) / 60} // Calculates ring fill based on seconds
            className={`text-blue-500 transition-all duration-1000 ease-linear ${!isActive && 'opacity-50'}`}
            strokeLinecap="round"
          />
        </svg>

        {/* Digital Time Text (Centered) */}
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-mono font-bold tracking-tighter">
            {timeDisplay.min}:{timeDisplay.sec}
          </span>
          <span className="text-xs text-gray-400 uppercase mt-1">Duration</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`py-3 rounded-xl font-bold text-sm transition-all transform active:scale-95 ${
            isActive 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
          }`}
        >
          {isActive ? 'PAUSE' : 'RESUME'}
        </button>
        
        <button 
          onClick={handleFinish}
          className="py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-500/30 transform active:scale-95 transition-all"
        >
          FINISH
        </button>
      </div>

    </div>
  );
};

export default WorkoutTimer;