// src/features/basketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { _id, name, price, qty, ... }
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const item = action.payload;
      const exist = state.items.find(i => i._id === item._id);
      if (exist) {
        // mövcud item-ın sayını artır
        state.items = state.items.map(i =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },
    removeFromBasket: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i._id !== id);
    },
    updateQty: (state, action) => {
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
  addToBasket,
  removeFromBasket,
  updateQty,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
