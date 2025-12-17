import useFitnessStore from '../../store/useFitnessStore';

const DashboardSummary = () => {
  // 1. Grab the workouts from the store
  const workouts = useFitnessStore((state) => state.workouts);

  // 2. Calculate Derived State (The Math)
  const totalWorkouts = workouts.length;
  
  // Use .reduce() to sum up the calories
  const totalCalories = workouts.reduce((total, workout) => {
    return total + workout.calories;
  }, 0);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {/* Card 1: Total Workouts */}
      <div className="bg-blue-600 rounded-lg p-4 text-white shadow-md">
        <h3 className="text-lg font-medium opacity-90">Total Workouts</h3>
        <p className="text-3xl font-bold mt-1">{totalWorkouts}</p>
      </div>

      {/* Card 2: Total Calories */}
      <div className="bg-orange-500 rounded-lg p-4 text-white shadow-md">
        <h3 className="text-lg font-medium opacity-90">Calories Burned</h3>
        <p className="text-3xl font-bold mt-1">{totalCalories} 🔥</p>
      </div>
    </div>
  );
};

export default DashboardSummary;