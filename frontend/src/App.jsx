import {Routes,Route,Navigate}from 'react-router-dom'
import Abouts from './pages/About'
import Home from './pages/Home'
import Doctor from "./pages/Doctors"
import Login from "./pages/Login"
import Contact from "./pages/Contacts"
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "../src/features/authSlice";
import { useEffect } from "react";
import Appoinment from "./pages/Appoinment"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signup from './pages/SignUp'
import AdminDashboard from './admin/AdminDashboard'
import AdminPanel from './admin/AdminPanel'
import AllAppointments from './admin/AllAppointments'
import AllPatients from './admin/AllPatients'
import CreateDoctor from './admin/CreateDoctor'
import AllDoctors from './admin/AllDoctors'
import MyAppointments from "./patient/MyAppointments"
import PatientPanel from "./patient/PatientPanel"
import DoctorPanel from "./doctor/DoctorPanel"
import DoctorAppointments from "./doctor/DoctorAppointments"
import DoctorDashboard from "./doctor/DoctorDashboard"




function App() {

  const dispatch =useDispatch();
  
   const { isAuthenticated, user, checkingAuth } = useSelector((state) => state.auth);
 
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
 
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return(
   <div className='bg-white'>
    
   <Navbar/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<Abouts/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/doctors" element={isAuthenticated?<Doctor/>:<Navigate to="/signup" />}/>  
      <Route path="/appointment/:id" element={<Appoinment/>}/>
      <Route path="/doctors/:speciality" element={<Doctor/>}/>
      


      <Route path="/patient" element={<PatientPanel />}>
        <Route index element={<Navigate to="book-appointment" replace />} />
   
        <Route path="my-appointments" element={<MyAppointments />} />
      </Route>
     
      

      {/* doctor Route  */}
      
     
      
       <Route path="/doctor" element={isAuthenticated && user?.role=== 'doctor' ? <DoctorPanel /> : <Navigate to="/" /> }>
       
     <Route index element={<Navigate to="dashboard" />} />
     <Route path="dashboard" element={<DoctorDashboard />} />
     <Route path="appointments" element={<DoctorAppointments />} />
    </Route>

       {/* admin route  */}
     
  <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="create-doctor" element={<CreateDoctor />} />
    <Route path="doctors" element={<AllDoctors />} />
    <Route path="patients" element={<AllPatients />} />
    <Route path="appointments" element={<AllAppointments />} />
  </Route>

</Routes>
<Footer/>
</div>
 )
}

export default App