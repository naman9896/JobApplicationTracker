import StatusBadge from "./StatusBadge";

function UpcomingInterviews({ interviews, loading, error }) {
  return (
    <div className="interview-section">
      <h2>Upcoming Interviews</h2>

      {loading ? (
        <p className="info-message">Loading upcoming interviews...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : interviews.length === 0 ? (
        <p>No upcoming interviews scheduled.</p>
      ) : (
        <div className="interview-list">
          {interviews.map((interview) => (
            <div key={interview.id} className="interview-card">
              <div className="job-card-header">
                <h3>{interview.companyName}</h3>
                <StatusBadge status={interview.status} />
              </div>

              <p>
                <strong>Role:</strong> {interview.role}
              </p>
              <p>
                <strong>Interview Date:</strong>{" "}
                {new Date(interview.interviewDate).toLocaleString()}
              </p>
              <p>
                <strong>Location:</strong> {interview.location || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingInterviews;
