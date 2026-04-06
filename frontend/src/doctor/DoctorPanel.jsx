import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const DoctorPanel = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/doctor/dashboard', label: 'Dashboard' },

    { path: '/doctor/appointments', label: 'Appointments' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

    
      <div className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        
    
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-600">
            Doctor Panel
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

      
        <div className="p-4 border-t text-sm text-gray-400">
          © 2026 Doctor System
        </div>
      </div>

      <div className="flex-1 flex flex-col">

     
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Doctor Dashboard
          </h1>
        </header>

        
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DoctorPanel;
