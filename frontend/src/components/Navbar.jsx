
import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";
import {  UserCircle } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 shadow px-6 py-5 flex justify-between items-center w-full relative">
      <Link to="/" className="text-2xl font-bold text-blue-500">
       Mr. <span className="text-yellow-400">Contractor</span>
      </Link>


      <div className="flex items-center space-x-4">
        {!user && (
          <>
            <Link to="/login" className=" text-white font-semibold hover:text-yellow-500">
              Login
            </Link>
            <Link to="/signup" className="text-white font-semibold hover:text-blue-500">
              Sign Up
            </Link>
          </>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin" 
    className="text-gray-100 font-semibold px-3 py-2 rounded-lg hover:bg-blue-600">
            Dashboard
          </Link>
        )}
         {user && user.role === "sub-admin" && (
          <Link to="/admin" 
    className="text-gray-100 font-semibold px-3 py-2 rounded-lg hover:bg-blue-600">
            Dashboard
          </Link>
        )}
        {user && user.role === "labor" && (
          <Link to="/labor" 
    className="text-gray-100 font-semibold px-3 py-2 rounded-lg hover:bg-blue-600">
           Dashboard
          </Link>
        )}


        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 p-1 rounded-full hover:bg-blue-500"
            >
              <UserCircle size={28} className="text-gray-100" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-blue-500"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 hover:bg-blue-500"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-red-600 font-semibold text-left px-4 py-2 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
