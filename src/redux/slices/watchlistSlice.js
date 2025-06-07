import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: [],
  },
  reducers: {
    toggleWatchlist: (state, action) => {
      const exists = state.items.find(
        (item) => item.symbol === action.payload.symbol
      );
      if (exists) {
        state.items = state.items.filter(
          (item) => item.symbol !== action.payload.symbol
        );
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
