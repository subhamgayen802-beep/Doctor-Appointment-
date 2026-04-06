import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';

export const bookAppointment = createAsyncThunk(
  'patient/bookAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/patients/appointments', appointmentData);
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
      const response = await api.get('/api/patients/appointments');
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
      const response = await api.put(`/api/patients/appointments/${id}/cancel`);
      toast.success('Appointment cancelled');
      return response.data;
    } catch (error) {
      toast.error('Cancel failed');
      return rejectWithValue(error.response?.data);
    }
  }
);