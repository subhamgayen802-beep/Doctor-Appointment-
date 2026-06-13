import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import adminReducer from '../features/adminSlice';
import doctorReducer from '../features/doctorSlice';
import patientReducer from '../features/patientSlice';
import paymentReducer from '../features/paymentSlice';

 const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminReducer,
    doctor: doctorReducer,
    patient: patientReducer,
    payment: paymentReducer
  }
});


export default store