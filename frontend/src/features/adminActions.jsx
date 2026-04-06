import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';

export const createDoctor = createAsyncThunk(
  'admin/createDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/admin/doctors', doctorData);
      toast.success('Doctor created successfully!');
      return response.data;
      
    } catch (error) {
      toast.error(error.response?.data || 'Failed to create doctor');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllDoctors = createAsyncThunk(
  'admin/getAllDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/doctors');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllPatients = createAsyncThunk(
  'admin/getAllPatients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/patients');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllAppointments = createAsyncThunk(
  'admin/getAllAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/appointments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  'admin/deleteDoctor',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/doctors/${id}`);
      toast.success('Doctor deleted successfully!');
      return id;
    } catch (error) {
      toast.error('Failed to delete doctor');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAdminDashboard = createAsyncThunk(
  'admin/getDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);