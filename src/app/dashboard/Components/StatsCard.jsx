export default function StatsCard({ title, value, icon, color = 'blue' }) {
  return (
    <div className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4 rounded shadow-md`}>
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}
