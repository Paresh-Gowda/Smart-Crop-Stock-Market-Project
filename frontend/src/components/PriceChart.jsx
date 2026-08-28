import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function PriceChart({ crop }) {
  return (
    <section className="chart-section">
      <div className="chart-header">
        <div>
          <p>PRICE PERFORMANCE</p>
          <h2>{crop.name} Price Trend</h2>
        </div>
        <div className="chart-price">
          ₹{crop.price}
          <span className={crop.percentage >= 0 ? "positive" : "negative"}>
            {" "}
            {crop.percentage >= 0 ? "+" : ""}
            {crop.percentage}%
          </span>
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={crop.history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
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
      </div>
    </section>
  );
}
export default PriceChart;
