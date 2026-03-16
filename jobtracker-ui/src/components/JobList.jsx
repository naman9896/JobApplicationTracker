import JobCard from "./JobCard";

function JobList({
  applications,
  onEdit,
  onDelete,
  loading,
  error,
  deletingId,
}) {
  if (loading) {
    return <p className="info-message">Loading job applications...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (applications.length === 0) {
    return <p className="info-message">No job applications found.</p>;
  }

  return (
    <div className="list">
      <h2>Ongoing Applications</h2>
      {applications.map((app) => (
        <JobCard
          key={app.id}
          app={app}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === app.id}
        />
      ))}
    </div>
  );
}

export default JobList;
