import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, deleteDoctor } from "../features/adminSlice";

const AllDoctors = () => {
  const dispatch = useDispatch();
  const { doctors = [], loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      dispatch(deleteDoctor(id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          All Doctors
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all registered doctors
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          
          
          <thead>
            <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Specialization</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {doctor.firstName}
                  </td>
                  <td className="px-6 py-4">
                    {doctor.emailId}
                  </td>
                  <td className="px-6 py-4">
                    {doctor.specialization}
                  </td>
                  <td className="px-6 py-4">
                    {doctor.phone}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(doctor._id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 active:scale-95 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AllDoctors;
