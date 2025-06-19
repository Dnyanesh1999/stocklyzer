import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const MarketOverview = () => {
  const { nifty, sensex, bankNifty, loading } = useSelector((state) => state.market);

  const indices = [
    { name: "NIFTY 50", ...nifty },
    { name: "SENSEX", ...sensex },
    { name: "BANK NIFTY", ...bankNifty },
  ];

  const getColor = (change) =>
    change > 0 ? "success.main" : change < 0 ? "error.main" : "text.default";

  return (
    <Box mt={6}>
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        📊 Market Overview
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {indices.map((index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index.name}>
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  color: "white",
                  borderRadius: 1,
                  p: 4,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="text.secondary"
                  gutterBottom
                >
                  {index.name}
                </Typography>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  ₹{index.value}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color={getColor(index.change)}
                >
                  {index.change >= 0 ? "+" : ""}
                  {index.change} ({index.percent}%)
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MarketOverview;
