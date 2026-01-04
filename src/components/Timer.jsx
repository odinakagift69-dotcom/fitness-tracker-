import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    // CHANGED: 'bottom-4 right-4' (Corner) and 'scale-90' (Smaller)
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-md border border-gray-200 p-3 rounded-2xl shadow-xl flex items-center gap-4 z-50 scale-90 origin-bottom-right transition-all hover:scale-100">
      
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active</span>
        {/* CHANGED: Smaller text size */}
        <span className="text-xl font-mono font-black text-gray-800">{formatTime(seconds)}</span>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm transition ${isActive ? 'bg-orange-100 text-orange-600' : 'bg-blue-600 text-white'}`}
        >
          {isActive ? '⏸' : '▶'}
        </button>
        <button 
          onClick={() => {setSeconds(0); setIsActive(false);}}
          className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-lg hover:bg-gray-200"
        >
          🔄
        </button>
      </div>
    </div>
  );
};

export default Timer;