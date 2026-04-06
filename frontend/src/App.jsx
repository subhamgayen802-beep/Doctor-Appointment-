import {BrowserRouter,Routes,Route,Navigate}from 'react-router-dom'
import Abouts from './pages/About'
import Home from './pages/Home'
import Doctor from "./pages/Doctors"
import Login from "./pages/Login"
import Contact from "./pages/Contacts"

import Appoinment from "./pages/Appoinment"
import "./index.css";
import { Provider } from 'react-redux'
import ReactDom from 'react-dom/client'
import Navbar from './components/Navbar'
import AppContextProvider from './context/AppContext'
import Footer from './components/Footer'

import store from "./app/store"
import { StrictMode } from 'react'
import SignUp from './pages/SignUp'

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
  


  return(
     

    <div className='bg-white'>
     


    
    <Provider store={store}>
    <BrowserRouter>

    <Navbar/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<Abouts/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/doctors" element={<Doctor/>}/>  
      <Route path="/appointment/:id" element={<Appoinment/>}/>
      <Route path="/doctors/:speciality" element={<Doctor/>}/>
      


      <Route path="/patient" element={<PatientPanel />}>
        <Route index element={<Navigate to="book-appointment" replace />} />
   
        <Route path="my-appointments" element={<MyAppointments />} />
      </Route>
     
      

      {/* doctor Route  */}
      
     
      
       <Route path="/doctor" element={<DoctorPanel />}>
     <Route index element={<Navigate to="dashboard" />} />
     <Route path="dashboard" element={<DoctorDashboard />} />
     <Route path="appointments" element={<DoctorAppointments />} />
    </Route>

       {/* admin route  */}
     
  <Route path="/admin" element={<AdminPanel />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="create-doctor" element={<CreateDoctor />} />
    <Route path="doctors" element={<AllDoctors />} />
    <Route path="patients" element={<AllPatients />} />
    <Route path="appointments" element={<AllAppointments />} />
  </Route>

    




      
      </Routes>
      <Footer/>
     
      </BrowserRouter>
      </Provider>
      
      </div>
    
      

  )
  
}


ReactDom.createRoot(document.getElementById('root')).render(
  <AppContextProvider>
  <App/>
</AppContextProvider>
)