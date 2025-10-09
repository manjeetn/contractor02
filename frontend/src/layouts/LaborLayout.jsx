import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const LaborLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col transition-all duration-300 shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6">Labor Menu</h2>
        <nav className="space-y-2">
          <NavLink
            to="/labor/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/labor/attendance"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"}`
            }
          >
            Attendance History
          </NavLink>
          <NavLink
            to="/labor/payments"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"}`
            }
          >
            Payment History
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default LaborLayout;
