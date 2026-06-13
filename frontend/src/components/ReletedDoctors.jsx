import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getRelatedDoctors } from "../features/doctorSlice"

function ReletedDoctors({ id, speciality }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { relatedDoctors, currencySymbol } = useSelector((state) => ({
    relatedDoctors: state.doctor?.relatedDoctors || [],
    currencySymbol: state.doctor?.currencySymbol || '$'
  }))

  useEffect(() => {
    if (id && speciality) {
      dispatch(getRelatedDoctors({ id, speciality }))
    }
  }, [dispatch, id, speciality])

  if (relatedDoctors.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Doctors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedDoctors.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/appointment/${doctor._id}`)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <img
              src={doctor.photo || '/default-doctor.png'}
              alt={doctor.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-gray-900">{doctor.name}</h3>
              <p className="text-indigo-600 text-sm">{doctor.speciality}</p>
              <p className="text-gray-600 text-sm mt-1">{currencySymbol}{doctor.fees}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReletedDoctors