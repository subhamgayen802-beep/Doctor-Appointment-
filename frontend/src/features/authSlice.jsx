import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api/axiosConfig'

const extractError = (error) => error.response?.data?.message || error.message || 'Something went wrong'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/register', userData)
      return response.data.user
    } catch (error) {
      return rejectWithValue(extractError(error))
    }
  }
)

export const bookAppointment = createAsyncThunk(
  'patient/bookAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/patients/bookappointments', appointmentData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', credentials)
      return response.data.user
    } catch (error) {
      return rejectWithValue(extractError(error))
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/check')
      return data.user
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(null)
      }
      return rejectWithValue(extractError(error))
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/logout')
      return null
    } catch (error) {
      return rejectWithValue(extractError(error))
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    checkingAuth: true,     // ✅ শুধু checkAuth এর জন্য, true দিয়ে শুরু
    loading: false,         // login, register, logout এর জন্য
    bookingLoading: false,  // শুধু bookAppointment এর জন্য
    error: null,
    appointments: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ── checkAuth ── checkingAuth control করবে, loading নয় ──────────
      .addCase(checkAuth.pending, (state) => {
        state.checkingAuth = true   // ✅
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.checkingAuth = false  // ✅
        state.isAuthenticated = !!action.payload
        state.user = action.payload
      })
      .addCase(checkAuth.rejected, (state) => {
        state.checkingAuth = false  // ✅
        state.isAuthenticated = false
        state.user = null
      })

      // ── bookAppointment ── bookingLoading control করবে ───────────────
      .addCase(bookAppointment.pending, (state) => {
        state.bookingLoading = true
        state.error = null
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.bookingLoading = false
        state.appointments.push(action.payload.appointment)
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.bookingLoading = false
        state.error = action.payload?.message || 'Booking failed'
      })

      // ── registerUser ──────────────────────────────────────────────────
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = !!action.payload
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong'
        state.isAuthenticated = false
        state.user = null
      })

      // ── loginUser ─────────────────────────────────────────────────────
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = !!action.payload
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Something went wrong'
        state.isAuthenticated = false
        state.user = null
      })

      // ── logoutUser ────────────────────────────────────────────────────
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Something went wrong'
        state.isAuthenticated = false
        state.user = null
      })
  }
})

export default authSlice.reducer