import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';


export const bookAppointment = createAsyncThunk(
  'patient/bookAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/patients/bookappointments', appointmentData);
      toast.success('Appointment booked!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data || 'Booking failed');
      return rejectWithValue(error.response?.data);
    }
  }
);



export const getMyAppointments = createAsyncThunk(
  'patient/getMyAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/patients/myappointments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'patient/cancelAppointment',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`/patients/appointments/${id}/cancel`);
      toast.success('Appointment cancelled');
      return response.data;
    } catch (error) {
      toast.error('Cancel failed');
      return rejectWithValue(error.response?.data);
    }
  }
);


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
    // ✅ bookAppointment loading cases যোগ করো
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload.appointment);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ getMyAppointments loading cases যোগ করো
      .addCase(getMyAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments;
      })
      .addCase(getMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ cancelAppointment loading cases যোগ করো
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(
          (a) => a._id === action.payload.appointment._id
        );
        if (index !== -1) {
          state.appointments[index].status = 'cancelled';
        }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
export default patientSlice.reducer;