import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { motion } from "framer-motion";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-16 my-16 md:mx-10 shadow-2xl">
     
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3" />
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/30 rounded-full" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/40 rounded-full" />
      
      <div className="relative flex flex-col md:flex-row items-center">
      
        <motion.div 
          className="flex-1 py-12 sm:py-14 md:py-20 lg:py-28 z-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white">Join 50,000+ Happy Patients</span>
          </motion.div>

          
          <div className="text-white">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Book Appointment
            </motion.h2>
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              With <span className="text-blue-100">100+ Trusted Doctors</span>
            </motion.h2>
          </div>

      
          <motion.p 
            className="text-blue-100 text-base sm:text-lg mt-6 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Get access to top-rated healthcare professionals. Book appointments 
            in minutes and receive quality care from the comfort of your home.
          </motion.p>

       
          <motion.button 
            onClick={() => { navigate('/create'); scrollTo(0, 0); }}
            className="group relative bg-white text-blue-600 text-sm sm:text-base font-semibold px-8 py-4 rounded-full mt-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Create Account
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

    
          <motion.div 
            className="flex items-center gap-6 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Verified</p>
                <p className="text-blue-200 text-xs">Doctors</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">24/7</p>
                <p className="text-blue-200 text-xs">Available</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hidden md:block md:w-1/2 lg:w-[400px] relative h-[400px] lg:h-[450px]"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          
       
          <motion.img 
            className="absolute bottom-0 right-0 w-full max-w-md object-contain drop-shadow-2xl"
            src={assets.appointment_img} 
            alt="Doctor appointment"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />

     
          <motion.div 
            className="absolute bottom-20 left-0 bg-white rounded-2xl p-4 shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">100%</p>
                <p className="text-xs text-gray-500">Secure Booking</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}