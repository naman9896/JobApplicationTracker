function StatsCards({ stats, loading, error }) {
  if (loading) {
    return <p className="info-message">Loading dashboard stats...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!stats) return null;

  return (
    <div className="stats">
      <div className="card">Total: {stats.totalApplications}</div>
      <div className="card">Applied: {stats.applied}</div>
      <div className="card">Interviews: {stats.interviewScheduled}</div>
      <div className="card">Rejected: {stats.rejected}</div>
      <div className="card">Offers: {stats.offer}</div>
    </div>
  );
}

export default StatsCards;
