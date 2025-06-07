import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Visibility,
  Notifications,
  Update,
} from "@mui/icons-material";

const Settings = () => {
  return (
    <Box mx="auto" mt={4} maxWidth="md">
      {/* Header */}
      <Box display="flex" alignItems="center" mb={2}>
        <SettingsIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
        <Typography variant="h4" fontWeight={700}>
          Settings
        </Typography>
      </Box>
      <Typography color="text.secondary" mb={4}>
        Customize your Stocklyzer experience
      </Typography>

      {/* Appearance Section */}
      <Box
        p={3}
        borderRadius={2}
        border="1px solid"
        borderColor="divider"
        bgcolor="background.paper"
        mb={4}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Visibility sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6">Appearance</Typography>
        </Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Theme
          </Typography>
          <Select value="dark" size="small">
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem disabled value="light">
              Light (Coming Soon)
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Typography variant="body2" color="text.secondary">
            Currency
          </Typography>
          <Select value="usd" size="small">
            <MenuItem value="usd">USD ($)</MenuItem>
            <MenuItem disabled value="inr">
              INR (₹) - (Coming Soon)
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Notifications */}
      <Box
        p={3}
        borderRadius={2}
        border="1px solid"
        borderColor="divider"
        bgcolor="background.paper"
        mb={4}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Notifications sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Price Alerts"
        />
        <Typography variant="body2" color="text.secondary" mb={2}>
          Get notified when stocks reach target prices
        </Typography>
        <FormControlLabel control={<Switch />} label="News Updates" />
        <Typography variant="body2" color="text.secondary">
          Receive news about your watchlist stocks
        </Typography>
      </Box>

      {/* Data & Performance */}
      <Box
        p={3}
        borderRadius={2}
        border="1px solid"
        borderColor="divider"
        bgcolor="background.paper"
        mb={4}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Update sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6">Data & Performance</Typography>
        </Box>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Auto-refresh"
        />
        <Typography variant="body2" color="text.secondary" mb={2}>
          Automatically update stock prices
        </Typography>
        <FormControl fullWidth>
          <Typography variant="body2" color="text.secondary">
            Refresh Interval
          </Typography>
          <Select value="1min" size="small">
            <MenuItem value="30s">30 seconds</MenuItem>
            <MenuItem value="1min">1 minute</MenuItem>
            <MenuItem value="5min">5 minutes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* About */}
      <Box textAlign="center" mt={5}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Stocklyzer is an AI-powered stock research assistant.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Version 1.0.0 • Built with React & Redux
        </Typography>
      </Box>
    </Box>
  );
};

export default Settings;
