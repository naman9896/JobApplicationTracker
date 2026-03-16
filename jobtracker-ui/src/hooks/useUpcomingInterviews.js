import { useEffect, useState } from "react";
import { getUpcomingInterviews } from "../services/jobApi";

function useUpcomingInterviews() {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [interviewsLoading, setInterviewsLoading] = useState(false);
  const [interviewsError, setInterviewsError] = useState("");

  const loadUpcomingInterviews = async () => {
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
    loadUpcomingInterviews();
  }, []);

  return {
    upcomingInterviews,
    interviewsLoading,
    interviewsError,
    loadUpcomingInterviews,
  };
}

export default useUpcomingInterviews;
