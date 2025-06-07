import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// TEMPORARY MOCK DATA (Indian market focused)
const dummyTrendingStocks = [
  {
    symbol: "INFY",
    name: "Infosys Ltd",
    ltp: 1452.65,
    change: 21.3,
    change_percent: 1.47,
    volume: "1,420,000",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    ltp: 3825.5,
    change: -12.5,
    change_percent: -0.33,
    volume: "980,000",
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    ltp: 2741.6,
    change: 45.2,
    change_percent: 1.65,
    volume: "3,200,000",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    ltp: 1604.8,
    change: -4.7,
    change_percent: -0.29,
    volume: "1,180,000",
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    ltp: 900.3,
    change: 10.1,
    change_percent: 1.12,
    volume: "1,500,000",
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro",
    ltp: 1985.0,
    change: 30.5,
    change_percent: 1.56,
    volume: "750,000",
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever",
    ltp: 2500.0,
    change: -15.0,
    change_percent: -0.6,
    volume: "600,000",
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India",
    ltp: 8000.0,
    change: 120.0,
    change_percent: 1.53,
    volume: "400,000",
  },
];

// Async thunk to fetch trending stock data
export const fetchTrendingStocks = createAsyncThunk(
  "stock/fetchTrending",
  async () => {
    // const response = await fetch(
    //   "https://latest.stockapi.in/api/stocks?index=NSE"
    // ); // // Placeholder — we'll use a better India-focused API next
    // const data = await response.json();
    // return data.stocks || []; // Adjust based on actual API response structure

    await new Promise((res) => setTimeout(res, 1000));
    return dummyTrendingStocks;
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    trending: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default stockSlice.reducer;
