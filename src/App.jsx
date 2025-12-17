import useFitnessStore from './store/useFitnessStore';
import WorkoutForm from './components/workouts/WorkoutForm'; // <-- New Import
import DashboardSummary from './components/dashboard/DashboardSummary';
function App() {
  const { workouts, deleteWorkout } = useFitnessStore();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-800">
           Fitness Tracker 💪
        </h1>
        <p className="text-xl text-gray-600 mt-2">Log, Track, and Dominate Your Fitness Goals</p>
      </header>

      {/* Two Column Layout (Based on our sketch) */}
      <main className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        
        {/* LEFT COLUMN: The Form (w-full on mobile, w-1/3 on large screens) */}
        <section className="lg:w-1/3">
          <WorkoutForm />
        </section>

        {/* RIGHT COLUMN: The Activity Feed (w-full on mobile, w-2/3 on large screens) */}
        <section className="lg:w-2/3">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 border-b pb-2">Your Activity Feed</h2>
          
          <div className="space-y-4">
            {workouts.length === 0 ? (
              <p className="text-gray-500 italic">No workouts logged yet. Start logging above!</p>
            ) : (
              // Map over workouts to display the list
              workouts.map((workout) => (
                <div 
                  key={workout.id} 
                  className="bg-white p-5 rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition duration-200"
                >
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{workout.type}</h3>
                    <p className="text-sm text-gray-500">
                      {workout.date}
                    </p>
                    <p className="text-gray-600 mt-1">
                      **{workout.duration}** mins | **{workout.calories}** cal
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => deleteWorkout(workout.id)}
                    className="text-red-500 hover:text-red-700 font-semibold py-2 px-4 rounded transition duration-150"
                    aria-label={`Delete ${workout.type} workout`}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App;