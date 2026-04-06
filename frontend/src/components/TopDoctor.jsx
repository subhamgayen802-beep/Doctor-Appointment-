import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { Star, MapPin, Clock, ChevronRight } from "lucide-react"

export default function TopDoctors() {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16 space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                        Expert Healthcare
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Top Doctors to Book
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
                        Connect with our network of highly qualified specialists. 
                        Quality care is just a click away.
                    </p>
                </div>

\
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
                    {doctors.slice(0, 10).map((doctor, index) => (
                        <div
                            key={doctor._id || index}
                            onClick={() => {
                                navigate(`/appointment/${doctor._id}`)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl 
                                     transition-all duration-300 cursor-pointer border border-slate-100
                                     hover:-translate-y-1"
                        >
                              <div className="relative h-48 overflow-hidden bg-slate-100">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover transition-transform duration-500 
                                             group-hover:scale-110"
                                />
                               
                                <div className="absolute top-3 right-3 flex items-center gap-1.5 
                                              bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                    <span className="text-xs font-medium text-emerald-700">Available</span>
                                </div>
                   
                                <div className="absolute bottom-3 left-3 flex items-center gap-1 
                                              bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-medium text-white">4.9</span>
                                </div>
                            </div>

                            <div className="p-5 space-y-3">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 
                                                 transition-colors line-clamp-1">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium mt-1">
                                        {doctor.speciality}
                                    </p>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                        <span>City Hospital</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Next: Today, 2:00 PM</span>
                                    </div>
                                </div>

                              
                                <button className="w-full mt-3 py-2.5 bg-slate-50 text-slate-700 font-semibold 
                                                 rounded-xl text-sm hover:bg-blue-600 hover:text-white 
                                                 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                                    Book Appointment
                                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

         
                <div className="text-center">
                    <button
                        onClick={() => {
                            navigate('/doctors')
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 
                                 text-slate-700 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 
                                 hover:shadow-lg transition-all duration-300 group"
                    >
                        View All Doctors
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    )
}