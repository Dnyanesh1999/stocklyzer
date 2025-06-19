import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toggleWatchlist } from "../redux/slices/watchlistSlice";
import { showSnackbar } from "../redux/slices/uiSlice";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Chip,
  Link,
  Avatar,
  Stack,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import {
  ArrowBack,
  FavoriteBorder,
  MonetizationOn,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";
import StatCard from "./StatCard";
import StockChart from "./StockChart";

const StockDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marketOpen, setMarketOpen] = useState(true);

  const apiKey = import.meta.env.VITE_API_KEY;

  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.items);
  const isInWatchlist = watchlist.some((item) => item.symbol === symbol);

  const fetchProfile = async () => {
    const res = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`
    );
    const data = await res.json();
    setProfile(data);
  };

  const fetchQuote = async () => {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
    );
    const data = await res.json();
    setQuote(data);

    const now = Math.floor(Date.now() / 1000);
    if (data.t) {
      const diff = now - data.t;
      setMarketOpen(diff < 300);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchProfile();
      await fetchQuote();
      setLoading(false);
    };

    loadData();

    const interval = setInterval(fetchQuote, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  if (loading || !profile || !quote) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const handleToggleWatchlist = () => {
    const exists = watchlist.some((item) => item.symbol === symbol);
    dispatch(
      toggleWatchlist({
        symbol,
        name: profile.name,
        ltp: quote.c,
        change: quote.d,
        change_percent: quote.dp,
      })
    );
    dispatch(
      showSnackbar({
        message: exists ? "Removed from watchlist" : "Added to watchlist",
        severity: "success",
      })
    );
  };

  return (
    <Box mt={4} mx="auto" maxWidth="lg">
      {/* Top bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Button
          startIcon={<ArrowBack />}
          variant="text"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Chip
          label={marketOpen ? "Market is Open 🔔" : "Market is Closed ❌"}
          color={marketOpen ? "success" : "error"}
          variant="outlined"
          sx={{ mb: 2, fontWeight: 500, px: 2, py: 1 }}
        />

        <Button
          variant={isInWatchlist ? "contained" : "outlined"}
          startIcon={<FavoriteBorder />}
          sx={{
            borderRadius: "8px",
            fontWeight: 500,
            color: isInWatchlist ? "white" : "inherit",
            backgroundColor: isInWatchlist ? "primary.main" : "transparent",
          }}
          onClick={handleToggleWatchlist}
        >
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
      </Box>

      {/* Logo + Company Info */}
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "12px",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar src={profile.logo} sx={{ width: 64, height: 64 }} />
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {profile.name} ({symbol})
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {profile.exchange} | {profile.finnhubIndustry}
            </Typography>
          </Box>
        </Stack>

        {/* Live Price + Change */}
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography variant="h4" fontWeight={600} mb={1}>
            ${quote.c?.toFixed(2)}{" "}
          </Typography>
          <Chip
            label={`${quote.d >= 0 ? "+" : ""}${quote.d?.toFixed(
              2
            )} (${quote.dp?.toFixed(2)}%)`}
            color={quote.d >= 0 ? "success" : "error"}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <StatCard
          icon={<MonetizationOn sx={{ color: "success.main" }} />}
          label="Market Cap"
          value={`$${profile.marketCapitalization?.toFixed(1)}B`}
          color="success.main"
        />
        <StatCard
          icon={<TrendingUp sx={{ color: "success.main" }} />}
          label="52W High"
          value={`$${quote.h?.toFixed(2)}`}
          color="success.main"
        />
        <StatCard
          icon={<TrendingDown sx={{ color: "error.main" }} />}
          label="52W Low"
          value={`$${quote.l?.toFixed(2)}`}
          color="error.main"
        />
      </Box>

      {/* Historical Price Chart */}
      <Box mt={4}>
        <StockChart symbol={symbol} />
      </Box>

      <Box
        mt={4}
        p={3}
        borderRadius={1}
        border="1px solid"
        borderColor="divider"
        bgcolor="background.paper"
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Company Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              IPO
            </Typography>
            <Typography variant="body1">{profile.ipo}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Shares Outstanding
            </Typography>
            <Typography variant="body1">{profile.shareOutstanding}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Country
            </Typography>
            <Typography variant="body1">{profile.country}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Website
            </Typography>
            <Link href={profile.weburl} target="_blank" rel="noopener">
              {profile.weburl}
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Box
        mt={4}
        mb={4}
        p={3}
        borderRadius={1}
        border="1px solid"
        borderColor="divider"
        bgcolor="background.paper"
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Trading Information
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Open
            </Typography>
            <Typography variant="body1">${quote.o?.toFixed(2)}</Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2" color="text.secondary">
              High
            </Typography>
            <Typography variant="body1">${quote.h?.toFixed(2)}</Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Low
            </Typography>
            <Typography variant="body1">${quote.l?.toFixed(2)}</Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Previous Close
            </Typography>
            <Typography variant="body1">${quote.pc?.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StockDetail;
