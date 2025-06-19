import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Box, ButtonGroup, Button } from "@mui/material";

const intervals = [
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "6M", days: 180 },
  { label: "1Y", days: 365 },
];

const StockChart = ({ symbol }) => {
  const [period, setPeriod] = useState(intervals[0]);
  const [data, setData] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const to = Math.floor(Date.now() / 1000);
      const from = to - period.days * 24 * 60 * 60;
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${apiKey}`
        );
        const json = await res.json();
        if (json && json.s === "ok") {
          const formatted = json.t.map((time, idx) => ({
            date: new Date(time * 1000).toLocaleDateString(),
            close: json.c[idx],
          }));
          setData(formatted);
        } else {
          setData([]);
        }
      } catch {
        setData([]);
      }
    };

    fetchData();
  }, [symbol, period, apiKey]);

  return (
    <Box>
      <ButtonGroup size="small" sx={{ mb: 2 }}>
        {intervals.map((int) => (
          <Button
            key={int.label}
            variant={int.label === period.label ? "contained" : "outlined"}
            onClick={() => setPeriod(int)}
          >
            {int.label}
          </Button>
        ))}
      </ButtonGroup>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#1976d2" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StockChart;
