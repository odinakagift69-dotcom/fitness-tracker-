import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserStore } from '../store/userStore';

function WorkoutChart() {
  const { workouts } = useUserStore();

  // SAFETY 1: If workouts is undefined/null, render nothing
  if (!workouts || !Array.isArray(workouts)) return null;

  // SAFETY 2: If list is empty, show a message
  if (workouts.length === 0) {
    return <div style={{textAlign: 'center', padding: '20px', color: '#999'}}>No data for chart yet</div>;
  }

  // Process Data
  const dataMap = {};
  workouts.forEach(workout => {
    if (workout.date) {
      const date = new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dataMap[date] = (dataMap[date] || 0) + 1;
    }
  });

  const chartData = Object.keys(dataMap).map(date => ({
    date,
    count: dataMap[date]
  })).reverse(); 

  return (
    <div className="chart-container" style={{ padding: '20px' }}>
      <h3>📊 Activity History</h3>
      
      {/* ✅ FIXED: We give this div a HARD height of 300px. 
          This guarantees the chart always has space to draw. */}
      <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="date" stroke="#888" fontSize={12} />
            <YAxis allowDecimals={false} stroke="#888" fontSize={12} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Bar dataKey="count" fill="#007bff" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WorkoutChart;