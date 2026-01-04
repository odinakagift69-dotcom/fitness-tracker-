import React, { useState } from 'react';
import useFitnessStore from '../../store/useFitnessStore';

const UserProfile = () => {
  const { userProfile, updateProfile } = useFitnessStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(userProfile);

  const handleSave = () => {
    updateProfile(tempData);
    setIsEditing(false);
  };

  const getBMIStatus = (bmi) => {
    if (!bmi) return '';
    if (bmi < 18.5) return 'Underweight 🔵';
    if (bmi < 25) return 'Healthy Weight 🟢';
    if (bmi < 30) return 'Overweight 🟡';
    return 'Obese 🔴';
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/50 mb-6 relative overflow-hidden group hover:shadow-2xl transition-all">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl -z-10 opacity-50"></div>

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Hello, {userProfile.name || 'Athlete'}! 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">Ready to crush your goals today?</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
        >
          {isEditing ? 'Close' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <div className="mt-4 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2">
          <input 
            type="text" placeholder="Name" 
            className="p-2 bg-gray-50 rounded-lg text-sm border focus:ring-2 focus:ring-blue-400 outline-none"
            value={tempData.name} onChange={(e) => setTempData({...tempData, name: e.target.value})}
          />
          <input 
            type="number" placeholder="Weight (kg)" 
            className="p-2 bg-gray-50 rounded-lg text-sm border focus:ring-2 focus:ring-blue-400 outline-none"
            value={tempData.weight} onChange={(e) => setTempData({...tempData, weight: e.target.value})}
          />
          <input 
            type="number" placeholder="Height (cm)" 
            className="p-2 bg-gray-50 rounded-lg text-sm border focus:ring-2 focus:ring-blue-400 outline-none"
            value={tempData.height} onChange={(e) => setTempData({...tempData, height: e.target.value})}
          />
          <button onClick={handleSave} className="bg-black text-white rounded-lg text-sm font-bold">Save</button>
        </div>
      ) : (
        <div className="mt-6 flex gap-6">
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase font-bold">Weight</p>
            <p className="text-xl font-black text-gray-800">{userProfile.weight || '--'} <span className="text-xs text-gray-400">kg</span></p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase font-bold">Height</p>
            <p className="text-xl font-black text-gray-800">{userProfile.height || '--'} <span className="text-xs text-gray-400">cm</span></p>
          </div>
          <div className="text-center pl-6 border-l border-gray-100">
            <p className="text-xs text-gray-400 uppercase font-bold">BMI Score</p>
            <p className="text-xl font-black text-blue-600">{userProfile.bmi || '--'}</p>
            <p className="text-[10px] font-bold text-gray-500">{getBMIStatus(userProfile.bmi)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;