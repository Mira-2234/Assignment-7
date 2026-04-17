import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const PIE_COLORS = { Call: "#2563eb", Text: "#7c3aed", Video: "#16a34a" };

export default function StatsPage({ timeline }) {
  const counts = { Call: 0, Text: 0, Video: 0 };

  timeline.forEach((e) => {
    if (counts[e.type] !== undefined) counts[e.type]++;
  });

  const pieData = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({
      name,
      value,
      color: PIE_COLORS[name],
    }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Friendship Analytics
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-8">
        
        <p className="text-sm text-gray-500 mb-6">
          By Interaction Type
        </p>

        <div className="flex justify-center">
          {pieData.length === 0 ? (
            <p className="text-gray-400">No data yet</p>
          ) : (
            <ResponsiveContainer width={250} height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
}