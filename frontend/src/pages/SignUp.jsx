import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerUser } from '../features/authSlice';

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FB] font-sans">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 bg-gradient-to-br from-[#5B6EF5] to-[#4F46E5] relative overflow-hidden items-center justify-center p-12">
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/15 rounded-full" />
          <div className="absolute top-0 left-28 w-5 h-28 bg-white/20 rounded-full" />
          <div className="absolute top-0 left-44 w-5 h-36 bg-white/20 rounded-full" />
          <div className="absolute top-24 right-32 w-5 h-5 bg-white rounded-full" />
          <div className="absolute top-20 right-28 w-14 h-14 border-2 border-white/30 rounded-full" />
          <div className="absolute top-40 left-16 grid grid-cols-5 gap-2">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white/40 rounded-full" />
            ))}
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <svg width="340" height="160" viewBox="0 0 340 160" fill="none">
              <path d="M0 160 C 60 60, 280 60, 340 160" stroke="white" strokeWidth="2.5" fill="none" opacity="0.25"/>
              <circle cx="170" cy="90" r="45" fill="#60A5FA" opacity="0.9" />
              <circle cx="230" cy="65" r="18" fill="#67E8F9" opacity="0.95" />
            </svg>
          </div>
          <div className="absolute bottom-32 left-24 text-white/50 text-3xl font-light">×</div>
          <div className="absolute bottom-40 left-16 grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white/40 rounded-full" />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white max-w-md">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Doctor<br/>Appoinment
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Please Create Your Account First<br/>
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="w-full lg:w-[55%] xl:w-1/2 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/40 rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full translate-y-1/3 translate-x-1/4 pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-[#4F46E5] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Hello ! Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <div className="mb-5">
              <label className="block text-sm text-gray-600 mb-2 font-medium">First Name</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="John"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.firstName ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-50'} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all`}
                  {...register('firstName')}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1.5 text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm text-gray-600 mb-2 font-medium">Email</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.emailId ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-50'} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all`}
                  {...register('emailId')}
                />
              </div>
              {errors.emailId && (
                <p className="mt-1.5 text-sm text-red-500">{errors.emailId.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2 font-medium">Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-50'} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-4 text-gray-400 text-sm font-medium">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-4 mb-6">
            <button type="button" className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button type="button" className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button type="button" className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.44-.93 1.65 0 2.85.93 3.71 2.12-3.29 1.74-2.64 5.98.22 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <NavLink to="/login" className="text-[#4F46E5] hover:text-[#4338CA] font-semibold">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;