import { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { createChart } from "lightweight-charts";

const REMOTE_DATASETS = {
  TSLA:
    "https://raw.githubusercontent.com/plotly/datasets/master/tesla-stock-price.csv",
  AAPL:
    "https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv",
};

const TIMEFRAMES = {
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
};

const parseCsv = (text) => {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(/,\s*/);
  const map = headers.reduce((acc, h, i) => {
    acc[h] = i;
    return acc;
  }, {});
  return lines.slice(1).map((line) => {
    const cols = line.split(/,\s*/);
    return {
      time: cols[map.Date] || cols[map.date],
      open: parseFloat(
        cols[map.Open] || cols[map["AAPL.Open"]] || cols[map.open] || 0,
      ),
      high: parseFloat(
        cols[map.High] || cols[map["AAPL.High"]] || cols[map.high] || 0,
      ),
      low: parseFloat(
        cols[map.Low] || cols[map["AAPL.Low"]] || cols[map.low] || 0,
      ),
      close: parseFloat(
        cols[map.Close] || cols[map["AAPL.Close"]] || cols[map.close] || 0,
      ),
    };
  });
};

const StockChart = ({ symbol }) => {
  const [data, setData] = useState(null);
  const [range, setRange] = useState("6M");
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  // load data from Alpha Vantage if possible, fallback to GitHub CSV
  useEffect(() => {
    const load = async () => {
      setData(null);
      const alphaKey = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
      try {
        if (alphaKey) {
          const res = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=full&symbol=${symbol}&apikey=${alphaKey}`,
          );
          const json = await res.json();
          if (json["Time Series (Daily)"]) {
            const arr = Object.entries(json["Time Series (Daily)"]).map(
              ([date, val]) => ({
                time: date,
                open: parseFloat(val["1. open"]),
                high: parseFloat(val["2. high"]),
                low: parseFloat(val["3. low"]),
                close: parseFloat(val["4. close"]),
              }),
            );
            setData(arr.reverse());
            return;
          }
        }
      } catch {
        // ignore and try fallback
      }

      try {
        const url = REMOTE_DATASETS[symbol];
        if (!url) {
          setData([]);
          return;
        }
        const res = await fetch(url);
        const text = await res.text();
        setData(parseCsv(text).reverse());
      } catch {
        setData([]);
      }
    };

    load();
  }, [symbol]);

  // initialize chart
  useEffect(() => {
    if (!containerRef.current || chartRef.current) return;
    chartRef.current = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { type: "solid", color: "transparent" },
        textColor: "#666",
      },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
    });
    seriesRef.current = chartRef.current.addCandlestickSeries();

    const handleResize = () => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // update chart data when range or data changes
  useEffect(() => {
    if (!seriesRef.current || !data) return;
    const days = TIMEFRAMES[range] || 180;
    const sliced = data.slice(-days);
    seriesRef.current.setData(sliced);
    chartRef.current.timeScale().fitContent();
  }, [data, range]);

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
    <Box>
      <Box mb={2} textAlign="center">
        <ToggleButtonGroup
          size="small"
          exclusive
          value={range}
          onChange={(_, val) => val && setRange(val)}
        >
          {Object.keys(TIMEFRAMES).map((tf) => (
            <ToggleButton key={tf} value={tf} sx={{ textTransform: "none" }}>
              {tf}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Box ref={containerRef} />
    </Box>
  );
};

export default StockChart;
