// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#22c55e", // emerald green for accent
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3b82f6", // soft blue
      light: "#60a5fa", // light blue for hover effects
    },
    error: {
      main: "#ef4444", // red for losses
      // above color is looking very bright give a some little dark red
      light: "#dc2626", // dark red for hover effects
    },
    success: {
      main: "#10b981", // green for gains
    },
    background: {
      default: "#0f172a", // dark navy
      paper: "#1e293b", // dark surface
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },
    divider: "#334155",
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
