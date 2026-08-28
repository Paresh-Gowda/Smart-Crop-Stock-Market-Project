import cropData from "../data/cropData";
function Watchlist() {
  // Temporary mock watchlist
  const watchlist = cropData.filter((crop) =>
    ["Wheat", "Cotton", "Soybean"].includes(crop.name),
  );
  return (
    <main className="watchlist-page">
      <section className="page-header">
        <p>MY CROPS</p>
        <h1>My Watchlist ⭐</h1>
        <span>Keep track of your favorite agricultural commodities</span>
      </section>
      <section className="watchlist-container">
        {watchlist.map((crop) => (
          <div className="watchlist-item" key={crop.id}>
            <div>
              <h3>{crop.name}</h3>
              <span>{crop.symbol}</span>
            </div>
            <div className="watchlist-price">
              <h3>₹{crop.price}</h3>
              <span className={crop.percentage >= 0 ? "positive" : "negative"}>
                {crop.percentage >= 0 ? "+" : ""}
                {crop.percentage}%
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
export default Watchlist;
