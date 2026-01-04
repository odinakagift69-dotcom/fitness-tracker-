import { useState } from 'react';
import useFitnessStore from './store/useFitnessStore';
import WorkoutForm from './components/workouts/WorkoutForm';
import WorkoutChart from './components/dashboard/WorkoutChart';
import DashboardSummary from './components/dashboard/DashboardSummary';
import UserProfile from './components/dashboard/UserProfile'; // Import new profile
import Timer from './components/Timer';

// 🎨 HIGH-QUALITY MEMOJI AVATARS (Person-Based)
const ACTIVITY_IMAGES = {
  // A person running
  'Running': 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20Running.png',
  // A person biking
  'Cycling': 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20Biking.png',
  // A person swimming
  'Swimming': 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20Swimming.png',
  // A person lifting weights
  'Weights': 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20Lifting%20Weights.png',
  // A person in lotus position
  'Yoga': 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20in%20Lotus%20Position.png',
  // Sparkles for other
  'Other': 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png'
};

function App() {
  const { workouts, deleteWorkout, setEditingWorkout, editingWorkout } = useFitnessStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // 🕒 NEW: Time Filter State
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'today', 'week', 'month'

  const getFilteredWorkouts = () => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    // First, filter by Search Term
    let filtered = workouts.filter((w) => 
      w.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Second, filter by Time
    if (timeFilter === 'today') {
      filtered = filtered.filter(w => w.date === todayStr);
    } 
    else if (timeFilter === 'week') {
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      filtered = filtered.filter(w => new Date(w.date) >= oneWeekAgo);
    }
    // 'all' does nothing (shows everything)

    return filtered;
  };

  const finalWorkouts = getFilteredWorkouts();

  // Helper to get image
  const getIcon = (type) => ACTIVITY_IMAGES[type] || ACTIVITY_IMAGES['Other'];

  return (
    // Changed bg to a richer gradient
    <div className="min-h-screen bg-[#F3F4F6] text-gray-800 font-sans pb-32">
      
      {/* 🟢 Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 px-6 py-4 flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-black text-white p-2 rounded-lg font-bold text-xl">FIT</div>
          <h1 className="font-bold text-xl tracking-tight">ProTracker</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400"></div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 👈 LEFT SIDEBAR (Profile & Form) - Takes 4 columns */}
        <section className="lg:col-span-4 space-y-6">
          <UserProfile /> 
          <DashboardSummary />
          <WorkoutForm key={editingWorkout?.id || 'new'} />
        </section>

        {/* 👉 RIGHT CONTENT (Chart & Feed) - Takes 8 columns */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Analytics</h3>
                {/* 🕒 Time Filter Buttons */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {['all', 'week', 'today'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTimeFilter(filter)}
                      className={`px-4 py-1 rounded-lg text-xs font-bold capitalize transition ${
                        timeFilter === filter ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
             </div>
             <WorkoutChart />
          </div>

          {/* Activity Feed Header */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold">Recent Activity</h2>
              <p className="text-gray-400 text-sm">Your latest sessions</p>
            </div>
            {/* Search Bar */}
            <div className="relative">
               <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none w-40 focus:w-64 transition-all"
              />
            </div>
          </div>
          
          {/* The List */}
          <div className="grid grid-cols-1 gap-3">
            {finalWorkouts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">No workouts found for this filter.</p>
              </div>
            ) : (
              finalWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    {/* 3D Icon */}
                    <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center p-1">
                      <img src={getIcon(workout.type)} alt={workout.type} className="w-full h-full object-contain" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800">{workout.type}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-bold">{workout.date}</span>
                        <span>•</span>
                        <span>{workout.duration} min</span>
                        <span>•</span>
                        <span className="text-orange-500 font-bold">{workout.calories} kcal</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingWorkout(workout)} className="p-2 hover:bg-gray-100 rounded-lg">✏️</button>
                    <button onClick={() => deleteWorkout(workout.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg">🗑️</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Timer/> 
    </div>
  )
}

export default App;