import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../services/jobApi";

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("userEmail");

    if (savedToken) setToken(savedToken);
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  const login = async (payload) => {
    try {
      setAuthLoading(true);

      const data = await loginUser(payload);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.email);

      setToken(data.token);
      setUserEmail(data.email);

      toast.success("Logged in successfully.");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed.");
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (payload) => {
    try {
      setAuthLoading(true);

      const data = await registerUser(payload);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.email);

      setToken(data.token);
      setUserEmail(data.email);

      toast.success("Registered successfully.");
      return true;
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Registration failed.");
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = (showMessage = true) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    setToken(null);
    setUserEmail(null);

    if (showMessage) {
      toast.success("Logged out.");
    }
  };

  return {
    token,
    userEmail,
    authLoading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };
}

export default useAuth;
