import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAppointments, updateAppointmentStatus } from '../features/doctorSlice';

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector(state => state.doctor);

  useEffect(() => {
    dispatch(getMyAppointments());
  }, [dispatch]);

  const handleStatusUpdate = (id, status) => {
    dispatch(updateAppointmentStatus({ id, status }));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading Appointments...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          My Appointments
        </h1>
        <p className="text-gray-500 mt-1">
          Manage and update your patient appointments
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {appointment.patient?.firstName || 'N/A'}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {appointment.timeSlot}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    {appointment.status === 'pending' && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusUpdate(appointment._id, 'confirmed')
                          }
                          className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(appointment._id, 'cancelled')
                          }
                          className="px-3 py-1 text-xs font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {appointment.status === 'confirmed' && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(appointment._id, 'completed')
                        }
                        className="px-3 py-1 text-xs font-medium rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
                      >
                        Mark Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {appointments.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No Appointments Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
