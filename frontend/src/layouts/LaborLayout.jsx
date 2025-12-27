
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, LayoutDashboard, CalendarCheck,CreditCard } from "lucide-react";

const LaborLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        setIsCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-md transition ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
    }`;

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex items-center justify-between bg-gray-800 text-white p-4 md:hidden">
        <h2 className="text-lg font-bold">Labor Panel</h2>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700 rounded-md"
        >
          <Menu size={22} />
        </button>
      </div>

      <aside
        ref={sidebarRef}
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300
          ${isCollapsed ? "hidden" : "block"} 
          md:block
          ${isCollapsed ? "md:w-20" : "md:w-48"}
          ${!isCollapsed && "absolute md:relative w-full z-50"}
        `}
      >
        <div className="hidden md:flex items-center justify-between p-4">
          {!isCollapsed && <h2 className="text-lg font-bold">Labor Menu</h2>}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-700 rounded-md"
          >
            <Menu size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-2">
          <NavLink to="/labor/dashboard" className={linkClasses}>
            <LayoutDashboard size={20} />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/labor/attendance" className={linkClasses}>
            <CalendarCheck size={20} /> 
            {!isCollapsed && <span>Attendance History</span>}
          </NavLink>

          <NavLink to="/labor/payments" className={linkClasses}>
              <CreditCard size={20} />
            {!isCollapsed && <span>Payment History</span>}
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default LaborLayout;
