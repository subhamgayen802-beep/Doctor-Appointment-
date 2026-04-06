import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import adminReducer from '../features/adminSlice';
import doctorReducer from '../features/doctorActions';
import patientReducer from '../features/patientSlice';
import paymentReducer from '../features/paymentSlice';

 const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    doctor: doctorReducer,
    patient: patientReducer,
    payment: paymentReducer
  }
});


export default store