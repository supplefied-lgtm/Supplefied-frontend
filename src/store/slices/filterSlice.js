import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  selectedCategory: 'all',
  selectedGoal: 'all',
  priceRange: [0, 100],
  sortBy: 'featured', // 'featured', 'price-low', 'price-high', 'rating'
  onlyInStock: false,
  viewMode: 'grid', // 'grid' or 'list'
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedGoal: (state, action) => {
      state.selectedGoal = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setOnlyInStock: (state, action) => {
      state.onlyInStock = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.selectedGoal = 'all';
      state.priceRange = [0, 100];
      state.sortBy = 'featured';
      state.onlyInStock = false;
    }
  }
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedGoal,
  setPriceRange,
  setSortBy,
  setOnlyInStock,
  setViewMode,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
