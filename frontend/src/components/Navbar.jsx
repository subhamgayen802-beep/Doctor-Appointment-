import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assets } from "../assets/assets_frontend/assets";
import { logoutUser } from "../features/authSlice";



const NAV_LINKS = [
  { path: "/",        label: "HOME"        },
  { path: "/doctors", label: "ALL DOCTORS" },
  { path: "/about",   label: "ABOUT"       },
  { path: "/contact", label: "CONTACT"     },
];

const APPOINTMENTS_ROUTE = {
  doctor:  "/doctor/appointments",
  patient: "/patient/my-appointments",
  admin:   "/admin/appointments",
};


const pick = (obj, paths) => {
  for (const path of paths) {
    const val = path.split(".").reduce((o, k) => o?.[k], obj);
    if (val != null && val !== "") return val;
  }
  return null;
};

function useUserInfo(user) {
  return useMemo(() => {
    if (!user) return null;

    const rawRole = pick(user, [
      "role",       "user.role",     "data.role",
      "userRole",   "user.userRole",
      "type",       "userType",      "user.type",
    ]);

    return {
      role:  (rawRole ?? "").toLowerCase(),
      name:  pick(user, ["firstName", "user.firstName", "name", "user.name", "fullName"]) ?? "User",
      email: pick(user, ["email", "user.emailId", "user.email", "emailId"]) ?? "",
      image: pick(user, ["image", "user.image", "profilePicture"]) ?? assets.upload_area_png,
    };
  }, [user]);
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}

function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const dispatch  = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrolled();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userInfo = useUserInfo(user);
  const isAdmin  = userInfo?.role === "admin";

 
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    navigate("/login");
  }, [dispatch, navigate]);

  const handleAppointments = useCallback(() => {
    navigate(APPOINTMENTS_ROUTE[userInfo?.role] ?? "/my-appointments");
  }, [navigate, userInfo?.role]);

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100
                    transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            <Logo onClick={() => navigate("/")} />

            <DesktopNav links={NAV_LINKS} isActive={isActive} />

            <div className="flex items-center gap-3">
              {isAuthenticated && userInfo ? (
                <UserMenu
                  userInfo={userInfo}
                  isAdmin={isAdmin}
                  onLogout={handleLogout}
                  onAppointments={handleAppointments}
                  navigate={navigate}
                />
              ) : (
                <AuthButtons navigate={navigate} />
              )}

              <HamburgerButton
                isOpen={drawerOpen}
                onClick={() => setDrawerOpen((v) => !v)}
              />
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile slide-in drawer — rendered outside <nav> to cover full viewport */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navLinks={NAV_LINKS}
        isActive={isActive}
        isAuthenticated={isAuthenticated}
        userInfo={userInfo}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onAppointments={handleAppointments}
        navigate={navigate}
      />
    </>
  );
}

function Logo({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Go to homepage"
      className="flex items-center gap-3 group rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="relative">
        <img
          src={assets.logo}
          alt=""
          aria-hidden="true"
          className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {/* Glow on hover */}
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        HavenHealth
      </span>
    </button>
  );
}


function DesktopNav({ links, isActive }) {
  return (
    <ul className="hidden md:flex items-center gap-1" role="list">
      {links.map(({ path, label }) => (
        <li key={path}>
          <Link
            to={path}
            aria-current={isActive(path) ? "page" : undefined}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
              ${isActive(path)
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
          >
            {label}
            {isActive(path) && (
              <span
                aria-hidden="true"
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}


function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );
}


function UserMenu({ userInfo, isAdmin, onLogout, onAppointments, navigate }) {
  return (
    <div className="relative group">

      {/* Trigger button */}
      <button
        aria-label="Open user menu"
        aria-haspopup="true"
        className="flex items-center gap-2.5 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors duration-200
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <div className="relative">
          <img
            src={userInfo.image}
            alt={userInfo.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-white shadow"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"
          />
        </div>

        <div className="hidden sm:block text-left leading-tight">
          <p className="text-sm font-semibold text-gray-800">{userInfo.name}</p>
          <p className="text-xs text-gray-500 capitalize">{userInfo.role || "—"}</p>
        </div>

        <img
          src={assets.dropdown_icon}
          alt=""
          aria-hidden="true"
          className="w-4 h-4 opacity-40 transition-transform duration-200 group-hover:rotate-180"
        />
      </button>

      {/* Dropdown panel */}
      <div
        role="menu"
        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50
                   opacity-0 invisible translate-y-1
                   group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                   transition-all duration-200 origin-top-right"
      >
        <div className="p-2">

          {/* Identity header */}
          <div className="px-4 py-3 mb-1 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{userInfo.name}</p>
            <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
            <span className="inline-block mt-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full capitalize">
              {userInfo.role}
            </span>
          </div>

          {/* Admin-only action */}
          {isAdmin && (
            <DropdownItem
              icon={<AdminIcon />}
              label="Admin Panel"
              onClick={() => navigate("/admin/dashboard")}
              variant="danger"
            />
          )}

          <DropdownItem
            icon={<CalendarIcon />}
            label="My Appointments"
            onClick={onAppointments}
          />

          <div className="border-t border-gray-100 mt-1 pt-1">
            <DropdownItem
              icon={<LogoutIcon />}
              label="Logout"
              onClick={onLogout}
              variant="danger"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

function DropdownItem({ icon, label, onClick, variant = "default" }) {
  const colorMap = {
    default: "text-gray-700 hover:bg-blue-50 hover:text-blue-600",
    danger:  "text-red-600 hover:bg-red-50",
  };

  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-colors ${colorMap[variant]}`}
    >
      {icon}
      {label}
    </button>
  );
}


function AuthButtons({ navigate }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate("/login")}
        className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 rounded-lg
                   hover:text-blue-600 hover:bg-gray-50 transition-colors"
      >
        Sign In
      </button>
      <button
        onClick={() => navigate("/signup")}
        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-full
                   text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5
                   transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Create Account
      </button>
    </div>
  );
}

function MobileDrawer({
  isOpen, onClose,
  navLinks, isActive,
  isAuthenticated, userInfo, isAdmin,
  onLogout, onAppointments, navigate,
}) {
 
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Dimmed backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 md:hidden
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl
                    flex flex-col transition-transform duration-300 md:hidden
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <span className="text-base font-bold text-gray-800">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable nav content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">

          {/* Page links */}
          <ul role="list" className="space-y-1">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={onClose}
                  aria-current={isActive(path) ? "page" : undefined}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors
                    ${isActive(path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Authenticated actions */}
          {isAuthenticated && userInfo && (
            <>
              <hr className="my-3 border-gray-100" />

              {/* Mini profile card */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <img
                  src={userInfo.image}
                  alt={userInfo.name}
                  className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{userInfo.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{userInfo.role}</p>
                </div>
              </div>

              <ul role="list" className="space-y-1 mt-2">
                {isAdmin && (
                  <li>
                    <button
                      onClick={() => { navigate("/admin/dashboard"); onClose(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <AdminIcon />
                      Admin Panel
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => { onAppointments(); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <CalendarIcon />
                    My Appointments
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { onLogout(); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogoutIcon />
                    Logout
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>

        {/* Sign-in / sign-up CTA pinned to the bottom for unauthenticated users */}
        {!isAuthenticated && (
          <div className="shrink-0 px-6 py-5 border-t border-gray-100 space-y-2">
            <button
              onClick={() => { navigate("/login"); onClose(); }}
              className="w-full py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => { navigate("/signup"); onClose(); }}
              className="w-full py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full hover:opacity-90 transition-opacity"
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </>
  );
}



function AdminIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

export default Navbar;