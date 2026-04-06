import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assets } from "../assets/assets_frontend/assets";
import { logoutUser, checkAuth } from "../features/authActions";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRoleState, setUserRoleState] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token && isAuthenticated) {
      dispatch(logoutUser());
      navigate('/login');
    } else if (token && !user) {
      dispatch(checkAuth());
    }
  }, [dispatch, navigate, isAuthenticated, user]);

  useEffect(() => {
    if (user) {
      const role = getUserRole();
      setUserRoleState(role);
    
    }
  }, [user]);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/doctors", label: "ALL DOCTORS" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  const isActive = (path) => location.pathname === path;

  
  const getUserRole = () => {
    if (!user) return null;
    

    const possiblePaths = [
      user?.role,
      user?.user?.role,
      user?.data?.role,
      user?.userRole,
      user?.user?.userRole,
      user?.type,
      user?.userType,
      user?.user?.type,
    ];
    
    for (const path of possiblePaths) {
      if (path) return path.toLowerCase(); // lowercase করে return
    }
    
    return null;
  };

  const getUserName = () => {
    if (user?.firstName) return user.firstName;
    if (user?.user?.firstName) return user.user.firstName;
    if (user?.name) return user.name;
    if (user?.user?.name) return user.user.name;
    if (user?.fullName) return user.fullName;
    return "User";
  };

  const getUserEmail = () => {
    if (user?.email) return user.email;
    if (user?.user?.emailId) return user.user.emailId;
    if (user?.user?.email) return user.user.email;
    if (user?.emailId) return user.emailId;
    return "";
  };

  const getUserImage = () => {
    if (user?.image) return user.image;
    if (user?.user?.image) return user.user.image;
    if (user?.profilePicture) return user.profilePicture;
    return assets.profile_pic;
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setUserRoleState(null);
    navigate('/login');
  };

  const userName = getUserName();
  const userEmail = getUserEmail();
  const userImage = getUserImage();

  const currentRole = userRoleState || getUserRole();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <img
                src={assets.logo}
                alt="HavenHealth"
                className="w-18 h-18 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              HavenHealth
            </span>
          </div>

        
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg
                    ${isActive(link.path) 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

    
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="relative group">
                <button className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors duration-200">
                  <div className="relative">
                    <img
                      src={userImage}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-800">{userName}</p>
                    <p className="text-xs text-gray-500 capitalize">{currentRole || 'Loading...'}</p>
                  </div>
                  <img
                    src={assets.dropdown_icon}
                    alt="menu"
                    className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180"
                  />
                </button>

             
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-200 transform origin-top-right z-50">
                  <div className="p-2">
                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                      <p className="text-sm font-semibold text-gray-800">{userName}</p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
                 
                      <p className="text-xs text-blue-500 mt-1">Role: {currentRole}</p>
                    </div>
            
                   
                    
                    {(currentRole === 'admin' || user?.role === 'admin' || user?.user?.role === 'admin') && (
                      <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-3"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Admin Panel
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        if (currentRole === 'doctor') navigate('/doctor/appointments');
                        else if (currentRole === 'patient') navigate('/patient/my-appointments');
                        else if (currentRole === 'admin') navigate('/admin/appointments');
                        else navigate('/my-appointments');
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors flex items-center gap-3"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      My Appointments
                    </button>
                    
                
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-3"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:block text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/create")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-full
                           hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 
                           transition-all duration-200 text-sm font-medium"
                >
                  Create Account
                </button>
              </div>
            )}

            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors
                      ${isActive(link.path) 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              
              {isAuthenticated && user && (
                <>
          
                  {(currentRole === 'admin' || user?.role === 'admin') && (
                    <li>
                      <button
                        onClick={() => {
                          navigate('/admin/dashboard');
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl"
                      >
                        Admin Panel
                      </button>
                    </li>
                  )}

                  <li>
                    <button
                      onClick={() => {
                        if (currentRole === 'doctor') navigate('/doctor/appointments');
                        else if (currentRole === 'patient') navigate('/patient/my-appointments');
                        else if (currentRole === 'admin') navigate('/admin/appointments');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl"
                    >
                      My Appointments
                    </button>
                  </li>
                  
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div> 
        )} 
      </div>
    </nav>
  );
}

export default Navbar;