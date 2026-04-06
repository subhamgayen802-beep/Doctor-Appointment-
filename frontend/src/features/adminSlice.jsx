import { createSlice } from '@reduxjs/toolkit';
import {
  createDoctor,
  getAllDoctors,
  getAllPatients,
  getAllAppointments,
  deleteDoctor,
  getAdminDashboard
} from './adminActions';

const initialState = {
  doctors: [],
  patients: [],
  appointments: [],
  stats: null,
  loading: false,
  error: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(createDoctor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.doctors.push(action.payload.doctor);
    });
    builder.addCase(createDoctor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getAllDoctors.fulfilled, (state, action) => {
      state.doctors = action.payload.doctors;
    });

   
    builder.addCase(getAllPatients.fulfilled, (state, action) => {
      state.patients = action.payload.patients;
    });


    builder.addCase(getAllAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload.appointments;
    });

  
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      state.doctors = state.doctors.filter(d => d._id !== action.payload);
    });

 
    builder.addCase(getAdminDashboard.fulfilled, (state, action) => {
      state.stats = action.payload.stats;
    });
  }
});

export default adminSlice.reducer;