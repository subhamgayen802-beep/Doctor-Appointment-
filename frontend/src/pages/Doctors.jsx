import { useEffect, useState, useMemo, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDoctorById,getAllDoctorsPublic } from "../features/doctorSlice"

import { 
    Stethoscope, 
    Search, 
    MapPin, 
    Star, 
    Clock, 
    ChevronRight,
    Filter,
    X,
    Calendar,
    Loader2,
    User,
    IndianRupee  
} from "lucide-react"

function Doctor() {
    const { speciality } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
  
    const doctorState = useSelector(state => state.doctor);
    const doctors = doctorState?.doctors || [];
    const loading = doctorState?.loading || false;
    const error = doctorState?.error || null;

    const [searchTerm, setSearchTerm] = useState("")
    const [imageErrors, setImageErrors] = useState({}) // Track image load errors

    
    const specialities = useMemo(() => [
        { name: "General physician", icon: "👨‍⚕️" },
        { name: "Gynecologist", icon: "👩‍⚕️" },
        { name: "Dermatologist", icon: "🩺" },
        { name: "Pediatricians", icon: "👶" },
        { name: "Neurologist", icon: "🧠" },
        { name: "Gastroenterologist", icon: "🔬" },
        { name: "Cardiologist", icon: "❤️" },
        { name: "Orthopedic", icon: "🦴" },
    ], [])

    
const filteredDoctors = useMemo(() => {
        let filtered = Array.isArray(doctors) ? doctors : []

       if (speciality) {
  const searchSpec = speciality.toLowerCase()

  filtered = filtered.filter(doc => {
    const docSpec = (doc.speciality || doc.specialization || doc.specialty || '').toLowerCase()

    return docSpec.includes(searchSpec)
  })
}

  if (searchTerm) {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter(doc => {
                const name = (doc.firstName || doc.name || doc.fullName || '').toLowerCase()
                const docSpec = (doc.speciality || doc.specialization || doc.specialty || '').toLowerCase()
                return name.includes(term) || docSpec.includes(term)
            })
        }

        return filtered
    }, [doctors, speciality, searchTerm])
     useEffect(()=>{
        dispatch(getAllDoctorsPublic())
     },[dispatch])
    

    const handleSpecialityClick = useCallback((specName) => {
        if (speciality === specName) {
            navigate('/doctors')
        } else {
            navigate(`/doctors/${specName}`)
        }
    }, [speciality, navigate])

    const clearFilters = useCallback(() => {
        navigate('/doctors')
        setSearchTerm("")
    }, [navigate])


    if (loading && doctors.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Loading doctors...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
         
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-3">
                            <Stethoscope className="w-8 h-8 text-blue-600" />
                            Find Your Doctor
                        </h1>
                        <p className="text-slate-600 text-lg mb-6">
                            Browse through our specialists and book your appointment today
                        </p>
                        
                       
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search doctors by name or speciality..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 
                                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                         transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                 
                    <aside className="lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <Filter className="w-5 h-5 text-blue-600" />
                                <h3 className="font-bold text-slate-900">Specialities</h3>
                            </div>

                            <div className="space-y-2">
                                {specialities.map((spec) => (
                                    <button
                                        key={spec.name}
                                        onClick={() => handleSpecialityClick(spec.name)}
                                        className={`
                                            w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                                            transition-all duration-200 group
                                            ${speciality === spec.name 
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                                                : "bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                                            }
                                        `}
                                    >
                                        <span className="text-xl">{spec.icon}</span>
                                        <span className="font-medium text-sm">{spec.name}</span>
                                        {speciality === spec.name && (
                                            <ChevronRight className="w-4 h-4 ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>

                       
                            {(speciality || searchTerm) && (
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <p className="text-xs text-slate-500 mb-2">Active Filters</p>
                                    <div className="flex flex-wrap gap-2">
                                        {speciality && (
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 
                                                           text-blue-700 text-sm font-medium rounded-lg">
                                                {speciality}
                                                <button 
                                                    onClick={() => navigate('/doctors')}
                                                    className="hover:bg-blue-200 rounded-full p-0.5"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        )}
                                        {searchTerm && (
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 
                                                           text-purple-700 text-sm font-medium rounded-lg">
                                                "{searchTerm}"
                                                <button 
                                                    onClick={() => setSearchTerm("")}
                                                    className="hover:bg-purple-200 rounded-full p-0.5"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-3 text-sm text-slate-500 hover:text-blue-600 underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>

                   
                    <main className="flex-1">
                       
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-slate-600">
                                Showing <span className="font-bold text-slate-900">{filteredDoctors.length}</span> doctors
                                {speciality && (
                                    <span className="text-slate-500"> in <span className="font-medium text-blue-600">{speciality}</span></span>
                                )}
                            </p>
                            {loading && doctors.length > 0 && (
                                <span className="flex items-center gap-2 text-sm text-blue-600">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Updating...
                                </span>
                            )}
                        </div>

                     
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                                Failed to load doctors. Please try again.
                            </div>
                        )}

                        {filteredDoctors.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredDoctors.map((doctor) => (
                                    <DoctorCard 
                                        key={doctor._id} 
                                        doctor={doctor} 
                                        navigate={navigate}
                                        imageErrors={imageErrors}
                                        setImageErrors={setImageErrors}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
                                <p className="text-slate-600 mb-6">
                                    {doctors.length === 0 
                                        ? "No doctors available yet. Check back soon!"
                                        : "Try adjusting your filters or search terms"
                                    }
                                </p>
                                {(speciality || searchTerm) && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700"
                                    >
                                        View All Doctors
                                    </button>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}


const DoctorCard = ({ doctor, navigate, imageErrors, setImageErrors }) => {
   
    const _id = doctor._id || doctor.id
    const name = doctor.firstName || doctor.name || doctor.fullName || 'Unknown Doctor'
    const photo = doctor.image || doctor.photo || doctor.profileImage || doctor.avatar || doctor.img
    const speciality = doctor.speciality || doctor.specialization || doctor.specialty || 'General Physician'
    const available = doctor.isAvailable !== undefined ? doctor.isAvailable : true
    const about = doctor.description || doctor.about || doctor.bio || doctor.summary || ''
    const experience = doctor.experience || doctor.yearsOfExperience || doctor.exp || 0
    const fees = doctor.fees || doctor.consultationFee || doctor.price || doctor.fee || 0

    const handleImageError = () => {
        setImageErrors(prev => ({ ...prev, [_id]: true }))
    }

    const handleClick = () => {
        navigate(`/appointment/${_id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const hasImageError = imageErrors[_id]
    const showImage = photo && !hasImageError

    return (
        <div
            onClick={handleClick}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 
                     hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200 
                     transition-all duration-300 cursor-pointer"
        >
     
            <div className="relative h-56 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden">
                {showImage && (
                    <img
                        src={photo}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={handleImageError}
                    />
                )}
                
                {(!showImage) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                        <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center">
                            <User className="w-12 h-12 text-blue-600" />
                        </div>
                    </div>
                )}

              
                {available && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-full shadow-sm border border-emerald-100">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-semibold text-emerald-700">Available</span>
                    </div>
                )}

                  {fees > 0 && (
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-blue-600 px-2.5 py-1 rounded-lg shadow-sm">
                    <IndianRupee className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs font-bold text-white">{fees}</span>
                </div>
                )}      

            </div>

      
            <div className="p-5">
                <div className="mb-3">
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                        {name}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm mt-1 flex items-center gap-2">
                        <Stethoscope className="w-3.5 h-3.5" />
                        {speciality}
                    </p>
                </div>
                 
                
                {about && (
                    <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                        {about}
                    </p>
                )}

                <div className="flex items-center gap-4 py-3 border-t border-slate-100 text-xs text-slate-500">
                    {experience > 0 && (
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{experience} years exp.</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Available Now</span>
                    </div>
                </div>

                
                <button className="w-full mt-4 py-3 bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-slate-200 hover:border-blue-600">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
            </div>
        </div>
    )
}

export default Doctor