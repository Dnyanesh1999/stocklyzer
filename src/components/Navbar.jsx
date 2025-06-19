import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import TrendingUp from "@mui/icons-material/TrendingUp";
import Settings from "@mui/icons-material/Settings";
import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";
import { SmartToy, Menu } from "@mui/icons-material";
import { useState } from "react";

const navLinks = [
  { lable: "Dashboard", path: "/", icon: <TrendingUp /> },
  { lable: "Watchlist", path: "/watchlist", icon: <FavoriteOutlined /> },
  { lable: "Settings", path: "/settings", icon: <Settings /> },
  { lable: "AI Assistant", path: "/ai", icon: <SmartToy /> },
];

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.path} disablePadding>
            <ListItemButton
              component={Link}
              to={link.path}
              selected={location.pathname === link.path}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.lable} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
