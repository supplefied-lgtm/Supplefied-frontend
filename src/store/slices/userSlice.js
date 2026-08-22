import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'Alex Mercer',
    email: 'alex.mercer@bio-athletics.com',
    tier: 'Obsidian VIP Member',
    points: 1250,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    joinedDate: 'November 2025',
    savedAddresses: [
      {
        id: 'addr-1',
        title: 'Primary Residence',
        street: '742 Cyber Kinetic Blvd, Suite 400',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        isDefault: true
      }
    ],
    orders: [
      {
        id: 'SPF-882194',
        date: 'Feb 15, 2026',
        status: 'Delivered',
        trackingNumber: 'TRK-KINETIC-9902',
        total: 114.98,
        items: [
          { name: 'ISO-KINETIC™ Pure Whey Isolate', qty: 1, price: 64.99 },
          { name: 'CYBER-DRIVE™ High-Stim Pre-Workout', qty: 1, price: 49.99 }
        ]
      },
      {
        id: 'SPF-774012',
        date: 'Jan 10, 2026',
        status: 'Delivered',
        trackingNumber: 'TRK-KINETIC-4819',
        total: 34.99,
        items: [
          { name: 'QUANTUM-ATP™ Creapure® Creatine', qty: 1, price: 34.99 }
        ]
      }
    ]
  },
  isAuthenticated: true
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    addOrder: (state, action) => {
      state.user.orders.unshift(action.payload);
      state.user.points += Math.round(action.payload.total * 10);
    },
    addAddress: (state, action) => {
      state.user.savedAddresses.push(action.payload);
    }
  }
});

export const { updateProfile, addOrder, addAddress } = userSlice.actions;
export default userSlice.reducer;
