import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, ListChecks } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                } hover:text-blue-500`
              }
            >
              <ListChecks size={20} />
              <span>To-Do List</span>
            </NavLink>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
