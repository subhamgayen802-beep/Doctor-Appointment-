import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
import { Stethoscope, ArrowRight } from "lucide-react";

export default function SpecialityMenu() {
    return (
        <section id="speciality" className="py-20 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 
                                  rounded-full text-sm font-semibold mb-2">
                        <Stethoscope className="w-4 h-4" />
                        <span>Medical Specialties</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Find by Speciality
                    </h2>
                    
                    <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
                        Browse our network of specialized doctors across various medical fields. 
                        Schedule your appointment with the right expert today.
                    </p>
                </div>

               
                <div className="relative">
               
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent 
                                  z-10 pointer-events-none md:hidden"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent 
                                  z-10 pointer-events-none md:hidden"></div>

                  
                    <div className="flex gap-6 overflow-x-auto pb-6 pt-4 px-2 snap-x snap-mandatory 
                                  scrollbar-hide scroll-smooth md:justify-center md:flex-wrap md:overflow-visible">
                        {specialityData.map((item, index) => (
                            <Link
                                key={index}
                                to={`/doctors/${item.speciality}`}
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="group relative flex flex-col items-center min-w-[140px] md:min-w-0 
                                         snap-center cursor-pointer"
                            >
                                <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 
                                              hover:shadow-xl hover:border-blue-200 transition-all duration-300 
                                              hover:-translate-y-2 w-full">
                                    
                                   
                                    <div className="relative w-20 h-20 mx-auto mb-4">
                                        <div className="absolute inset-0 bg-blue-100 rounded-full opacity-0 
                                                      group-hover:opacity-100 transition-opacity duration-300 
                                                      group-hover:scale-110"></div>
                                        <img 
                                            src={item.image} 
                                            alt={item.speciality}
                                            className="relative w-full h-full object-contain p-2 
                                                     transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>

                                
                                    <h3 className="text-center font-semibold text-slate-800 text-sm 
                                                 group-hover:text-blue-600 transition-colors duration-300 
                                                 line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                                        {item.speciality}
                                    </h3>

                                   
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 
                                                  group-hover:opacity-100 transition-all duration-300 
                                                  group-hover:translate-y-1">
                                        <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-lg">
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>

                              
                                <div className="mt-4 h-1 w-0 bg-blue-600 rounded-full transition-all duration-300 
                                              group-hover:w-12"></div>
                            </Link>
                        ))}
                    </div>
                </div>

              
                <div className="text-center mt-12">
                    <Link 
                        to="/doctors"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold 
                                 hover:text-blue-700 transition-colors group"
                    >
                        View All Specialities
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

  
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}