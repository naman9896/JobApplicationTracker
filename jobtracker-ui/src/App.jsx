import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AuthForm from "./components/AuthForm";
import ConfirmDialog from "./components/ConfirmDialog";
import DashboardCharts from "./components/DashboardCharts";
import Filters from "./components/Filters";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Pagination from "./components/Pagination";
import StatsCards from "./components/StatsCards";
import UpcomingInterviews from "./components/UpcomingInterviews";
import useAuth from "./hooks/useAuth";
import useJobApplications from "./hooks/useJobApplications";
import useStats from "./hooks/useStats";
import useUpcomingInterviews from "./hooks/useUpcomingInterviews";
import "./index.css";

function App() {
  const [authMode, setAuthMode] = useState("login");
  const { userEmail, authLoading, isAuthenticated, login, register, logout } =
    useAuth();

  const { stats, statsLoading, statsError, loadStats } =
    useStats(isAuthenticated);

  const {
    upcomingInterviews,
    interviewsLoading,
    interviewsError,
    loadUpcomingInterviews,
  } = useUpcomingInterviews(isAuthenticated);

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
    reloadApplications,
  } = useJobApplications(isAuthenticated, refreshRelatedData);

  useEffect(() => {
    if (isAuthenticated) {
      reloadApplications();
      loadStats();
      loadUpcomingInterviews();
    }
  }, [isAuthenticated]);

  const handleAuthSubmit = async (payload) => {
    const success =
      authMode === "login" ? await login(payload) : await register(payload);

    if (success) {
      await refreshRelatedData();
      await reloadApplications();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container auth-page">
        <Toaster position="top-center" />
        <h1>Job Application Tracker</h1>
        <p className="auth-subtitle">
          Track applications, interviews, rejections, and offers in one place.
        </p>

        <AuthForm
          mode={authMode}
          onSubmit={handleAuthSubmit}
          loading={authLoading}
        />

        <p className="auth-toggle">
          {authMode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            className="link-btn"
            onClick={() =>
              setAuthMode((prev) => (prev === "login" ? "register" : "login"))
            }
          >
            {authMode === "login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <Toaster position="top-center" />

      <div className="top-bar">
        <div>
          <h1>Job Application Tracker</h1>
          <p className="welcome-text">Welcome, {userEmail}</p>
        </div>

        <div className="user-actions">
          <button className="secondary-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

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
