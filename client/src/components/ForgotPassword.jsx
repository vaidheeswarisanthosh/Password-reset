




import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isResetForm, setIsResetForm] = useState(false);
  const [resetToken, setResetToken] = useState(""); // Store token
  const [newPassword, setNewPassword] = useState(""); // Store new password

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Reset link sent successfully.");
        setIsResetForm(true); // Switch to Reset Password form
        setResetToken(data.token); // Save the token from the response
      } else {
        setMessage(data.message || "Error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error sending reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: resetToken, newPassword }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset successfully.");
        setIsResetForm(false); // Reset the state
        setEmail(""); // Clear email
        setNewPassword(""); // Clear password
      } else {
        setMessage(data.message || "Error resetting password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          {isResetForm ? "Reset Password" : "Forgot Password"}
        </h2>

        {!isResetForm ? (
          // Forgot Password Form
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          // Reset Password Form
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("successfully") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;






