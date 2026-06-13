import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAppointments, cancelAppointment } from '../features/patientSlice';

const MyAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector(state => state.patient);

  useEffect(() => {
    dispatch(getMyAppointments());
  }, [dispatch]);

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(cancelAppointment(id));
    }
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Appointments
        </h1>

        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No appointments found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Symptoms</th>
                  <th className="px-6 py-4">Fees</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
             
                      {appointment.doctor?.firstName || 'N/A'}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {appointment.timeSlot}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {appointment.symptoms || '—'}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      ₹{appointment.fees || '—'}
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

                    <td className="px-6 py-4 text-center">
                      {(appointment.status === 'pending' ||
                        appointment.status === 'confirmed') && (
                        <button
                          onClick={() => handleCancel(appointment._id)}
                          className="px-4 py-1 text-xs font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;