import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function DashboardCharts({ stats, loading, error }) {
  if (loading) {
    return <p className="info-message">Loading charts...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!stats) return null;

  const barData = [
    { name: "Applied", value: stats.applied },
    { name: "Interviews", value: stats.interviewScheduled },
    { name: "Rejected", value: stats.rejected },
    { name: "Offers", value: stats.offer },
  ];

  const pieData = [
    { name: "Applied", value: stats.applied },
    { name: "Interview Scheduled", value: stats.interviewScheduled },
    { name: "Rejected", value: stats.rejected },
    { name: "Offer", value: stats.offer },
  ];

  const COLORS = ["#3b82f6", "#f59e0b", "#ef4444", "#22c55e"];

  return (
    <div className="charts-section">
      <h2>Dashboard Insights</h2>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Applications by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashboardCharts;
