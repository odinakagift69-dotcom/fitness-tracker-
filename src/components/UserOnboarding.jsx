import React, { useState } from 'react';
// 1. We import the store hook
import useStore from '../store';
import { calculateBMI, getBMICategory, calculateDailyCalories } from '../utils/fitnessLogic';

const UserOnboarding = () => {
  // 2. We get the login function from the store
  const loginUser = useStore((state) => state.loginUser);

  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    currentWeight: '',
    activityLevel: 'sedentary',
    goal: 'lose_weight',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 3. Calculate the numbers
    const bmi = calculateBMI(formData.currentWeight, formData.height);
    const category = getBMICategory(bmi);
    const dailyCalories = calculateDailyCalories(formData);

    const fullProfile = {
      ...formData,
      bmi,
      bmiCategory: category,
      dailyCalories,
    };

    console.log("Saving user to store:", fullProfile);

    // 4. THIS IS THE KEY CHANGE:
    // No alert() here. Just save to store.
    loginUser(fullProfile);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Image */}
      <div 
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            Transform Your Body,<br />
            <span className="text-blue-400">Master Your Life.</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed max-w-md">
            Join thousands of users tracking their fitness journey.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create your profile</h2>
            <p className="text-gray-500 mt-2">Let's calculate your personalized metrics.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="25" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="175" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                <input type="number" name="currentWeight" value={formData.currentWeight} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="70" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Level</label>
              <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="sedentary">Sedentary (Office job)</option>
                <option value="light">Lightly Active (1-3 days)</option>
                <option value="moderate">Moderately Active (3-5 days)</option>
                <option value="active">Very Active (6-7 days)</option>
              </select>
            </div>

             <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Goal</label>
              <select name="goal" value={formData.goal} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="lose_weight">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain_weight">Build Muscle</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              Generate My Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;