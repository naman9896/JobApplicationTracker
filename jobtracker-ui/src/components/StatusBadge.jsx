function StatusBadge({ status }) {
  const getStatusClass = () => {
    switch (status) {
      case "Applied":
        return "status-badge applied";
      case "InterviewScheduled":
        return "status-badge interview";
      case "Rejected":
        return "status-badge rejected";
      case "Offer":
        return "status-badge offer";
      default:
        return "status-badge";
    }
  };

  const formatStatusText = (value) => {
    switch (value) {
      case "InterviewScheduled":
        return "Interview Scheduled";
      default:
        return value;
    }
  };

  return <span className={getStatusClass()}>{formatStatusText(status)}</span>;
}

export default StatusBadge;
