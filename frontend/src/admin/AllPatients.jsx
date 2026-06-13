import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatients } from "../features/adminSlice";

const AllPatients = () => {
  const dispatch = useDispatch();
  const { patients = [], loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      
    
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          All Patients
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          List of all registered patients
        </p>
      </div>

    
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          
          <thead>
            <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Age</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr
                  key={patient._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {patient.firstName}
                  </td>
                  <td className="px-6 py-4">
                    {patient.emailId}
                  </td>
                  <td className="px-6 py-4">
                    {patient.phone}
                  </td>
                  <td className="px-6 py-4">
                    {patient.age}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500"
                >
                  No patients found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AllPatients;
