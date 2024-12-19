import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "https://password-reset-fuax.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle error response from the server
        setError(data.message || "Failed to login. Please try again.");
        setLoading(false);
        return;
      }

      // Handle successful login (e.g., saving token to localStorage)
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);

      // Display success message
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        // Redirect or perform further actions here
        window.location.href = "/dashboard"; // Replace with your desired route
      }, 2000); // Delay before redirecting
    } catch (err) {
      // Handle network or unexpected errors
      console.error("Error logging in:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl italic font-bold text-center font-poppins">
          Login
        </h2>
        {error && (
          <div className="p-2 mb-4 text-sm text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="p-2 mb-4 text-sm text-green-500 bg-green-100 rounded">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 italic text-white bg-blue-500 rounded hover:bg-blue-600 font-poppins"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Navigation options */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Forgot your password?{" "}
            <Link to="/forgot-Password" className="text-blue-500 hover:underline">
              Forgot Password
            </Link>
          </p>
          <p className="mt-2 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;




