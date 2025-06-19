import { IconButton, Typography, Box, Chip, Card } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StockCard = ({ stock, isFavorite, onToggleFavorite }) => {
  const { symbol, ltp, change, change_percent, volume, name } = stock;

  const isPositive = change > 0;

  return (
    <Card
      sx={{
        width: "100%",
        p: 2,
        borderRadius: 1,
        backgroundColor: "background.paper",
        boxShadow: 2,
        position: "relative",
      }}
    >
      <IconButton
        onClick={onToggleFavorite}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        {isFavorite ? (
          <FavoriteIcon sx={{ color: "error.main" }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: "grey.400" }} />
        )}
      </IconButton>

      <Typography variant="h6">{symbol}</Typography>
      <Typography variant="body2" color="text.secondary">
        {name}
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h6" mt={1} gutterBottom>
          ₹{ltp}
        </Typography>
        <Typography
          variant="body2"
          color={isPositive ? "success.main" : "error.main"}
          fontWeight={400}
          sx={{
            backgroundColor: "#fff2",
            borderRadius: 1,
            p: 0.5,
            display: "inline-block",
          }}
        >
          {isPositive ? "+" : ""}
          {change} ({change_percent}%)
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        Volume: {volume}
      </Typography>
    </Card>
  );
};

export default StockCard;
