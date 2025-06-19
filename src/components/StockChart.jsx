import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const DATASETS = {
  TSLA: "/tesla.json",
  AAPL: "/apple.json",
};

const StockChart = ({ symbol }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const url = DATASETS[symbol];
      if (!url) {
        setData([]);
        return;
      }
      try {
        const res = await fetch(url);
        const json = await res.json();
        const formatted = json.map((d) => ({
          date: d.date,
          close: parseFloat(d.close),
        }));
        setData(formatted.reverse());
      } catch {
        setData([]);
      }
    };
    load();
  }, [symbol]);

  if (data === null) {
    return (
      <Box textAlign="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (data.length === 0) {
    return <Typography>Chart data not available.</Typography>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ left: 0, right: 0 }}>
        <XAxis dataKey="date" hide />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip />
        <Line type="monotone" dataKey="close" stroke="#22c55e" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
