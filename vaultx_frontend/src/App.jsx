import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Send from "./pages/Send";
import History from "./pages/History";
// import Settings from "./pages/Settings";
// import WalletConnectPage from "./pages/WalletConnect";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send" element={<Send />} />
        <Route path="/history" element={<History />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        {/* <Route path="/dapp" element={<WalletConnectPage />} /> */}
      </Routes>
    </Router>
  );
}
