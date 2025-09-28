import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlistSlice from "../features/wishlistSlice";
import userSlice from "../features/userSlice";
import tourSlice from "../features/tourSlice";
import bookingSlice from "../features/bookingSlice";
import adminSlice from "../features/adminSlice";
import storageSession from "redux-persist/lib/storage/session";

const persistTourConfig = {
  key: "tour",
  storage,
};

const persistUserConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};

const persistAdminConfig = {
  key: "admin",
   storage: storageSession,
  whitelist: ["admin"],
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
const persistedAdminReducer = persistReducer(persistAdminConfig, adminSlice);
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
    admin: persistedAdminReducer,
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
