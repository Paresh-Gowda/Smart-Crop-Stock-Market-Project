import { useEffect, useState } from "react";
function Watchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("cropWatchlist");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("cropWatchlist", JSON.stringify(watchlist));
  }, [watchlist]);
  const removeFromWatchlist = (id) => {
    setWatchlist((current) => current.filter((crop) => crop.id !== id));
  };
  return (
    <main className="watchlist-page">
      <section className="page-header">
        <p>MY CROPS</p>
        <h1>My Watchlist ⭐</h1>
        <span>Keep track of your favorite agricultural commodities</span>
      </section>
      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <h2>Your watchlist is empty 🌾</h2>
          <p>Add crops from the Dashboard to keep track of them.</p>
        </div>
      ) : (
        <section className="watchlist-container">
          {watchlist.map((crop) => (
            <div className="watchlist-item" key={crop.id}>
              <div>
                <h3>{crop.name}</h3>
                <span>{crop.symbol}</span>
              </div>
              <div className="watchlist-price">
                <h3>₹{crop.price}</h3>
                <button
                  className="remove-watchlist"
                  onClick={() => removeFromWatchlist(crop.id)}
                >
                  Remove ⭐
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
export default Watchlist;
