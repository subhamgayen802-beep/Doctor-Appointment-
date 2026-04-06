import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const AdminPanel = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/create-doctor", label: "Create Doctor" },
    { path: "/admin/doctors", label: "All Doctors" },
    { path: "/admin/patients", label: "All Patients" },
    { path: "/admin/appointments", label: "Appointments" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      

      <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            Admin Panel
          </h2>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
