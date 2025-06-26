// src/redux/features/basketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // товары в корзине
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addBasket: (state, action) => {
      const exist = state.items.find(i => i._id === action.payload._id);
      if (!exist) {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    removeBasket: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
    },
    updateGuestCount: (state, action) => {
      const { _id, qty } = action.payload;
      state.items = state.items.map(i =>
        i._id === _id ? { ...i, qty } : i
      );
    },
    clearBasket: state => {
      state.items = [];
    },
  },
});

export const {
  addBasket,
  removeBasket,
  updateGuestCount,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
