import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";

const OtpVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [alert, setAlert] = useState(null); 
  const [resendMsg, setResendMsg] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    try {
      await api.post("/auth/verify-otp", formData);
      setAlert({ type: "success", msg: " Email verified! Redirecting to login..." });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setAlert({
        type: "error",
        msg: err.response?.data?.message || "Verification failed",
      });
    }
  };

  const handleResend = async () => {
    try {
      setResendMsg("");
      await api.post("/auth/resend-otp", { email: formData.email });
      setAlert({
        type: "info",
        msg: "A new OTP has been sent. Please check your inbox or spam folder.",
      });
    } catch (err) {
      setAlert({
        type: "error",
        msg: err.response?.data?.message || "Failed to resend OTP",
      });
    }
  };

  const Alert = ({ type, msg }) => {
    const base =
      "p-3 mb-4 rounded-lg text-lg font-medium flex items-center justify-center";
    const styles = {
      success: "text-green-700",
      error: "text-red-600",
      info: "text-blue-700 font-semibold",
    };
    return <div className={`${base} ${styles[type]}`}>{msg}</div>;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Verify Your Email
        </h2>


 {formData.email && (
  <p className="text-base text-gray-700 mb-4 text-center">
     We've sent a <span className="font-semibold text-gray-900">6-digit OTP </span>  
    to your email address:  
    <span className="block font-semibold text-lg text-orange-600 mt-1">
      {formData.email}
    </span>
  </p>
)}

        {alert && <Alert type={alert.type} msg={alert.msg} />}

        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full p-3 mb-4 border rounded-lg bg-gray-100 cursor-not-allowed"
        />

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700"
        >
          Verify
        </button>

        <p className="text-sm text-gray-800 mt-4 text-center">
          Didn't get OTP?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-orange-600 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </form>
    </div>
  );
};

export default OtpVerify;
