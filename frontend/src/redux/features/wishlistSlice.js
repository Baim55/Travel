// src/redux/features/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action) => {
      const exist = state.wishlist.find(i => i._id === action.payload._id);
      if (exist) {
        state.wishlist = state.wishlist.filter(i => i._id !== action.payload._id);
      } else {
        state.wishlist.push(action.payload);
      }
    },
  },
});

export const { addWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
