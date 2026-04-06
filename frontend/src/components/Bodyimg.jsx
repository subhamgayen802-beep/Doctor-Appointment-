import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { motion } from "framer-motion";

function Bodyimg() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-16 my-12 md:mx-10 shadow-2xl">

      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative flex flex-col md:flex-row items-center py-12 md:py-16 lg:py-20">
       
        <motion.div 
          className="text-white md:w-1/2 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
    
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">500+ Trusted Doctors Available</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Book Appointment
            <span className="block mt-2 text-blue-100">With Trusted Doctors</span>
          </h1>

        
          <motion.p 
            className="text-blue-100 text-lg mt-6 max-w-md leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free. Your health is our priority.
          </motion.p>

       
          <motion.div 
            className="flex items-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex -space-x-3">
              <img 
                src={assets.group_profiles} 
                alt="Doctor profiles" 
                className="w-28 h-10 object-contain"
              />
            </div>
            <div className="text-sm">
              <p className="font-semibold">10,000+ Patients</p>
              <p className="text-blue-200 text-xs">Trust our platform</p>
            </div>
          </motion.div>

    
          <motion.a 
            href="#speciality"
            className="group inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full mt-8 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Appointment
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <img src={assets.arrow_icon} alt="arrow" className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </motion.div>

        
        <motion.div 
          className="md:w-1/2 mt-10 md:mt-0 relative z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="relative">
            
            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl scale-95" />
            
            
            <motion.img 
              src={assets.header_img} 
              alt="Doctor consultation" 
              className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />

          
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">98%</p>
                  <p className="text-xs text-gray-500">Satisfaction Rate</p>
                </div>
              </div>
            </motion.div>

            
            <motion.div 
              className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">4.9</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">2,500+ Reviews</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Bodyimg;