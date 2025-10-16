
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import {Eye, EyeOff} from "lucide-react";

const ResetPassword = () => {
const location = useLocation();
const navigate = useNavigate();

const prefilledEmail = location.state?.email || "";

const [email, setEmail] = useState(prefilledEmail);
const [otp, setOtp] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [resendMsg, setResendMsg] = useState("");
const[showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
setMessage("");
setError("");


if (!email) {
setError("Please provide your email");
return;
}


if (!otp) {
setError("Please enter the OTP sent to your email");
return;
}


if (password !== confirmPassword) {
setError("Both Passwords do not match");
return;
}


try {
const res = await api.post(`/auth/reset-password`, {
email,
otp,
newPassword: password,
});


setMessage(res.data.message || "Password reset successfully");


setTimeout(() => navigate("/login"), 1500);
} catch (err) {
setError(err.response?.data?.message || "Something went wrong");
}
};


 const handleResend = async () => {
  navigate("/forgot-password", { state: { email } });

  };


return (
<div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
<form
onSubmit={handleSubmit}
className="bg-gray-50 p-8 rounded-2xl shadow-md max-w-md w-full"
>
<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
Reset Password
</h2>


{message && <p className="text-green-600 mb-4 font-semibold">{message}</p>}
{error && <p className="text-red-500 mb-4 text-md">{error}</p>}


<input
type="email"
placeholder="Your email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
className="w-full p-3 mb-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
/>


<input
type="text"
placeholder="Enter OTP"
value={otp}
onChange={(e) => setOtp(e.target.value)}
required
maxLength={6}
className="w-full p-3 mb-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
/>

<div className="relative mb-6">
<input
type={showPassword ? "text" : "password"}
placeholder="New Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
className="w-full p-3 mb-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
/>
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>


<div className="relative mb-6">
<input
type={showConfirmPassword ? "text" : "password"}
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
required
className="w-full p-3 mb-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
/>
 <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
  >
    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>

<button
type="submit"
className="w-full bg-[rgba(202,97,22,1)] hover:bg-[rgba(247,116,23,1)] text-white font-semibold py-3 rounded-lg transition"
>
Reset Password
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


export default ResetPassword;