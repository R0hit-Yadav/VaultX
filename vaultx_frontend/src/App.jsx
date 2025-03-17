import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Send from "./pages/Send";
import History from "./pages/History";
import Balance from "./pages/Balance";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send" element={<Send />} />
        <Route path="/history" element={<History />} />
        <Route path="/balance" element={<Balance />} />
      </Routes>
    </Router>
  );
}
