function MarketFactors() {
  const factors = [
    {
      icon: "🌧️",
      name: "Rainfall",
      status: "Monitor",
      type: "neutral",
    },
    {
      icon: "📦",
      name: "Supply",
      status: "Market Data",
      type: "neutral",
    },
    {
      icon: "📈",
      name: "Demand",
      status: "Market Data",
      type: "neutral",
    },
    {
      icon: "🚢",
      name: "Exports",
      status: "Market Data",
      type: "neutral",
    },
  ];
  return (
    <section className="market-factors">
      <h2>🌦️ Market Factors</h2>
      <p className="factors-description">
        Factors that can influence agricultural commodity prices.
      </p>
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
