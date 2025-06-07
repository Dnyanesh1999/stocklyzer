import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import TrendingUp from "@mui/icons-material/TrendingUp";
import Settings from "@mui/icons-material/Settings";
import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";
import { SmartToy } from "@mui/icons-material";

const navLinks = [
  { lable: "Dashboard", path: "/", icon: <TrendingUp /> },
  { lable: "Wishlist", path: "/wishlist", icon: <FavoriteOutlined /> },
  { lable: "Settings", path: "/settings", icon: <Settings /> },
  { lable: "AI Assistant", path: "/ai", icon: <SmartToy /> },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "primary.main",
        paddingX: 4,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textDecoration: "none" }}
          component={Link}
          to="/"
          color="primary.contrastText"
        >
          Stocklyzer
        </Typography>
        <Box display="flex" gap={4}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              startIcon={link.icon}
              sx={{
                display: "flex",
                alignItems: "center",
                color: "primary.contrastText",
                padding: "8px 16px",
                backgroundColor:
                  location.pathname === link.path
                    ? "primary.light"
                    : "transparent",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
            >
              {link.lable}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
