import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

import Watchlist from "./pages/Watchlist";
import StockDetail from "./components/StockDetail";
import Settings from "./pages/Settings";
import AiAssistant from "./pages/AiAssistant";
import GlobalSnackbar from "./components/GlobalSnackbar";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wishlist" element={<Watchlist />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ai" element={<AiAssistant />} />
        <Route path="/stock/:symbol" element={<StockDetail />} />
      </Routes>
      <GlobalSnackbar />
    </>
  );
};

export default App;
