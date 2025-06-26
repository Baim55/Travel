import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlistSlice from "../features/wishlistSlice";
import userSlice from "../features/userSlice";
import tourSlice from "../features/tourSlice";
import basketSlice from "../features/basketSlice";

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

const persistBasketConfig = {
  key: "basket",
  storage,
};

const persistedTourReducer = persistReducer(persistTourConfig, tourSlice);

const persistedUserReducer = persistReducer(persistUserConfig, userSlice);

const persistedWishlistReducer = persistReducer(
  persistWishlistConfig,
  wishlistSlice
);

const persistedBasketReducer = persistReducer(persistBasketConfig, basketSlice);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    tour: persistedTourReducer,
    wishlist: persistedWishlistReducer,
    basket: persistedBasketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
