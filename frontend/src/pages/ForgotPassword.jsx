import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

  try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Check your email for the otp"
      );
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-2xl shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Forgot Password
        </h2>

        {message && <p className="text-orange-700 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
     <button
          type="submit"
          className="w-full bg-[rgba(202,97,22,1)] hover:bg-[rgba(247,116,23,1)] text-white font-semibold py-3 rounded-lg transition"
        >
          Send Reset Link
        </button>

         </form>
    </div>
  );
};

export default ForgotPassword;