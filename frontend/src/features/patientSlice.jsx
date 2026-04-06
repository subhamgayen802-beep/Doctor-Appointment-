import { createSlice } from '@reduxjs/toolkit';
import { bookAppointment, getMyAppointments, cancelAppointment } from './patientActions';

const initialState = {
  appointments: [],
  loading: false,
  error: null
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookAppointment.fulfilled, (state, action) => {
      state.appointments.push(action.payload.appointment);
    });
    builder.addCase(getMyAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload.appointments;
    });
    
    builder.addCase(cancelAppointment.fulfilled, (state, action) => {
      const index = state.appointments.findIndex(a => a._id === action.payload.appointment._id);
      if (index !== -1) {
        state.appointments[index].status = 'cancelled';
      }
    });
  }
});

export default patientSlice.reducer;