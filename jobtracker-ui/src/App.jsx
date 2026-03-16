import { Toaster } from "react-hot-toast";
import ConfirmDialog from "./components/ConfirmDialog";
import DashboardCharts from "./components/DashboardCharts";
import Filters from "./components/Filters";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Pagination from "./components/Pagination";
import StatsCards from "./components/StatsCards";
import UpcomingInterviews from "./components/UpcomingInterviews";
import useJobApplications from "./hooks/useJobApplications";
import useStats from "./hooks/useStats";
import useUpcomingInterviews from "./hooks/useUpcomingInterviews";
import "./index.css";

function App() {
  const { stats, statsLoading, statsError, loadStats } = useStats();

  const {
    upcomingInterviews,
    interviewsLoading,
    interviewsError,
    loadUpcomingInterviews,
  } = useUpcomingInterviews();

  const refreshRelatedData = async () => {
    await loadStats();
    await loadUpcomingInterviews();
  };

  const {
    applications,
    status,
    search,
    sortBy,
    editingId,
    page,
    totalPages,
    formData,
    applicationsLoading,
    applicationsError,
    formSubmitting,
    deletingId,
    confirmOpen,
    handleChange,
    handleSearchChange,
    handleStatusChange,
    handleSortChange,
    handleSubmit,
    handleEdit,
    requestDelete,
    confirmDelete,
    cancelDelete,
    resetForm,
    setPage,
  } = useJobApplications(refreshRelatedData);

  return (
    <div className="container">
      <Toaster position="top-center" />
      <h1>Job Application Tracker</h1>

      <StatsCards stats={stats} loading={statsLoading} error={statsError} />

      <DashboardCharts
        stats={stats}
        loading={statsLoading}
        error={statsError}
      />

      <UpcomingInterviews
        interviews={upcomingInterviews}
        loading={interviewsLoading}
        error={interviewsError}
      />

      <Filters
        search={search}
        status={status}
        sortBy={sortBy}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      />

      <JobForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancelEdit={resetForm}
        isSubmitting={formSubmitting}
      />

      <JobList
        applications={applications}
        onEdit={handleEdit}
        onDelete={requestDelete}
        loading={applicationsLoading}
        error={applicationsError}
        deletingId={deletingId}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete application"
        message="Are you sure you want to delete this job application? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={Boolean(deletingId)}
      />
    </div>
  );
}

export default App;
