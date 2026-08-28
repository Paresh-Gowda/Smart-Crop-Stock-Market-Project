import cropData from "../data/cropData";
function Market() {
  const averageChange =
    cropData.reduce((total, crop) => total + crop.percentage, 0) /
    cropData.length;
  const highestCrop = [...cropData].sort(
    (a, b) => b.percentage - a.percentage
  )[0];
  const lowestCrop = [...cropData].sort(
    (a, b) => a.percentage - b.percentage
  )[0];
  return (
    <main className="market-page">
      <section className="page-header">
        <p>MARKET ANALYSIS</p>
        <h1>Market Overview 📊</h1>
        <span>Track overall agricultural market performance</span>
      </section>
      <section className="market-stats">
        <div className="market-stat-card">
          <p>Average Market Change</p>
          <h2 className={averageChange >= 0 ? "positive" : "negative"}>
            {averageChange >= 0 ? "+" : ""}
            {averageChange.toFixed(2)}%
          </h2>
        </div>
        <div className="market-stat-card">
          <p>Top Performer</p>
          <h2>{highestCrop.name}</h2>
          <span className="positive">
            +{highestCrop.percentage}%
          </span>
        </div>
        <div className="market-stat-card">
          <p>Lowest Performer</p>
          <h2>{lowestCrop.name}</h2>
          <span className="negative">
            {lowestCrop.percentage}%
          </span>
        </div>
      </section>
      <section className="market-summary">
        <h2>Today's Market Summary</h2>
        <p>
          The agricultural market is showing mixed movement today.
          Demand and export activity are supporting some commodities,
          while supply conditions are putting pressure on others.
        </p>
      </section>
    </main>
  );
}
export default Market;