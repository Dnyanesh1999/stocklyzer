import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    snackbar: {
      open: false,
      message: "",
      severity: "info",
    },
  },
  reducers: {
    showSnackbar: (state, action) => {
      const { message, severity = "info" } = action.payload;
      state.snackbar = { open: true, message, severity };
    },
    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const { showSnackbar, closeSnackbar } = uiSlice.actions;
export default uiSlice.reducer;
