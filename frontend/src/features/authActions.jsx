import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';





export  const registerUser = createAsyncThunk(
  '/auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem("token", response.data.token);
      toast.success('Registration successful!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data || 'Registration failed');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {

      const response = await api.post("/auth/login", loginData)

      const data = response.data

      // ⭐ user save
      localStorage.setItem("user", JSON.stringify(data.user))


      localStorage.setItem("token", data.token)

      return data

    } catch (error) {

      return rejectWithValue(error.response?.data)

    }
  }
)

0
export  const logoutUser = createAsyncThunk(
  '/auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      toast.success('Logged out successfully!');
      return true;
    } catch (error) {
      toast.error('Logout failed');
      return rejectWithValue(error.response?.data);
    }
  }
);


  export  const checkAuth = createAsyncThunk(
  '/auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


