import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useCallback } from "react"
import { getDoctorById, getRelatedDoctors, clearSelectedDoctor} from "../features/doctorActions"
import { createOrder, verifyPayment } from "../features/paymentSlice"
import { assets } from "../assets/assets_frontend/assets"
import ReletedDoctors from "../components/ReletedDoctors"

function Appointment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { 
    selectedDoctor: docInfo, 
    currencySymbol, 
    loading: doctorLoading,
    error 
  } = useSelector((state) => ({
    selectedDoctor: state.doctor?.selectedDoctor,
    currencySymbol: state.doctor?.currencySymbol || '₹',
    loading: state.doctor?.loading,
    error: state.doctor?.error
  }))

  const { loading: bookingLoading } = useSelector((state) => ({
    loading: state.patient?.loading
  }))

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')


  const getAvailableSlots = useCallback(() => {

  const slots = []
  const today = new Date()

  for (let i = 0; i < 7; i++) {

    const currentDate = new Date(today)
    currentDate.setDate(today.getDate() + i)

    const endTime = new Date(currentDate)
    endTime.setHours(21,0,0,0)

    if (today.toDateString() === currentDate.toDateString()) {
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10)
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
    } else {
      currentDate.setHours(10)
      currentDate.setMinutes(0)
    }

    const timeSlots = []

    while(currentDate < endTime){
      timeSlots.push({
        datetime:new Date(currentDate),
        time:currentDate.toLocaleTimeString([],{
          hour:'2-digit',
          minute:'2-digit'
        })
      })

      currentDate.setMinutes(currentDate.getMinutes()+30)
    }

    slots.push(timeSlots)
  }

  setDocSlots(slots)

},[])

  useEffect(() => {
    if (id) {
      dispatch(getDoctorById(id))
    }
    
    return () => {
      dispatch(clearSelectedDoctor())
    }
  }, [dispatch, id])

  useEffect(() => {

  if (!docInfo?._id) return;

  getAvailableSlots();

}, [docInfo, getAvailableSlots]);
 

const handlePayment = async () => {

  try {

    if (!docInfo?._id) {
      alert("Doctor not loaded")
      return
    }

    if (!slotTime) {
      alert("Please select a time slot")
      return
    }

    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) {
      alert("Please login first")
      navigate("/login")
      return
    }

    const result = await dispatch(createOrder(docInfo._id)).unwrap()

    const order = result.order

    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "Doctor Appointment",
      description: "Consultation Fee",
      order_id: order.id,

      handler: async function (response) {

        const paymentData = {

          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,

          doctorId: docInfo._id,
          patientId: user._id,
          appointmentDate: docSlots[slotIndex][0].datetime.toISOString().split("T")[0],
          timeSlot: slotTime,
          fees: docInfo.fees

        }

        const verify = await dispatch(verifyPayment(paymentData)).unwrap()

        if (verify?.success) {

          navigate("my-appointments")

        } else {

          alert("Payment verification failed")

        }

      },

    }

    const razor = new window.Razorpay(options)

    razor.open()

  } catch (error) {

    console.log("PAYMENT ERROR:", error)

  }

}
 
  if (doctorLoading || !docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load doctor information</p>
          <button 
            onClick={() => dispatch(getDoctorById(id))}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
 
          <div className="lg:w-1/3 relative">
            <div className="aspect-square lg:aspect-auto lg:h-full bg-gradient-to-br from-blue-50 to-indigo-100">
              <img
                className="w-full h-full object-cover"
                src={docInfo.image|| docInfo.image || '/default-doctor.png'}
                alt={docInfo.firstName}
              />
            </div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 shadow-sm">
              {docInfo.experience} years
            </div>
          </div>

          <div className="lg:w-2/3 p-6 lg:p-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                  {docInfo.firstName}
                  <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  {docInfo.degree} — <span className="text-indigo-600">{docInfo.speciality}</span>
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-500">Consultation Fee</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currencySymbol}{docInfo.fees}
                </p>
              </div>
            </div>

          
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">About</h3>
                <img className="w-4 h-4 opacity-60" src={assets.info_icon} alt="Info" />
              </div>
              <p className="text-gray-600 leading-relaxed">
                {docInfo.about}
              </p>
            </div>

            <div className="sm:hidden mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Consultation Fee</p>
              <p className="text-xl font-bold text-gray-900">
                {currencySymbol}{docInfo.fees}
              </p>
            </div>
          </div>
        </div>
      </div>

 
      <div className="mt-8 lg:mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
   
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Select Date</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {docSlots.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlotIndex(index)
                    setSlotTime('')
                  }}
                  className={`flex-shrink-0 w-20 py-4 rounded-xl transition-all duration-200 ${
                    slotIndex === index
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <p className={`text-xs font-medium mb-1 ${slotIndex === index ? 'text-indigo-100' : 'text-gray-500'}`}>
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-xl font-bold">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </button>
              ))}
            </div>
          </div>

     
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Select Time</h3>
            {docSlots[slotIndex]?.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {docSlots[slotIndex].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                      slotTime === item.time
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                    }`}
                  >
                    {item.time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No slots available for this date</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              {slotTime ? (
                <span>Selected: <span className="font-semibold text-gray-900">{daysOfWeek[docSlots[slotIndex][0].datetime.getDay()]}, {docSlots[slotIndex][0].datetime.getDate()} at {slotTime}</span></span>
              ) : (
                "Please select a time slot"
              )}
            </div>
            <button 
              onClick={handlePayment}
              disabled={!slotTime || bookingLoading}
              className={`w-full sm:w-auto px-10 py-4 rounded-full font-semibold text-white transition-all duration-200 ${
                slotTime && !bookingLoading
                  ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5" 
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {bookingLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </div>
      </div>


      <div className="mt-12">
        <ReletedDoctors id={id} speciality={docInfo.speciality}/>
      </div>
    </div>
  )
}

export default Appointment