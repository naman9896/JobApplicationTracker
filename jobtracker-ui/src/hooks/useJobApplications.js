import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplication,
} from "../services/jobApi";

function useJobApplications(isAuthenticated, onDataChanged) {
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("appliedDateDesc");
  const [editingId, setEditingId] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    status: "Applied",
    appliedDate: new Date().toISOString(),
    interviewDate: "",
    notes: "",
    location: "",
    jobUrl: "",
  });

  const loadApplications = async () => {
    if (!isAuthenticated) return;

    try {
      setApplicationsLoading(true);
      setApplicationsError("");

      const data = await getApplications({
        status: status || undefined,
        search: search || undefined,
        page,
        pageSize,
        sortBy,
      });

      setApplications(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplicationsError("Failed to load job applications.");
      toast.error("Failed to load job applications.");
    } finally {
      setApplicationsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadApplications();
    } else {
      setApplications([]);
      setTotalPages(1);
      setPage(1);
      setEditingId(null);
      setApplicationsError("");
    }
  }, [isAuthenticated, status, search, sortBy, page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      role: "",
      status: "Applied",
      appliedDate: new Date().toISOString(),
      interviewDate: "",
      notes: "",
      location: "",
      jobUrl: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      interviewDate: formData.interviewDate
        ? new Date(formData.interviewDate).toISOString()
        : null,
    };

    try {
      setFormSubmitting(true);

      if (editingId) {
        await updateApplication(editingId, payload);
        toast.success("Application updated successfully.");
      } else {
        await createApplication(payload);
        toast.success("Application added successfully.");
      }

      resetForm();
      await loadApplications();

      if (onDataChanged) {
        await onDataChanged();
      }
    } catch (error) {
      console.error("Error saving application:", error);
      console.error("Status:", error?.response?.status);
      console.error("Response data:", error?.response?.data);

      const backendMessage =
        error?.response?.data?.title ||
        error?.response?.data?.message ||
        (Array.isArray(error?.response?.data?.errors)
          ? error.response.data.errors.join(", ")
          : null) ||
        "Failed to save application.";

      setApplicationsError(backendMessage);
      toast.error(backendMessage);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEdit = (app) => {
    setEditingId(app.id);
    setFormData({
      companyName: app.companyName || "",
      role: app.role || "",
      status: app.status || "Applied",
      appliedDate: app.appliedDate || new Date().toISOString(),
      interviewDate: app.interviewDate
        ? new Date(app.interviewDate).toISOString().slice(0, 16)
        : "",
      notes: app.notes || "",
      location: app.location || "",
      jobUrl: app.jobUrl || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
    setConfirmOpen(false);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      setDeletingId(pendingDeleteId);

      await deleteApplication(pendingDeleteId);

      if (editingId === pendingDeleteId) {
        resetForm();
      }

      await loadApplications();

      if (onDataChanged) {
        await onDataChanged();
      }

      toast.success("Application deleted successfully.");
    } catch (error) {
      console.error("Error deleting application:", error);
      setApplicationsError("Failed to delete application.");
      toast.error("Failed to delete application.");
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
      setConfirmOpen(false);
    }
  };

  return {
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
    reloadApplications: loadApplications,
  };
}

export default useJobApplications;
