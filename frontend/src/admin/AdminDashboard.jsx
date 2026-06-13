import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboard } from "../features/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      

      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of platform statistics
        </p>
      </div>


      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

       
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">
              Total Doctors
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.totalDoctors || 0}
            </p>
          </div>

        
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">
              Total Patients
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.totalPatients || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">
              Total Appointments
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.totalAppointments || 0}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
