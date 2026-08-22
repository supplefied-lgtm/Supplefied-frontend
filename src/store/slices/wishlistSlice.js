import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: ['sup-01', 'sup-02'], // product IDs
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        state.items = state.items.filter(id => id !== productId);
      } else {
        state.items.push(productId);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(id => id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    }
  }
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (productId) => (state) => state.wishlist.items.includes(productId);

export default wishlistSlice.reducer;
