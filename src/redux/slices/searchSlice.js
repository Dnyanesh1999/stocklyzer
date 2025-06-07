import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const searchStocks = createAsyncThunk("search/stocks", async (query) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const res = await fetch(
    `https://finnhub.io/api/v1/search?q=${query}&token=${apiKey}`
  );
  const data = await res.json();
  return data.result || [];
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;
