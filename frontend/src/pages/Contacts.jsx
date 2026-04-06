import { assets } from "../assets/assets_frontend/assets";

function Contact() {
  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Address",
      value: "45, Park Street, Healthcare District,\nMumbai, Maharashtra 400001"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+91 98765 43210\nMon-Sat, 9am-6pm"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "demo.user@example.com\nSupport: support@havenhealth.com"
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      <div className="bg-gradient-to-b from-blue-50/50 to-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-2">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Us</span>
          </h1>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl transform -rotate-2 group-hover:-rotate-3 transition-transform duration-300 opacity-20" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={assets.contact_image} 
                alt="Medical team" 
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
              
             
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">24/7 Emergency Support</p>
                    <p className="text-sm text-gray-600">Always here when you need us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
           
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                Our Office
              </h2>
              
              <div className="grid gap-4">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-gray-900 font-medium whitespace-pre-line leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white relative overflow-hidden">
             
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">Careers at HavenHealth</h3>
                <p className="text-blue-50 mb-6 leading-relaxed">
                  Join our team of healthcare innovators. We're always looking for passionate individuals to help us improve healthcare accessibility.
                </p>
                
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 group">
                  Explore Jobs
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Average response time: 2 hours</p>
                <p className="text-sm text-gray-600">We usually respond within 2 business hours</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 HavenHealth. All rights reserved. | 
            <span className="text-blue-600 cursor-pointer hover:underline ml-1">Privacy Policy</span> | 
            <span className="text-blue-600 cursor-pointer hover:underline ml-1">Terms of Service</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;