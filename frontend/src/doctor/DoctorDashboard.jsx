import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorDashboard } from '../features/doctorActions';

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector(state => state.doctor);

  useEffect(() => {
    dispatch(getDoctorDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">


      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Doctor Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your appointments and patients
        </p>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

       
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-sm uppercase tracking-wider opacity-80">
              Today's Appointments
            </h3>
            <p className="text-3xl font-bold mt-2">
              {stats.todaysAppointments || 0}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-sm uppercase tracking-wider opacity-80">
              Total Patients
            </h3>
            <p className="text-3xl font-bold mt-2">
              {stats.totalAppointments || 0}
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-sm uppercase tracking-wider opacity-80">
              Pending Appointments
            </h3>
            <p className="text-3xl font-bold mt-2">
              {stats.pendingAppointments || 0}
            </p>
          </div>

      
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-sm uppercase tracking-wider opacity-80">
              Completed Appointments
            </h3>
            <p className="text-3xl font-bold mt-2">
              {stats.completedAppointments || 0}
            </p>
          </div>

        </div>
      )}

  
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Quick Summary
        </h2>
        <p className="text-gray-500 text-sm">
          Monitor your daily performance and manage appointments efficiently.
        </p>
      </div>

    </div>
  );
};

export default DoctorDashboard;
