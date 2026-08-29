import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import Market from "./pages/Market";
import Watchlist from "./pages/Watchlist";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/market" element={<Market />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
