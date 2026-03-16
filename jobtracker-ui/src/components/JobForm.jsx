function JobForm({
  formData,
  editingId,
  onChange,
  onSubmit,
  onCancelEdit,
  isSubmitting,
}) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Add new application</h2>
      <input
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={onChange}
        required
        disabled={isSubmitting}
      />

      <input
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={onChange}
        required
        disabled={isSubmitting}
      />

      <select
        name="status"
        value={formData.status}
        onChange={onChange}
        disabled={isSubmitting}
      >
        <option value="Applied">Applied</option>
        <option value="InterviewScheduled">Interview Scheduled</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>

      <div>
        <label>Interview Date & Time</label>
        <input
          type="datetime-local"
          name="interviewDate"
          value={formData.interviewDate}
          onChange={onChange}
          disabled={isSubmitting}
        />
      </div>

      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={onChange}
        disabled={isSubmitting}
      />

      <input
        name="jobUrl"
        placeholder="Job URL"
        value={formData.jobUrl}
        onChange={onChange}
        disabled={isSubmitting}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={onChange}
        disabled={isSubmitting}
      />

      <div className="form-buttons">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? editingId
              ? "Updating..."
              : "Adding..."
            : editingId
              ? "Update Application"
              : "Add Application"}
        </button>

        {editingId && (
          <button
            type="button"
            className="secondary-btn"
            onClick={onCancelEdit}
            disabled={isSubmitting}
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}

export default JobForm;
