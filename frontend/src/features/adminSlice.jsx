import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';;
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';


export const createDoctor = createAsyncThunk(
  'admin/createDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/admin/createDoctor', doctorData);
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
      const response = await api.get('/admin/Alldoctors');
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
      const response = await api.get('/admin/allpatients');
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
      const response = await api.get('/admin/allappointments');
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
      const response = await api.get('/admin/Mydashboard');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);



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