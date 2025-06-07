import { FavoriteOutlined, TrendingUp } from "@mui/icons-material";
import { Grid, Typography, Box } from "@mui/material";
import TrendingStocks from "../components/TrendingStocks";
import { useDispatch } from "react-redux";
import WatchlistSidebar from "../components/WatchlistSidebar";
import SearchBar from "../components/SearchBar";
import { useEffect } from "react";
import { fetchMarketOverview } from "../redux/slices/marketSlice";
import MarketOverview from "../components/MarketOverview";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketOverview());
  }, [dispatch]);

  return (
    <Box sx={{ px: 4, py: 4 }}>
      <SearchBar />
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 9 }}>
          <TrendingStocks />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <WatchlistSidebar />
        </Grid>
      </Grid>
      <MarketOverview />
    </Box>
  );
};

export default Dashboard;
