import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./slices/stockSlice";
import watchlistReducer from "./slices/watchlistSlice";
import searchReducer from "./slices/searchSlice";
import marketReducer from "./slices/marketSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    stocks: stockReducer,
    watchlist: watchlistReducer,
    search: searchReducer,
    market: marketReducer,
    ui: uiReducer,
  },
});
