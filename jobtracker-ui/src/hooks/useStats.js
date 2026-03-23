import { useEffect, useState } from "react";
import { getStats } from "../services/jobApi";

function useStats(isAuthenticated) {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState("");

  const loadStats = async () => {
    if (!isAuthenticated) return;

    try {
      setStatsLoading(true);
      setStatsError("");

      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
      setStatsError("Failed to load dashboard stats.");
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated]);

  return {
    stats,
    statsLoading,
    statsError,
    loadStats,
  };
}

export default useStats;
