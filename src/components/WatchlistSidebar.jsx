import { Favorite } from "@mui/icons-material";
import { Box, Stack, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import WatchlistPreview from "./WatchlistPreview";

const WatchlistSidebar = () => {
  const navigate = useNavigate();

  return (
    <Box
      mt={4}
      sx={{
        width: "100%",
        color: "text.primary",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Favorite
            sx={{ height: "28px", width: "28px", mr: 1, color: "primary.main" }}
          />
          Your Watchlist
        </Typography>
        <Button size="small" onClick={() => navigate("/watchlist")}>
          View All
        </Button>
      </Box>

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 2,
          minHeight: "55vh",
        }}
      >
        <WatchlistPreview limit={3} />
      </Box>
    </Box>
  );
};

export default WatchlistSidebar;
