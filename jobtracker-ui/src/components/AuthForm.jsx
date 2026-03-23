import { useState } from "react";

function AuthForm({ mode, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form auth-form" onSubmit={handleSubmit}>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading
          ? mode === "login"
            ? "Logging in..."
            : "Registering..."
          : mode === "login"
            ? "Login"
            : "Register"}
      </button>
    </form>
  );
}

export default AuthForm;
