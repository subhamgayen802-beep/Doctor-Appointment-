import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useCallback, useRef } from "react"
import { getDoctorById, clearSelectedDoctor } from "../features/doctorSlice"
import { bookAppointment } from "../features/authSlice"
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
    loading: state.auth?.loading
  }))
  

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Prevent multiple clicks
  const isBookingRef = useRef(false)

  const getAvailableSlots = useCallback(() => {
    const slots = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.toDateString() === currentDate.toDateString()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []

      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      slots.push(timeSlots)
    }

    setDocSlots(slots)
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(getDoctorById(id))
    }
    return () => {
      dispatch(clearSelectedDoctor())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (!docInfo?._id) return
    getAvailableSlots()
  }, [docInfo, getAvailableSlots])

  // const handlePayment = async () => {

//   try {

//     if (!docInfo?._id) {
//       alert("Doctor not loaded")
//       return
//     }

//     if (!slotTime) {
//       alert("Please select a time slot")
//       return
//     }

//     const user = JSON.parse(localStorage.getItem("user"))

//     if (!user) {
//       alert("Please login first")
//       navigate("/login")
//       return
//     }

//     const result = await dispatch(createOrder(docInfo._id)).unwrap()

//     const order = result.order

//     const options = {

//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: order.amount,
//       currency: "INR",
//       name: "Doctor Appointment",
//       description: "Consultation Fee",
//       order_id: order.id,

//       handler: async function (response) {

//         const paymentData = {

//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature,

//           doctorId: docInfo._id,
//           patientId: user._id,
//           appointmentDate: docSlots[slotIndex][0].datetime.toISOString().split("T")[0],
//           timeSlot: slotTime,
//           fees: docInfo.fees

//         }

//         const verify = await dispatch(verifyPayment(paymentData)).unwrap()

//         if (verify?.success) {

//           navigate("my-appointments")

//         } else {

//           alert("Payment verification failed")

//         }

//       },

//     }

//     const razor = new window.Razorpay(options)

//     razor.open()

//   } catch (error) {

//     console.log("PAYMENT ERROR:", error)

//   }

// }

  const handleBookAppointment = async () => {
    // Guard: prevent double-click
    if (isBookingRef.current || bookingLoading) return
    isBookingRef.current = true

    try {
      const user = JSON.parse(localStorage.getItem("user"))

      if (!user) {
        alert("Please login first")
        navigate("/login")
        return
      }

      if (!slotTime) {
        alert("Please select a time slot")
        return
      }

      const appointmentData = {
        doctorId: docInfo._id,
        patientId: user._id,
        appointmentDate: docSlots[slotIndex][0].datetime.toISOString().split("T")[0],
        timeSlot: slotTime,
        fees: docInfo.fees
      }

      await dispatch(bookAppointment(appointmentData)).unwrap()
      setBookingSuccess(true)
      setTimeout(() => navigate("/patient/my-appointments"), 800)
    } catch (err) {
      console.log(err)
      alert("Failed to book appointment. Please try again.")
    } finally {
      isBookingRef.current = false
    }
  }

  if (doctorLoading || !docInfo) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-14 w-14 border-[3px] border-blue-200 border-t-blue-600"></div>
          <p className="text-gray-500 font-medium">Loading doctor details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-10 max-w-sm">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 font-semibold mb-2">Failed to load</p>
          <p className="text-gray-500 text-sm mb-6">Could not fetch doctor information</p>
          <button
            onClick={() => dispatch(getDoctorById(id))}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── HERO CARD ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Doctor Image */}
            <div className="md:w-72 lg:w-80 flex-shrink-0 relative bg-gradient-to-br from-blue-50 to-indigo-50">
              <img
                className="w-full h-64 md:h-full object-cover"
                src={docInfo.image || '/default-doctor.png'}
                alt={docInfo.firstName}
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-blue-600 shadow-sm flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {docInfo.experience}+ yrs
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex-1 p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{docInfo.firstName}</h1>
                    <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    {docInfo.degree}
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-blue-600 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-lg text-sm">{docInfo.speciality}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2.5 rounded-2xl border border-green-100">
                  <div>
                    <p className="text-xs text-green-600 font-medium">Consultation Fee</p>
                    <p className="text-xl font-bold text-green-700">{currencySymbol}{docInfo.fees}</p>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">About</h3>
                  <img className="w-3.5 h-3.5 opacity-50" src={assets.info_icon} alt="Info" />
                </div>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  {docInfo.about}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-xl">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Available Today
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-xl">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verified Profile
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOOKING SECTION ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
              <p className="text-sm text-gray-400">Choose your preferred date and time</p>
            </div>
          </div>

          {/* Date Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Select Date
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
              {docSlots.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlotIndex(index)
                    setSlotTime('')
                    setBookingSuccess(false)
                  }}
                  className={`flex-shrink-0 w-[72px] py-4 rounded-2xl transition-all duration-300 ${
                    slotIndex === index
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${slotIndex === index ? 'text-blue-100' : 'text-gray-400'}`}>
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-lg font-bold">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Select Time
            </h3>
            {docSlots[slotIndex]?.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {docSlots[slotIndex].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSlotTime(item.time)
                      setBookingSuccess(false)
                    }}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      slotTime === item.time
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-100"
                        : "bg-white text-gray-600 border-2 border-gray-100 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/50"
                    }`}
                  >
                    {item.time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 text-gray-400 bg-gray-50 rounded-2xl p-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">No slots available for this date</span>
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${slotTime ? 'bg-green-100' : 'bg-gray-100'}`}>
                {slotTime ? (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                {slotTime ? (
                  <>
                    <p className="text-xs text-gray-400 font-medium">Selected Slot</p>
                    <p className="text-sm font-bold text-gray-800">
                      {daysOfWeek[docSlots[slotIndex][0].datetime.getDay()]}, {docSlots[slotIndex][0].datetime.getDate()} · {slotTime}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-400 font-medium">Please select a time slot</p>
                )}
              </div>
            </div>

            <button
              onClick={handleBookAppointment}
              disabled={!slotTime || bookingLoading || isBookingRef.current || bookingSuccess}
              className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px] ${
                slotTime && !bookingLoading && !bookingSuccess
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-200 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                  : bookingSuccess
                  ? "bg-green-500 cursor-default"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {bookingSuccess ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Booked!
                </>
              ) : bookingLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </>
              ) : (
                <>
                  Confirm Booking
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── RELATED DOCTORS ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <ReletedDoctors id={id} speciality={docInfo.speciality} />
      </div>
    </div>
  )
}

export default Appointment