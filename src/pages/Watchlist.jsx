import { Box, Container } from "@mui/material";
import WatchlistPreview from "../components/WatchlistPreview";

const Watchlist = () => {
  return (
    <Container maxWidth="md">
      <Box mt={6}>
        <WatchlistPreview isFullView />
      </Box>
    </Container>
  );
};

export default Watchlist;
