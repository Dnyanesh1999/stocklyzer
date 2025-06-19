import { useEffect } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingStocks } from "../redux/slices/stockSlice";
import { toggleWatchlist } from "../redux/slices/watchlistSlice";
import { showSnackbar } from "../redux/slices/uiSlice";
import StockCard from "./StockCard";
import TrendingUp from "@mui/icons-material/TrendingUp";

const TrendingStocks = () => {
  const dispatch = useDispatch();

  const { trending, loading } = useSelector((state) => state.stocks);
  const watchlist = useSelector((state) => state.watchlist.items);

  useEffect(() => {
    dispatch(fetchTrendingStocks());
  }, [dispatch]);

  const handleToggleWatchlist = (stock) => {
    const exists = watchlist.some((s) => s.symbol === stock.symbol);
    dispatch(toggleWatchlist(stock));
    dispatch(
      showSnackbar({
        message: exists ? "Removed from watchlist" : "Added to watchlist",
        severity: "success",
      })
    );
  };

  return (
    <Box mt={4}>
      <Typography
        variant="h5"
        fontWeight={600}
        mb={3}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <TrendingUp
          sx={{ height: "28px", width: "28px", mr: 1, color: "primary.main" }}
        />
        Trending Stocks
      </Typography>
      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {trending.map((stock) => (
            <Grid item xs={12} md={8} key={stock.symbol}>
              <StockCard
                key={stock.symbol}
                stock={stock}
                isFavorite={watchlist.some((s) => s.symbol === stock.symbol)}
                onToggleFavorite={() => handleToggleWatchlist(stock)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TrendingStocks;
