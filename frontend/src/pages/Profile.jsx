import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <p className="text-center mt-16 text-gray-500 text-lg font-semibold">
        Please login to view your profile.
      </p>
    );
  }

  const avatarLetter = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="flex flex-col items-center mt-16 px-6 sm:px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-6 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-blue-600 to-purple-700 text-white text-6xl font-extrabold shadow-lg transform transition duration-500 hover:scale-105 select-none">
            {avatarLetter}
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-wide">{user.name}</h1>
        <p className="text-blue-700 bg-gray-50 mb-4 border p-2 rounded-md text-md sm:text-base">{user.email}</p>
        <span className="inline-block px-10 py-2 rounded-full text-indigo-700 bg-indigo-50 font-semibold text-md">
          {user.role}
        </span>

        <div className="mt-8 text-gray-700 space-y-2 text-left text-sm sm:text-base leading-relaxed">
          <p>
            <strong>Joined:</strong>{" "}
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
