import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import filterReducer from './slices/filterSlice';
import userReducer from './slices/userSlice';
import mascotReducer from './slices/mascotSlice';
import toastReducer from './slices/toastSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    filters: filterReducer,
    user: userReducer,
    mascot: mascotReducer,
    toast: toastReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
