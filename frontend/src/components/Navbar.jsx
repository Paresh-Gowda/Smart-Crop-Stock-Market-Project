import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      <h2>🌾 Stock Crop Market</h2>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/crops">Crops</Link>
        <Link to="/market">Market</Link>
        <Link to="/watchlist">Watchlist</Link>
      </div>
    </nav>
  );
}
export default Navbar;