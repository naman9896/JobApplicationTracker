import { useEffect, useState } from "react";
import { getUpcomingInterviews } from "../services/jobApi";

function useUpcomingInterviews(isAuthenticated) {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [interviewsLoading, setInterviewsLoading] = useState(false);
  const [interviewsError, setInterviewsError] = useState("");

  const loadUpcomingInterviews = async () => {
    if (!isAuthenticated) return;

    try {
      setInterviewsLoading(true);
      setInterviewsError("");

      const data = await getUpcomingInterviews();
      setUpcomingInterviews(data);
    } catch (error) {
      console.error("Error loading upcoming interviews:", error);
      setInterviewsError("Failed to load upcoming interviews.");
    } finally {
      setInterviewsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadUpcomingInterviews();
    }
  }, [isAuthenticated]);

  return {
    upcomingInterviews,
    interviewsLoading,
    interviewsError,
    loadUpcomingInterviews,
  };
}

export default useUpcomingInterviews;
