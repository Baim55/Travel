// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import tourReducer from "../features/tourSlice";
import userReducer from "../features/userSlice";
import wishlistReducer from "../features/wishlistSlice";
import basketReducer from "../features/basketSlice";

// persist konfiqurasiyaları
const persistConfig = (key, whitelist) => ({
  key,
  storage,
  whitelist, // doldurulacaq state sahələri
});

const persistedTour = persistReducer(persistConfig("tour", ["tours", "allTours"]), tourReducer);
const persistedUser = persistReducer(persistConfig("user", ["userInfo"]), userReducer);
const persistedWishlist = persistReducer(persistConfig("wishlist", ["wishlist"]), wishlistReducer);
const persistedBasket = persistReducer(persistConfig("basket", ["items"]), basketReducer);

export const store = configureStore({
  reducer: {
    tour: persistedTour,
    user: persistedUser,
    wishlist: persistedWishlist,
    basket: persistedBasket,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
