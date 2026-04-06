import { assets } from "../assets/assets_frontend/assets";

function AboutUs() {
  const features = [
    {
      title: "EFFICIENCY",
      description: "Streamlined appointment scheduling that fits into your busy lifestyle.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "CONVENIENCE",
      description: "Access to a network of trusted healthcare professionals in your area.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "bg-green-50 text-green-600"
    },
    {
      title: "PERSONALIZATION",
      description: "Tailored recommendations and reminders to help you stay on top of your health.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
  
      <div className="bg-gradient-to-b from-blue-50/50 to-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-2">Who We Are</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Us</span>
          </h1>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
   
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-20" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={assets.about_image} 
                alt="Healthcare professionals" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
     
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  10+
                </div>
                <div>
                  <p className="text-sm text-gray-500">Years of</p>
                  <p className="font-bold text-gray-900">Excellence</p>
                </div>
              </div>
            </div>
          </div>

        
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                Welcome to <span className="font-semibold text-gray-900">Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl my-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed italic">
                "Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it."
              </p>
            </div>
          </div>
        </div>

       
        <div className="mt-24">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-2">Our Advantages</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Choose Us</span>
            </h2>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
              
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                
          
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-50 to-transparent rounded-tr-2xl -z-10" />
              </div>
            ))}
          </div>
        </div>

       
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-gray-100">
          {[
            { number: "50k+", label: "Happy Patients" },
            { number: "200+", label: "Expert Doctors" },
            { number: "20+", label: "Specialties" },
            { number: "4.9", label: "App Rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</p>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;