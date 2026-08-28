import cropData from "../data/cropData";
function MarketMovers() {
  const gainers = [...cropData]
    .filter((crop) => crop.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);
  const losers = [...cropData]
    .filter((crop) => crop.percentage < 0)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);
  return (
    <section className="market-movers">
      <div className="movers-box">
        <h2>🔥 Top Gainers</h2>
        {gainers.map((crop) => (
          <div className="mover-item" key={crop.id}>
            <span>{crop.name}</span>
            <strong className="positive">+{crop.percentage}%</strong>
          </div>
        ))}
      </div>
      <div className="movers-box">
        <h2>📉 Top Losers</h2>
        {losers.map((crop) => (
          <div className="mover-item" key={crop.id}>
            <span>{crop.name}</span>
            <strong className="negative">{crop.percentage}%</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
export default MarketMovers;
