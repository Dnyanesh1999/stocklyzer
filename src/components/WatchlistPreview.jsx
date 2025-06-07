import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { FavoriteBorderOutlined, Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleWatchlist } from "../redux/slices/watchlistSlice";

const WatchlistPreview = ({ limit = 4, isFullView = false }) => {
  const watchlist = useSelector((state) => state.watchlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gainers = watchlist.filter((s) => s.change > 0);
  const losers = watchlist.filter((s) => s.change < 0);

  const handleRemove = (stock) => {
    dispatch(toggleWatchlist(stock));
  };

  if (watchlist.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <FavoriteBorderOutlined
          sx={{ fontSize: 50, color: "text.secondary" }}
        />
        <Typography mt={2} variant="h6" color="text.secondary" gutterBottom>
          Your watchlist is empty
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Start by searching for stocks and adding them to your watchlist
        </Typography>
        {isFullView && (
          <Button variant="contained" onClick={() => navigate("/")}>
            Explore Stocks
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box>
      {isFullView && (
        <>
          <Typography variant="h5" fontWeight={600} mb={1}>
            Your Watchlist
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={4}>
            Track your favorite stocks and monitor their performance
          </Typography>
        </>
      )}

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography>
          <strong>{watchlist.length}</strong> Stocks
        </Typography>
        <Typography color="success.main">
          <strong>{gainers.length}</strong> Gainers
        </Typography>
        <Typography color="error.main">
          <strong>{losers.length}</strong> Losers
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {(isFullView ? watchlist : watchlist.slice(0, limit)).map((stock) => (
          <Box
            key={stock.symbol}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            borderRadius={2}
            bgcolor="background.paper"
            onClick={() => navigate(`/stock/${stock.symbol}`)}
          >
            <Box>
              <Typography fontWeight={600}>{stock.symbol}</Typography>
              <Typography variant="caption" color="text.secondary">
                {stock.name}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Typography fontWeight={600}>
                  ₹{stock.ltp.toFixed(2)}
                </Typography>
                <Chip
                  size="small"
                  label={`${stock.change >= 0 ? "+" : ""}${stock.change} (${
                    stock.change_percent
                  })`}
                  sx={{
                    color: stock.change >= 0 ? "success.main" : "error.main",
                  }}
                />
              </Box>
              {isFullView && (
                <IconButton onClick={() => handleRemove(stock)} size="small">
                  <Close sx={{ fontSize: 20, color: "text.secondary" }} />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </Stack>

      {!isFullView && watchlist.length > limit && (
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            size="small"
            onClick={() => navigate("/wishlist")}
            sx={{ color: "success.main" }}
          >
            +{watchlist.length - limit} more stocks
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default WatchlistPreview;
