import { Box, Typography } from "@mui/material";

const StatCard = ({ icon, label, value, color }) => {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 180,
        backgroundColor: "background.paper",
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "divider",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ display: "flex", alignItems: "center", color }}
        fontWeight={600}
        gutterBottom
      >
        {icon}
        <Box ml={1}>{label}</Box>
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  );
};

export default StatCard;
