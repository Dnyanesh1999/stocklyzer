import { createSlice } from "@reduxjs/toolkit";

const getInitialWatchlist = () => {
  if (typeof localStorage === "undefined") return [];
  try {
    const stored = localStorage.getItem("watchlist");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: getInitialWatchlist(),
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
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("watchlist", JSON.stringify(state.items));
      }
    },
  },
});

export const { toggleWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
