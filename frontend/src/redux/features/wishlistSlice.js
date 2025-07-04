import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addWishlist: (state, action) => {
      const exist = state.wishlist.find((i) => i._id === action.payload._id);
      if (!exist) {
        state.wishlist.unshift(action.payload);
      }
    },
    removeWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { setWishlist, addWishlist, removeWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
