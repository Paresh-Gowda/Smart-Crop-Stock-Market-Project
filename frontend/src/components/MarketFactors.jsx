function MarketFactors() {
  const factors = [
    {
      icon: "🌧️",
      name: "Rainfall",
      status: "Favorable",
      type: "positive",
    },
    {
      icon: "📦",
      name: "Supply",
      status: "Moderate",
      type: "neutral",
    },
    {
      icon: "📈",
      name: "Demand",
      status: "High",
      type: "positive",
    },
    {
      icon: "🚢",
      name: "Exports",
      status: "Strong",
      type: "positive",
    },
  ];
  return (
    <section className="market-factors">
      <h2>🌦️ Market Factors</h2>
      <div className="factors-list">
        {factors.map((factor) => (
          <div className="factor-item" key={factor.name}>
            <div className="factor-name">
              <span>{factor.icon}</span>
              <span>{factor.name}</span>
            </div>
            <span className={`factor-status ${factor.type}`}>
              {factor.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
export default MarketFactors;
