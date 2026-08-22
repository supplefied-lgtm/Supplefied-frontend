import { createSlice, createSelector } from '@reduxjs/toolkit';

const FREE_SHIPPING_THRESHOLD = 75.0;

const VALID_COUPONS = {
  SUPPLE10: { code: 'SUPPLE10', discountPercent: 10, description: '10% Off Sitewide Welcome Discount' },
  BOLT20: { code: 'BOLT20', discountPercent: 20, description: "Bolt's Cyber-Panther 20% VIP Surge" },
  KINETIC15: { code: 'KINETIC15', discountPercent: 15, description: '15% Off Obsidian Kinetic Series' },
};

const initialState = {
  items: [
    {
      id: 'sup-01-cart',
      productId: 'sup-01',
      name: 'ISO-KINETIC™ Pure Whey Isolate',
      price: 64.99,
      originalPrice: 79.99,
      quantity: 1,
      flavor: 'Obsidian Chocolate Truffle',
      size: '2 lbs (30 Servings)',
      image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80',
    }
  ],
  isDrawerOpen: false,
  appliedCoupon: null,
  couponError: null,
  shippingCost: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, flavor, size, quantity = 1 } = action.payload;
      const cartItemId = `${product.id}-${flavor || 'default'}-${size || 'default'}`;
      
      const existingItem = state.items.find(item => item.id === cartItemId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          flavor: flavor || product.flavors?.[0] || 'Default',
          size: size || product.sizes?.[0] || 'Standard',
          quantity
        });
      }
      state.isDrawerOpen = true;
    },
    addBundleToCart: (state, action) => {
      const { bundle } = action.payload;
      bundle.products.forEach(prod => {
        const cartItemId = `${prod.id}-bundle-${bundle.id}`;
        const existing = state.items.find(item => item.id === cartItemId);
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push({
            id: cartItemId,
            productId: prod.id,
            name: prod.name,
            price: prod.bundlePrice || prod.price,
            originalPrice: prod.price,
            image: prod.image,
            flavor: 'Standard',
            size: 'Full Size',
            quantity: 1
          });
        }
      });
      state.isDrawerOpen = true;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      state.couponError = null;
    },
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    applyCoupon: (state, action) => {
      const code = action.payload.trim().toUpperCase();
      if (VALID_COUPONS[code]) {
        state.appliedCoupon = VALID_COUPONS[code];
        state.couponError = null;
      } else {
        state.couponError = 'Invalid code. Try SUPPLE10 or BOLT20!';
      }
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.couponError = null;
    }
  }
});

export const {
  addToCart,
  addBundleToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  openDrawer,
  closeDrawer,
  applyCoupon,
  removeCoupon
} = cartSlice.actions;

// Base Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectAppliedCoupon = (state) => state.cart.appliedCoupon;

// Memoized Derived Selectors
export const selectCartCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartDiscount = createSelector(
  [selectCartSubtotal, selectAppliedCoupon],
  (subtotal, coupon) => {
    if (!coupon) return 0;
    return (subtotal * coupon.discountPercent) / 100;
  }
);

export const selectFreeShippingProgress = createSelector(
  [selectCartSubtotal],
  (subtotal) => ({
    threshold: FREE_SHIPPING_THRESHOLD,
    remaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    percentage: Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)),
    isFree: subtotal >= FREE_SHIPPING_THRESHOLD,
  })
);

export const selectCartTotal = createSelector(
  [selectCartSubtotal, selectCartDiscount],
  (subtotal, discount) => {
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 7.99;
    return Math.max(0, subtotal - discount + shipping);
  }
);

export default cartSlice.reducer;
