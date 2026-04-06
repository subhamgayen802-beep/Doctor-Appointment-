import { assets } from "../assets/assets_frontend/assets";
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Mail, 
    Phone, 
    MapPin, 
    ArrowUpRight,
    Heart
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const companyLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Our Doctors", path: "/doctors" },
        { name: "Contact Us", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
    ];

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

    return (
        <footer className="bg-slate-900 text-slate-300 mt-20">
       
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    
                
                    <div className="lg:col-span-1 space-y-6">
                        <Link to="/" className="inline-block group">
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 
                                          border border-white/10 hover:bg-white/20 transition-all duration-300">
                           
                                <img 
                                    className="h-10 w-auto object-contain" 
                                    src={assets.logo} 
                                    alt="HeavenHealth Logo"
                                   
                                />
                                
                       
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white tracking-tight">HeavenHealth</span>
                                    <span className="text-xs text-blue-400 font-medium">Your Health Partner</span>
                                </div>
                            </div>
                        </Link>
                        
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Your trusted healthcare partner. We connect patients with top-rated doctors 
                            for quality medical care. Book appointments seamlessly and manage your health journey.
                        </p>
                        
                       
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="p-2.5 bg-slate-800 rounded-lg text-slate-400 hover:bg-blue-600 
                                             hover:text-white transition-all duration-300 hover:scale-110"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                            Company
                            <div className="h-px flex-1 bg-slate-700 ml-2"></div>
                        </h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="group flex items-center text-slate-400 hover:text-white 
                                                 transition-colors duration-300 text-sm"
                                    >
                                        <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-3 
                                                       group-hover:bg-blue-500 transition-colors"></span>
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 -translate-x-2 
                                                               group-hover:opacity-100 group-hover:translate-x-0 
                                                               transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                            Get in Touch
                            <div className="h-px flex-1 bg-slate-700 ml-2"></div>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600/20 
                                            transition-colors duration-300">
                                    <Phone className="w-4 h-4 text-blue-500 group-hover:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-0.5">Phone</p>
                                    <a href="tel:+919876543210" className="text-sm text-slate-300 hover:text-white 
                                                                           transition-colors">
                                        +91 98765 43210
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600/20 
                                            transition-colors duration-300">
                                    <Mail className="w-4 h-4 text-blue-500 group-hover:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-0.5">Email</p>
                                    <a href="mailto:demo.user@example.com" className="text-sm text-slate-300 
                                                                                      hover:text-white transition-colors">
                                        demo.user@example.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600/20 
                                            transition-colors duration-300">
                                    <MapPin className="w-4 h-4 text-blue-500 group-hover:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-0.5">Address</p>
                                    <p className="text-sm text-slate-300">
                                        123 Healthcare Ave, Medical District, NY 10001
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                            Newsletter
                            <div className="h-px flex-1 bg-slate-700 ml-2"></div>
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">
                            Subscribe to get health tips and updates on new features.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg 
                                             text-sm text-white placeholder-slate-500 focus:outline-none 
                                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                             transition-all duration-300"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white 
                                         font-medium text-sm rounded-lg transition-all duration-300 
                                         hover:shadow-lg hover:shadow-blue-600/25"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-500 text-center md:text-left">
                            © {currentYear} HeavenHealth. All rights reserved.
                        </p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for better healthcare
                        </p>
                        <div className="flex gap-6 text-sm text-slate-500">
                            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}