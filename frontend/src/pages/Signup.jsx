import React, { useState } from 'react';
import api from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react"; // 👈 import these icons

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'labor',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

 const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

 if (!emailRegex.test(formData.email)) {
    setError("Please enter a valid email address");
    return;
  }

    try {
      await api.post('/auth/signup', formData);
    navigate("/verify-otp", { state: { email: formData.email } });


    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-2xl shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

       <div className="relative mb-6">
          <input
         type={showPassword ? "text" : "password"}
         name="password"
         placeholder="Password"
         value={formData.password}
         onChange={handleChange}
         required
         className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
       />

          <button
          type="button"
         onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
          >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
         </button>
       </div>



       <label className="block mb-4 text-gray-700 font-medium">
        Role:
       <div className="relative ">
       <select
        name="role"
        value={formData.role}
      disabled
      className="appearance-none w-full ml-0 p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
        >
      <option value="labor">Labor</option>
      </select>

     </div>
     </label>



        <button
          type="submit"
          className="w-full bg-[rgba(202,97,22,1)] hover:bg-[rgba(247,116,23,1)] text-white font-semibold py-3 rounded-lg transition"
        >
          Create Account
        </button>

        <div className="flex justify-center items-center mt-4">
          <p className="text-gray-700 text-md">Already have an account?</p>
          <Link
            to="/login"
            className="ml-2 text-md text-orange-600 font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};


export default Signup;
