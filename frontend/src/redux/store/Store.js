import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlistSlice from "../features/wishlistSlice";
import userSlice from "../features/userSlice";
import tourSlice from "../features/tourSlice";
import bookingSlice from "../features/bookingSlice";

const persistTourConfig = {
  key: "tour",
  storage,
};

const persistUserConfig = {
  key: "user",
  storage,
  whitelist: ["userInfo"],
};

const persistWishlistConfig = {
  key: "wishlist",
  storage,
};

const persistBookingConfig = {
  key: "booking",
  storage,
};

const persistedTourReducer = persistReducer(persistTourConfig, tourSlice);

const persistedUserReducer = persistReducer(persistUserConfig, userSlice);

const persistedWishlistReducer = persistReducer(
  persistWishlistConfig,
  wishlistSlice
);

const persistedBookingReducer = persistReducer(
  persistBookingConfig,
  bookingSlice
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    tour: persistedTourReducer,
    wishlist: persistedWishlistReducer,
    booking: persistedBookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
