import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "../features/productSlice";
import wishlistSlice from "../features/wishlistSlice";
import userSlice from "../features/userSlice";

const persistProductConfig = {
  key: "product",
  storage,
};

const persistWishlistConfig = {
  key: "wishlist",
  storage,
};

const persistedProductReducer = persistReducer(
  persistProductConfig,
  productSlice
);

const persistedWishlistReducer = persistReducer(
  persistWishlistConfig,
  wishlistSlice
);


export const store = configureStore({
  reducer: {
    products: persistedProductReducer,
    wishlist: persistedWishlistReducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
