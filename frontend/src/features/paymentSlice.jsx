import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosConfig";



export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (doctorId, { rejectWithValue }) => {
    try {

      const response = await api.post("/payment/create-order", {
        doctorId
      });

      return response.data;

    } catch (error) {

      toast.error(error.response?.data?.message || "Failed to create order");

      return rejectWithValue(error.response?.data);

    }
  }
);


export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {

      const response = await api.post(
        "/payment/verify-payment",
        paymentData
      );

      toast.success("Appointment booked successfully");

      return response.data;

    } catch (error) {

      toast.error("Payment verification failed");

      return rejectWithValue(error.response?.data);

    }
  }
);


const paymentSlice = createSlice({
  name: "payment",

  initialState: {
    order: null,
    loading: false,
    success: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


     
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })

      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })

      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }

});

export default paymentSlice.reducer;