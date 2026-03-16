import StatusBadge from "./StatusBadge";

function JobCard({ app, onEdit, onDelete, isDeleting }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{app.companyName}</h3>
        <StatusBadge status={app.status} />
      </div>

      <p>
        <strong>Role:</strong> {app.role}
      </p>
      <p>
        <strong>Location:</strong> {app.location || "N/A"}
      </p>
      <p>
        <strong>Notes:</strong> {app.notes || "N/A"}
      </p>

      <div className="card-buttons">
        <button onClick={() => onEdit(app)} disabled={isDeleting}>
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(app.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
