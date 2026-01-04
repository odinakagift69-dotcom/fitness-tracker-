import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import useFitnessStore from '../../store/useFitnessStore';

const WorkoutChart = () => {
  const workouts = useFitnessStore((state) => state.workouts);

  // 1. Prepare Data: We need to group workouts by type for the chart
  // Example result: [{name: 'Running', calories: 500}, {name: 'Cycling', calories: 300}]
  
  const chartData = workouts.reduce((acc, workout) => {
    // Check if we already have this activity type in our list
    const existing = acc.find(item => item.name === workout.type);
    
    if (existing) {
      existing.calories += workout.calories; // Add to existing total
    } else {
      acc.push({ name: workout.type, calories: workout.calories }); // Create new entry
    }
    
    return acc;
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Calories by Activity</h3>
      
      <div className="h-64 w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#6b7280', fontSize: 12}}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#6b7280', fontSize: 12}}
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Bar 
                dataKey="calories" 
                fill="#4f46e5" // Indigo color
                radius={[4, 4, 0, 0]} 
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Add workouts to see your stats chart!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutChart;