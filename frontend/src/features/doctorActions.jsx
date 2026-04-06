import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';
import { createSlice } from '@reduxjs/toolkit';

export const updateProfile = createAsyncThunk(
  'doctor/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/doctors/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Profile updated!');
      return response.data;
    } catch (error) {
      toast.error('Failed to update profile');
      return rejectWithValue(error.response?.data);
    }
  }
);
export  const getAllDoctorsPublic = createAsyncThunk(
  'doctor/getAllPublic',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/doctors/all');
      return response.data.doctors;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const getMyAppointments = createAsyncThunk(
  'doctor/getMyAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/doctors/appointments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  'doctor/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/doctors/appointments/${id}/status`, { status });
      toast.success(`Status updated to ${status}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to update status');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getDoctorDashboard = createAsyncThunk(
  'doctor/getDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/doctors/dashboard');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getDoctorById = createAsyncThunk(
  'doctor/getById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/doctors/${id}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch doctor'
      );
    }
  }
);


export const getRelatedDoctors = createAsyncThunk(
  'doctor/getRelated',
  async ({ id, speciality }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/api/doctors/related/${id}/${speciality}`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch related doctors'
      );
    }
  }
);






const initialState = {
  profile: null,
  appointments: [],
  doctors: [],
  stats: null,
  selectedDoctor: null,
  relatedDoctors: [],
  currencySymbol: '₹',
  loading: false,
  error: null
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
       clearDoctorError: (state) => {
      state.error = null;
    },
    clearSelectedDoctor: (state) => {
      state.selectedDoctor = null;
      state.relatedDoctors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload.doctor;
    });
    builder.addCase(getMyAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload.appointments;
    });
    builder
    .addCase(getAllDoctorsPublic.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(getAllDoctorsPublic.fulfilled, (state, action) => {
  state.loading = false;
  state.doctors = action.payload;   
})
.addCase(getAllDoctorsPublic.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
    builder.addCase(updateAppointmentStatus.fulfilled, (state, action) => {
      const index = state.appointments.findIndex(a => a._id === action.payload.appointment._id);
      if (index !== -1) {
        state.appointments[index].status = action.payload.appointment.status;
      }
    });
    builder.addCase(getDoctorDashboard.fulfilled, (state, action) => {
      state.stats = action.payload.stats;
    })
   
      .addCase(getDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDoctor = action.payload;
      })
      
       .addCase(getDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getRelatedDoctors.pending, (state) => {
        state.loading = false; // Don't show full loading for related
      })
      .addCase(getRelatedDoctors.fulfilled, (state, action) => {
        state.relatedDoctors = action.payload;
      })
      .addCase(getRelatedDoctors.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearDoctorError, clearSelectedDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;