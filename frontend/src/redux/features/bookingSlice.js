import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [], // rezervasiyalar siyahısı
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      const exist = state.bookings.find(i => i._id === action.payload._id);
      if (!exist) {
        state.bookings.unshift({ ...action.payload });
      }
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(i => i._id !== action.payload);
    },
    clearBookings: state => {
      state.bookings = [];
    },
  },
});

export const {
  addBooking,
  removeBooking,
  clearBookings,
} = bookingSlice.actions;

export default bookingSlice.reducer;
