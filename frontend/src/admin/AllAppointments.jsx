import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointments } from "../features/adminActions";

const AllAppointments = () => {
  const dispatch = useDispatch();
  const { appointments = [], loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);
console.log(appointments);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          All Appointments
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all scheduled appointments
        </p>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          
          <thead>
            <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Doctor</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    {appointment.patient?.firstName || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {appointment.doctorId?.firstName || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {appointment.timeSlot}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
