import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContexts';
import api from '../api/api';
import { Eye, EyeOff } from "lucide-react"; 


const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] =useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      login(res.data.token, res.data.user);

      if (res.data.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (res.data.user.role === 'sub-admin') {
        navigate('/admin' , { replace: true });
      } else if (res.data.user.role === 'labor') {
        navigate('/labor', { replace: true });
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }finally{
       setTimeout(() => setError(""), 3000);

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-2xl shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

     <div className="relative mb-6">
      <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Password"
       value={formData.password}
       onChange={handleChange}
      required
      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
     />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
          >
       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
         </button>
       </div>
        
        <button
          type="submit"
          className="w-full bg-[rgba(202,97,22,1)] hover:bg-[rgba(247,116,23,1)] text-white font-semibold py-3 rounded-lg transition"
        >
          Login
        </button>
      <div className="flex justify-center items-center mt-4">
          <p className="text-gray-600 text-sm"></p>
          <Link
            to="/forgot-password"
            className="ml-2 text-md text-orange-600 font-medium hover:underline"
          >
            Forgot Your Pasword?
          </Link>
        </div>

        <div className="flex justify-center items-center mt-4">
          <p className="text-gray-700 text-md">Don't have an account?</p>
          <Link
            to="/signup"
            className="ml-2 text-md text-orange-600 font-medium hover:underline"
          >
            Signup
          </Link>
        </div>
          
      </form>
    </div>
  );
};

export default Login;
