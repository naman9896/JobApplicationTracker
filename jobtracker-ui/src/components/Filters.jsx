function Filters({
  search,
  status,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortChange,
}) {
  return (
    <div className="filters">
      <h2>Filter</h2>
      <div className="filters-grid">
        <input
          type="text"
          placeholder="Search company or role"
          value={search}
          onChange={onSearchChange}
        />

        <select value={status} onChange={onStatusChange}>
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="InterviewScheduled">Interview Scheduled</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>

        <select value={sortBy} onChange={onSortChange}>
          <option value="appliedDateDesc">Latest Applied</option>
          <option value="appliedDateAsc">Oldest Applied</option>
          <option value="companyAsc">Company A–Z</option>
          <option value="companyDesc">Company Z–A</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
