import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const API_URL = process.env.REACT_APP_API_URL;
function PriceChart({ crop }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!crop?.name) return;
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("commodity", crop.name);
        if (crop.market) {
          params.append("market", crop.market);
        }
        if (crop.state) {
          params.append("state", crop.state);
        }
        params.append("limit", 30);
        const response = await fetch(
          `${API_URL}/api/market-history?${params.toString()}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch price history");
        }
        const result = await response.json();
        const chartData = result.history.map((item) => ({
          date: item.date,
          price: item.price,
        }));
        setHistory(chartData);
      } catch (error) {
        console.error("History error:", error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [crop]);
  return (
    <section className="chart-section">
      <div className="chart-header">
        <div>
          <p>PRICE PERFORMANCE</p>
          <h2>{crop.name} Price Trend</h2>
          {crop.market && (
            <span>
              {crop.market}, {crop.state}
            </span>
          )}
        </div>
        <div className="chart-price">₹{crop.price}</div>
      </div>
      <div className="chart-container">
        {loading ? (
          <p>Loading price history...</p>
        ) : history.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2f6b3f"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No historical price data available.</p>
        )}
      </div>
    </section>
  );
}
export default PriceChart;
