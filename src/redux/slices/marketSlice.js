// redux/slices/marketSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk (this will later use Finnhub or NSE API)
export const fetchMarketOverview = createAsyncThunk(
  "market/fetchMarketOverview",
  async () => {
    // Dummy mock data
    return {
      marketStatus: "open",
      nifty: { value: 22850.34, change: 80.56, percent: 0.35 },
      sensex: { value: 75150.99, change: -120.32, percent: -0.16 },
      bankNifty: { value: 48200.55, change: 240.12, percent: 0.5 },
    };
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState: {
    marketStatus: "closed",
    nifty: { value: 0, change: 0, percent: 0 },
    sensex: { value: 0, change: 0, percent: 0 },
    bankNifty: { value: 0, change: 0, percent: 0 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketOverview.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchMarketOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default marketSlice.reducer;
